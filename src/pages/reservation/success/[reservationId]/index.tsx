import cn from "classnames";
import { useRouter } from "next/router";
import SEO from "src/utils/seo";

function ReservationSuccess() {
  const router = useRouter();
  const { reservationId } = router.query;

  return (
    <>
      <SEO
        title="예약에 성공하셨습니다"
        description="예약이 완료되었습니다."
        siteTitle="한옥스테이 여여"
      />
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
            <span>예약번호 : {reservationId}</span>
          </div>

          <div className={cn("bottom-nav")}>
            <button type="button" onClick={() => router.push("/reservation/check")}>
              <span>예약확인</span>
            </button>
            <button type="button" onClick={() => router.push("/")}>
              <span>홈으로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationSuccess;
