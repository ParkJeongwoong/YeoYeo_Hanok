import { useState, useEffect, useRef, ReactElement } from "react";
import Image from "next/image";
import i18next, { changeLanguage } from "i18next";
import imageLoader from "src/utils/loader";

// components
import { useRouter } from "next/router";
import SNB from "./SNB";

interface HeaderProps {
  setFadeState: (fadeState: string) => void;
}

function Header({setFadeState}: HeaderProps): ReactElement {
  const IcoHamburger = "/assets/icons/ico_hamburger.svg";
  const logo = "/assets/temp/logo_long.png";

  const [lang, setLang] = useState<string>(i18next.language);
  const [scroll, setScroll] = useState(false);
  const [isSNB, setIsSNB] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLang = () => {
    if (i18next.language === "ko") {
      changeLanguage("en");
      setLang("en");
    } else {
      changeLanguage("ko");
      setLang("ko");
    }
  };

  const windowScroll = () => {
    const scrollTop = window.scrollY;

    if (headerRef && headerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      scrollTop >= headerRef.current.clientHeight - 40 ? setScroll(true) : setScroll(false);
    }
  };

  const pageMove = (path: string) => {
    setFadeState("fade-out");
    router.push(path);
    setTimeout(()=>{
      setFadeState("fade-in");
    }, 500)
  }

  useEffect(() => {
    window.addEventListener("scroll", windowScroll);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, []);

  return (
    <>
      <div className={`header-wrap ${scroll ? "scroll" : "top"}`} ref={headerRef}>
        <div className="header">
          <button type="button" aria-label="SNB button" onClick={() => setIsSNB(!isSNB)}>
            <Image loader={imageLoader} src={IcoHamburger} width={24} height={24} alt="햄버거 버튼" />
            {/* <IcoHamburger /> */}
          </button>
          <div className="logo">
            <button type="button" aria-label="Header Home button" onClick={() => pageMove("/")}>
              <Image loader={imageLoader} src={logo} width={276.486} height={120} alt="홈 아이콘" />
            </button>
          </div>
          <button type="button" aria-label="language button" className="lang-btn" onClick={() => handleLang()}>
            {lang}
          </button>
        </div>
      </div>
      <SNB open={isSNB} setOpen={setIsSNB} setFadeState={setFadeState} />
    </>
  );
}

export default Header;
