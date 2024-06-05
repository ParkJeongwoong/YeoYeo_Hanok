import React, { useState } from 'react';
import Link from 'next/link';

interface MasterBtnProps {
  fadeState: String;
  setFadeState: Function;
}

const MasterBtn = ({ setFadeState}: MasterBtnProps) => {

  const [expand, setExpand] = useState("not-expand");
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
      <button className={`expandable-btn ${expand}`}>
            <span className="click-icon" onClick={expandSeconds}>🛎️</span>
            <Link className="func-btn btn-right" href={"/reservation"} onClick={moveToReservation}>📅</Link>
            <Link className="func-btn btn-left" href={"/room"} onClick={moveToInfo}>ℹ️</Link>
      </button>
    </div>
  );
};

export default MasterBtn;