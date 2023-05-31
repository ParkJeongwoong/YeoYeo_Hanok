import {
  ReactNode,
  Dispatch,
  SetStateAction,
  DispatchWithoutAction,
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

type BreakPoint = typeof MediaQueryBreakPoint;
const MediaQueryBreakPoint = {
  desktop: "(min-width: 1280px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 1279px)",
  xs: "(max-width: 359px)",
};

// 자동완성 지원을 위한 처리
type AnyString = string & Record<never, never>;
type MediaQuery = BreakPoint[keyof BreakPoint] | AnyString;
type MediaQueryMatchListeners = { [mq: string]: Dispatch<SetStateAction<boolean>>[] };
type MediaQueryContextType = {
  mediaQueryMatchesRef: null | MutableRefObject<Record<MediaQuery | string, boolean>>;
  listenersRef: null | MutableRefObject<MediaQueryMatchListeners>;
  forceUpdate: DispatchWithoutAction;
};

const noop = () => {
  /** empty */
};

const MediaQueryContext = createContext<MediaQueryContextType>({
  forceUpdate: noop,
  listenersRef: null,
  mediaQueryMatchesRef: null,
});

export function MediaQueryProvider({ children }: { children: ReactNode }) {
  // ref에 객체를 담고 참조를 사용해서 상태를 관리하고 있기 때문에
  // 상태 갱신을 위해 useReducer를 사용해서 forceUpdate를 흉내내서 사용하고 있음
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  // 미디어쿼리별로 해당하는지를 맵 형태로 담아둠
  const mediaQueryMatchesRef = useRef<Record<MediaQuery | string, boolean>>({});

  // 개별 useMediaQuery훅의 setIsMatch를 담아두었다가 이벤트 발생 시에 호출함
  const listenersRef = useRef<MediaQueryMatchListeners>({});

  // 컨텍스트를 사용하되 자식 렌더링은 일으키지 않기 위해서 ref에 담아둠
  const contextRef = useRef<MediaQueryContextType>({
    forceUpdate,
    listenersRef,
    mediaQueryMatchesRef,
  });

  useEffect(() => {
    const mediaQueryLists: Record<MediaQuery | string, MediaQueryList> = {};
    const listeners: Record<MediaQuery | string, (e: MediaQueryListEvent) => void> = {};
    const usedMediaQuery = Object.keys(mediaQueryMatchesRef.current);

    const checkMatches = (mediaQuery: MediaQuery, mediaQueryList: MediaQueryList | MediaQueryListEvent) => {
      if (mediaQueryMatchesRef.current[mediaQuery] === mediaQueryList.matches) return;

      // 변경된 값이 있는 경우에만 상태를 갱신하기 위해 변경여부를 담아둠
      const changeSets: [MediaQuery, boolean][] = [];

      // 미디어쿼리끼리 겹치는 구간이 많으므로 이벤트가 한번 발생했을 때 전체 미디어쿼리를 확인하고
      // 미리 상태 업데이트를 해서 빈번하게 상태변경이 발생하는 것을 방지함
      usedMediaQuery.forEach((media) => {
        const eachMediaQueryList = window.matchMedia(media);
        const isChanged = mediaQueryMatchesRef.current[media] !== eachMediaQueryList.matches;
        mediaQueryMatchesRef.current[media] = eachMediaQueryList.matches;
        if (isChanged) changeSets.push([media, eachMediaQueryList.matches]);
      });

      // 변경된 경우에는 등록된 리스너를 실행해서 개별 isMatch 값을 갱신해 줌
      if (changeSets.length > 0) {
        changeSets.forEach(([mq, matches]) => {
          listenersRef.current[mq]?.forEach((setIsMatch) => setIsMatch(matches));
        });
      }
    };

    usedMediaQuery.forEach((mediaQuery) => {
      const mediaQueryList = window.matchMedia(mediaQuery);

      let listener = listeners[mediaQuery];

      if (!listener) {
        listener = (e: MediaQueryListEvent) => {
          checkMatches(mediaQuery, e);
        };
        listeners[mediaQuery] = listener;
        mediaQueryLists[mediaQuery] = mediaQueryList;
      }

      mediaQueryList.addEventListener("change", listener);
      checkMatches(mediaQuery, mediaQueryList);
    });

    return () => {
      usedMediaQuery.forEach((mediaQuery) => {
        mediaQueryLists[mediaQuery].removeEventListener("change", listeners[mediaQuery]);
      });
    };
  }, [update]);

  return <MediaQueryContext.Provider value={contextRef.current}>{children}</MediaQueryContext.Provider>;
}

const useMediaQuery = (breakPoint: keyof BreakPoint) => {
  const context = useContext(MediaQueryContext);
  const mediaQuery = MediaQueryBreakPoint[breakPoint];
  const [isMatch, setIsMatch] = useState(context.mediaQueryMatchesRef?.current[mediaQuery] || false);

  useEffect(() => {
    const { forceUpdate, mediaQueryMatchesRef, listenersRef } = context;

    if (mediaQueryMatchesRef === null) return undefined;

    if (typeof mediaQueryMatchesRef.current[mediaQuery] === "undefined") {
      mediaQueryMatchesRef.current[mediaQuery] = false;
    }

    // setIsMatch를 Provider 내부로 넘겨주고 업데이트 받도록 함
    const listeners = listenersRef?.current[mediaQuery];
    if (!listeners?.includes(setIsMatch)) {
      if (listenersRef === null) return undefined;
      listenersRef.current[mediaQuery] = [...(listeners || []), setIsMatch];
    }

    forceUpdate();

    return () => {
      // 연결한 리스너 해제
      if (!listeners?.includes(setIsMatch)) {
        if (listenersRef === null) return;
        listenersRef.current[mediaQuery] = listenersRef?.current[mediaQuery].filter(
          (listener) => listener !== setIsMatch,
        );
      }
    };
  }, [mediaQuery, context]);

  return isMatch;
};

export default useMediaQuery;
