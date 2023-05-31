import cn from "classnames";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

function ReservationDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { state: any; reservationNumber: string };
  const response = state.state;
  const reservationNum = state.reservationNumber;

  useEffect(() => {
    if (!state.state) {
      navigate("/");
    }
  });

  const handleReqRefund = () => {
    const answer = window.confirm("해당 예약을 취소하시겠습니까?");
    if (answer) {
      const data = {
        phoneNumber: response.phoneNumber,
        reason: "",
        reservationId: Number(reservationNum),
      };
      axios({
        method: "delete",
        url: "payment/refund",
        data,
      })
        .then(() => {
          alert("정상적으로 예약이 취소되었습니다.");
          navigate("/");
        })
        .catch(() => alert("정상적으로 취소되지 않았습니다."));
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  if (state) {
    return (
      <div className="reservation-detail-wrap">
        <div className="section-wrap">
          <div className={cn("content-wrap")}>
            <div className={cn("header border-none")}>
              <strong>{state.state.roomName} 예약이 완료되었습니다.</strong>
            </div>
            <div className={cn("content__schedule")}>
              <div className={cn("content__schedule-content check-in")}>
                <strong>체크인</strong>
                <span className={cn("date")}>{state.state.startDate}</span>
                <span className={cn("time")}>오후 3:00</span>
              </div>
              <div className={cn("content-contour")} />
              <div className={cn("content__schedule-content check-out")}>
                <strong>체크아웃</strong>
                <span className={cn("date")}>{state.state.endDate}</span>
                <span className={cn("time")}>오전 11:00</span>
              </div>
            </div>
          </div>

          <div className={cn("section-contour")} />

          <div className={cn("section")}>
            <div className={cn("header")}>
              <strong>예약 세부정보</strong>
            </div>
            <div className={cn("content__normal")}>
              <div className={cn("content")}>
                <strong>게스트</strong>
                <span>게스트 {state.state.guestCount}명</span>
              </div>
            </div>
            <div className={cn("content__normal")}>
              <div className={cn("content")}>
                <strong>예약 번호</strong>
                <span>{reservationNum}</span>
              </div>
            </div>
            <div className={cn("content__refund")}>
              <div className={cn("content")}>
                <strong>환불정책</strong>
                <span>
                  {dayjs(state.state.startDate).subtract(10, "day").format("MM/DD")} 전에 취소하면 전액 환불을
                  받으실 수 있습니다. 그 이후에는 취소 시점에 따라 환불액이 결정됩니다.{" "}
                </span>
                <div className={cn("button-wrap")}>
                  <button type="button" onClick={handleReqRefund}>
                    예약 취소
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={cn("section-contour")} />

          <div className={cn("section")}>
            <div className={cn("header")}>
              <strong>결제 정보</strong>
            </div>
            <div className={cn("content__normal")}>
              <div className={cn("content")}>
                <strong>총비용</strong>
                <span>₩ {state.state.paidAmount.toLocaleString()} KRW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ReservationDetail;
