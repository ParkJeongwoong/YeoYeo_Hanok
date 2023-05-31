// import {  } from "react";
import { useEffect } from "react";
import cn from "classnames";

function LinkSelectModal({ setIsModal }: LinkSelectModalProps) {

  const pushEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", pushEscape);

    return () => document.removeEventListener("keydown", pushEscape);
  });

  return (
    
      <div
      tabIndex={0}
      role="button"
      className={cn("modal-mask")}
      onClick={() => setIsModal(false)}
      onKeyDown={() => {}}
      aria-label="close modal"
    >
      <div
        className={cn("link-select-modal-mask")}
        onClick={(e) => {
          e.stopPropagation();
          setIsModal(false);
        }}
        aria-hidden
      >
        <div className={cn("link-select-modal")}>
          <strong>방을 선택해주세요</strong>
          <div className={cn("link-select")}>
            <a type="button" className={cn("link-button")} href="https://airbnb.co.kr/h/yeoyeo1">
              여유
            </a>
            <a type="button" className={cn("link-button")} href="https://airbnb.co.kr/h/yeoyeo2">
              여행
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkSelectModal;
