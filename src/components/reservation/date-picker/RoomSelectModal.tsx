import { useEffect } from "react";
import cn from "classnames";
import { useSetAtom } from "jotai";
import modalStatus from "src/state/modalStatus";

function RoomSelectModal({ setSelectedRoom, setIsModal, handleCellClick }: RoomSelectModalProps) {
  const setModal = useSetAtom(modalStatus);

  const pushEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setModal(false);
      setIsModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", pushEscape);

    return () => document.removeEventListener("keydown", pushEscape);
  });

  return (
    <div
      className={cn("room-select-modal-mask")}
      onClick={(e) => {
        e.stopPropagation();
        setModal(false);
      }}
      aria-hidden
    >
      <div className={cn("room-select-modal")}>
        <strong>방을 선택해주세요</strong>
        <div className={cn("room-select")}>
          <button
            type="button"
            className={cn("room-button")}
            onClick={() => {
              setSelectedRoom("여유");
              setModal(false);
              setIsModal(false);
              handleCellClick();
            }}
          >
            여유
          </button>
          <button
            type="button"
            className={cn("room-button")}
            onClick={() => {
              setSelectedRoom("여행");
              setModal(false);
              setIsModal(false);
              handleCellClick();
            }}
          >
            여행
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomSelectModal;
