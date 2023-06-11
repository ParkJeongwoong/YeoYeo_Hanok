import InputForm from "@components/common/InputForm";
import cn from "classnames";
import i18next, { TFunction } from "i18next";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import ReservationInfo from "./ReservationInfo";

interface ReservationSidebarProps {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  periodData: PeriodDataType;
  peopleNumber: number;
  onClickPayment: () => void;
  selectedRoom: "여유" | "여행" | null;
  translation: TFunction;
}
function ReservationSidebar({
  startDate,
  endDate,
  periodData,
  peopleNumber,
  onClickPayment,
  selectedRoom,
  translation,
}: ReservationSidebarProps) {
  dayjs.locale("ko");
  const tmpStartDate = dayjs(startDate).format(`YYYY년 MM월 DD일(ddd)`);
  const tmpEndDate = dayjs(endDate).format(`YYYY년 MM월 DD일(ddd)`);

  return (
    <div className={cn("reservation-sidebar-wrap")}>
      <strong style={{ fontSize: 24, fontWeight: 600 }}>한옥스테이 여여 - 「{selectedRoom}」</strong>

      <InputForm title={translation("sidebar.date")}>
        <div className={cn("reservation-info-box")}>
          <ReservationInfo left={translation("sidebar.checkIn")} right={tmpStartDate} />
          <ReservationInfo left={translation("sidebar.checkOut")} right={tmpEndDate} />
          <div className={cn("border-line")} />
          <ReservationInfo 
            left={translation("sidebar.period")}
            right={
              i18next.language === "en"
                ? `${periodData.period} night${periodData.period > 1 ? "s" : ""} ${periodData.period + 1} days`
                : `${periodData.period}박 ${periodData.period + 1}일`
            }
            isLast
          />
        </div>
      </InputForm>
      <InputForm title={translation("sidebar.price")}>
        <div className={cn("reservation-info-box")}>
          <ReservationInfo
            left={translation("sidebar.regularPrice")}
            middle={`${periodData.originalPrice?.toLocaleString()}${i18next.language === "en" ? " Won" : "원"}`}
            right={`+ ${periodData.originalPrice?.toLocaleString()}${i18next.language === "en" ? " Won" : "원"}`}
          />
          {peopleNumber > 2 && (
            <ReservationInfo
              left={translation("sidebar.additionalCharge")}
              middle={`30,000${i18next.language === "en" ? " Won" : "원"} * ${periodData.period?.toLocaleString()}`}
              right={`+ ${(30000 * periodData.period)?.toLocaleString()}${i18next.language === "en" ? " Won" : "원"}`}
            />
          )}
          <ReservationInfo
            left={translation("sidebar.discount")}
            middle={`${
              periodData.period >= 2
                ? `20,000${i18next.language === "en" ? " Won" : "원"} * ${(periodData.period - 1)?.toLocaleString()}`
                : "-"
            }`}
            right={`${
              periodData.period >= 2
                ? `- ${periodData.discountedPrice?.toLocaleString()}${i18next.language === "en" ? " Won" : "원"}`
                : "-"
            }`}
          />
          <div className={cn("border-line")} />
          <ReservationInfo
            left={translation("sidebar.totalPrice")}
            right={
              peopleNumber > 2
                ? `${(periodData.totalPrice + 30000 * periodData.period)?.toLocaleString()}${
                    i18next.language === "en" ? " Won" : "원"
                  }`
                : `${periodData.totalPrice?.toLocaleString()}${i18next.language === "en" ? " Won" : "원"}`
            }
            isLast
          />
        </div>
      </InputForm>

      <button type="button" className={cn("reservation-button")} onClick={() => onClickPayment()}>
        {translation("sidebar.reserve")}
      </button>
    </div>
  );
}

export default ReservationSidebar;
