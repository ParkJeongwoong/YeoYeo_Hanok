import { ReactElement, useState } from 'react';
import Image from 'next/image';
import imageLoader from 'src/utils/loader';
import { useRouter } from 'next/router';

const BellBtn = '/assets/icons/bell.png';
const InfoBtn = '/assets/icons/info.png';
const CalendarBtn = '/assets/icons/calendar.png';

interface MasterBtnProps {
  setFadeState: (fadeState: string) => void;
}

function MasterBtn({ setFadeState }: MasterBtnProps): ReactElement {
  const router = useRouter();
  const [expand, setExpand] = useState<string>("not-expand");
  const [timerId, setTimerId] = useState<number | null>(null);

  const moveToInfo = () => {
    router.push("/room")
    setFadeState("fade-out");
    setTimeout(() => {
      setFadeState("fade-in");
    }, 1000);
    console.log("moveToInfo");
    setExpand("not-expand");
    if (timerId) {
      clearTimeout(timerId);
    }
  }

  const moveToReservation = () => {
    router.push("/reservation")
    setFadeState("fade-out");
    setTimeout(() => {
      setFadeState("fade-in");
    }, 500);
    console.log("moveToReservation");
    setExpand("not-expand");
    if (timerId) {
      clearTimeout(timerId);
    }
  }

  const expandSeconds = () => {
    setExpand("expand");
    const id = window.setTimeout(() => {
      setExpand("not-expand");
    }, 5000);
    setTimerId(id);
  }


  return (
    <div className="master-btn-container">
      <div className={`expandable-btn ${expand}`}>
        <button type="button" className="click-icon" onClick={expandSeconds}><Image loader={imageLoader} src={BellBtn} fill alt="마스터 버튼" /></button>
        <button type="button" className="func-btn btn-right" onClick={moveToReservation}><Image loader={imageLoader} src={CalendarBtn} fill alt="예약 버튼" /></button>
        <button type="button" className="func-btn btn-left" onClick={moveToInfo}><Image loader={imageLoader} src={InfoBtn} fill alt="정보 버튼" /></button>
      </div>
    </div>
  );
};

export default MasterBtn;