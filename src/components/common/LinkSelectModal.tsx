import { useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import imageLoader from "src/utils/loader";
import { useTranslation } from "react-i18next";

function LinkSelectModal({ setIsModal }: LinkSelectModalProps) {
  const airbnb = "/assets/icons/ico_airbnb.png";
  const { t } = useTranslation("common");

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
          <Image className={cn("link-select-icon")} loader={imageLoader} src={airbnb} width={35} height={35} alt="에어비앤비 아이콘" />
          <strong>{t("reservation.product.chooseRoom")}</strong>
          <div className={cn("link-select")}>
            <a type="button" className={cn("link-button")} href="https://airbnb.co.kr/h/yeoyeo1">
            {t("floorPlan.roomA.name")}
            </a>
            <a type="button" className={cn("link-button")} href="https://airbnb.co.kr/h/yeoyeo2">
            {t("floorPlan.roomB.name")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkSelectModal;
