import cn from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ReservationSuccess() {
  const router = useRouter();
  const { reservationId } = router.query;
  const { t } = useTranslation("reservation");

  return (
      <div className="reservation-success-wrap">
        <div className="section-wrap">
          <div className={cn("header")}>
            <h1>{t("success.welcomeMessage")}</h1>
            <h2>
              <span>{t("success.guideMessage1")}</span>
              <span>{t("success.guideMessage2")}</span>
            </h2>
          </div>

          <div className={cn("contents")}>
            <span>
              {t("success.reservationNumber")} : {reservationId}
            </span>
          </div>

          <div className={cn("bottom-nav")}>
            <button type="button" onClick={() => router.push("/reservation/check")}>
              <span>{t("success.confirmReservation")}</span>
            </button>
            <button type="button" onClick={() => router.push("/")}>
              <span>{t("success.backToHome")}</span>
            </button>
          </div>
        </div>
      </div>
  );
}

export default ReservationSuccess;
