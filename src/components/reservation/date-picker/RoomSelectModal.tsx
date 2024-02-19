import { useEffect } from "react";
import cn from "classnames";
import { useSetAtom } from "jotai";
import { useTranslation } from "react-i18next";
import modalStatus from "src/state/modalStatus";

function RoomSelectModal({ setSelectedRoom, setIsModal, handleCellClick }: RoomSelectModalProps) {
  const setModal = useSetAtom(modalStatus);
  const { t } = useTranslation("common");

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
        <strong>{t("reservation.product.chooseRoom")}</strong>
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
            {t("floorPlan.roomA.name")}
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
          {t("floorPlan.roomB.name")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomSelectModal;
