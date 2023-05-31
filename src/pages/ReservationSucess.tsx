import cn from "classnames";
import { useNavigate, useParams } from "react-router-dom";

function ReservationSuccess() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="reservation-success-wrap">
      <div className="section-wrap">
        <div className={cn("header")}>
          <h1>예약해주셔서 감사합니다.</h1>
          <h2>
            <span>예약이 성공적으로 완료되었습니다.</span>
            <span>상세한 예약정보는 &apos;예약확인&apos; 버튼을 눌러 확인하세요.</span>
          </h2>
        </div>

        <div className={cn("contents")}>
          <span>예약번호 : {params.reservationId}</span>
        </div>

        <div className={cn("bottom-nav")}>
          <button type="button" onClick={() => navigate("/reservation/check")}>
            <span>예약확인</span>
          </button>
          <button type="button" onClick={() => navigate("/")}>
            <span>홈으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationSuccess;
