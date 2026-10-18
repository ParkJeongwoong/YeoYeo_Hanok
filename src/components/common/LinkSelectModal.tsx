import { useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import imageLoader from "src/utils/loader";
import { useTranslation } from "react-i18next";
import AirbnbRoomLinks from "./AirbnbRoomLinks";

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
        }}
      >
        <div className={cn("link-select-modal")} role="dialog" aria-modal="true" aria-labelledby="airbnb-room-heading">
          <button type="button" className="link-select-close" onClick={() => setIsModal(false)} aria-label={t("reservation.close") || undefined}>
            ×
          </button>
          <Image className={cn("link-select-icon")} loader={imageLoader} src={airbnb} unoptimized width={35} height={35} alt="에어비앤비 아이콘" />
          <strong id="airbnb-room-heading">{t("reservation.product.chooseRoom")}</strong>
          <AirbnbRoomLinks linkLocation="booking_modal" />
        </div>
      </div>
    </div>
  );
}

export default LinkSelectModal;
