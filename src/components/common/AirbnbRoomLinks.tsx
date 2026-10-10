import { useTranslation } from "react-i18next";

function AirbnbRoomLinks() {
  const { t } = useTranslation("common");

  return (
    <div className="airbnb-room-links">
      <a className="link-button" href="https://airbnb.co.kr/h/yeoyeo1">
        {t("floorPlan.roomA.name")} · {t("reservation.airbnb")}
      </a>
      <a className="link-button" href="https://airbnb.co.kr/h/yeoyeo2">
        {t("floorPlan.roomB.name")} · {t("reservation.airbnb")}
      </a>
    </div>
  );
}

export default AirbnbRoomLinks;
