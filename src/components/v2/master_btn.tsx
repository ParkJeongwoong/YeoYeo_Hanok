import { ReactElement, useState } from 'react';
import Link from 'next/link';

interface MasterBtnProps {
  setFadeState: (fadeState: string) => void;
}

function MasterBtn({ setFadeState }: MasterBtnProps): ReactElement {

  const [expand, setExpand] = useState<string>("not-expand");
  const [timerId, setTimerId] = useState<number | null>(null);

  const moveToInfo = () => {
    // Your code goes here
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
    // Your code goes here
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
      {/* Your button content goes here */}
      <button type="button" className={`expandable-btn ${expand}`}>
        <button type="button" className="click-icon" onClick={expandSeconds}>🛎️</button>
        <Link className="func-btn btn-right" href="/reservation" onClick={moveToReservation}>📅</Link>
        <Link className="func-btn btn-left" href="/room" onClick={moveToInfo}>ℹ️</Link>
      </button>
    </div>
  );
};

export default MasterBtn;