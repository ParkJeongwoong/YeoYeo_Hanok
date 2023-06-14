import cn from "classnames";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SEO from "src/utils/seo";

interface ReservationDetailProps {
  fadeState: string;
}

function ReservationDetail({ fadeState }: ReservationDetailProps) {
  const router = useRouter();

  const state = router.query as { 
    phoneNumber: string, 
    roomName: string, 
    startDate: string, 
    endDate: string, 
    guestCount: string, 
    paidAmount: string, 
    reservationNumber: string 
  };
  const { t } = useTranslation("reservation");

  useEffect(() => {
    if (!state||!state.reservationNumber) {
      router.push("/");
    }
  });

  const handleReqRefund = () => {
    const answer = window.confirm("해당 예약을 취소하시겠습니까?");
    if (answer) {
      const data = {
        phoneNumber: state.phoneNumber,
        reason: "",
        reservationId: Number(state.reservationNumber),
      };
      axios({
        method: "delete",
        url: "payment/refund",
        data,
      })
        .then(() => {
          alert("정상적으로 예약이 취소되었습니다.");
          router.push("/");
        })
        .catch(() => alert("정상적으로 취소되지 않았습니다."));
    } else {
      // Do nothing!
    }
  };

  if (state) {
    return (
      <>
        <SEO
          title="예약 정보"
          description="한옥스테이 여여의 예약 정보 조회 페이지입니다."
          siteTitle="한옥스테이 여여"
        />
        <div className={cn(`reservation-detail-wrap ${fadeState}`)}>
          <div className="section-wrap">
            <div className={cn("content-wrap")}>
              <div className={cn("header border-none")}>
                <strong>{state.roomName} {t("detail.completeReservation")}</strong>
              </div>
              <div className={cn("content__schedule")}>
                <div className={cn("content__schedule-content check-in")}>
                  <strong>{t("detail.checkIn")}</strong>
                  <span className={cn("date")}>{state.startDate}</span>
                  <span className={cn("time")}>{t("detail.3pm")}</span>
                </div>
                <div className={cn("content-contour")} />
                <div className={cn("content__schedule-content check-out")}>
                  <strong>{t("detail.checkOut")}</strong>
                  <span className={cn("date")}>{state.endDate}</span>
                  <span className={cn("time")}>{t("detail.11am")}</span>
                </div>
              </div>
            </div>

            <div className={cn("section-contour")} />

            <div className={cn("section")}>
              <div className={cn("header")}>
                <strong>{t("detail.reservationDetails")}</strong>
              </div>
              <div className={cn("content__normal")}>
                <div className={cn("content")}>
                  <strong>{t("detail.guest")}</strong>
                  <span>{t("detail.guest")} {state.guestCount}{t("detail.peopleCount")}</span>
                </div>
              </div>
              <div className={cn("content__normal")}>
                <div className={cn("content")}>
                  <strong>{t("detail.reservationNumber")}</strong>
                  <span>{state.reservationNumber}</span>
                </div>
              </div>
              <div className={cn("content__refund")}>
                <div className={cn("content")}>
                  <strong>{t("detail.refundPolicy")}</strong>
                  <span>
                    {t("detail.refundGuideMessage1")}
                    {dayjs(state.startDate).subtract(10, "day").format("MM/DD")} {t("detail.refundGuideMessage2")}{" "}
                  </span>
                  <div className={cn("button-wrap")}>
                    <button type="button" onClick={handleReqRefund}>
                      {t("detail.cancelReservation")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn("section-contour")} />

            <div className={cn("section")}>
              <div className={cn("header")}>
                <strong>{t("detail.paymentInformation")}</strong>
              </div>
              <div className={cn("content__normal")}>
                <div className={cn("content")}>
                  <strong>{t("detail.totalCost")}</strong>
                  <span>
                    {t("detail.currencyUnit")} {state.paidAmount.toLocaleString()} {t("detail.currency")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default ReservationDetail;