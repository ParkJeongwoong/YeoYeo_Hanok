import { useTranslation } from "react-i18next";

import { BookingLinkLocation, trackAirbnbBookingClick } from "src/lib/bookingAnalytics";

function AirbnbRoomLinks({ linkLocation }: { linkLocation: BookingLinkLocation }) {
  const { t } = useTranslation("common");

  return (
    <div className="airbnb-room-links">
      <a className="link-button" href="https://airbnb.co.kr/h/yeoyeo1" onClick={() => trackAirbnbBookingClick("yeoyu", linkLocation)}>
        {t("floorPlan.roomA.name")} · {t("reservation.airbnb")}
      </a>
      <a className="link-button" href="https://airbnb.co.kr/h/yeoyeo2" onClick={() => trackAirbnbBookingClick("yeohaeng", linkLocation)}>
        {t("floorPlan.roomB.name")} · {t("reservation.airbnb")}
      </a>
    </div>
  );
}

export default AirbnbRoomLinks;
