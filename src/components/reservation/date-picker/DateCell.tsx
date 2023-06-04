import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import modalStatus from "src/state/modalStatus";

import RoomSelectModal from "./RoomSelectModal";

function DateCell({
  day,
  data,
  cellData,
  handleDateClick,
  startDate,
  endDate,
  checkoutDate,
  setCheckoutDate,
  currentDate,
  selectedRoom,
  setSelectedRoom,
}: DateCellProps) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useAtom(modalStatus);

  const cellDate = dayjs(currentDate).set("date", day);

  const isPastAsSelectedDate = dayjs() < cellDate && startDate && cellDate < startDate;
  const isAfterAsSelectedDate = endDate && cellDate > endDate;
  const afterCheckoutDate = checkoutDate !== null && checkoutDate.isBefore(cellDate, "date");
  const { t } = useTranslation("common");
  // TODO: useContext datePicker에 생성. Provider로 내려주기.
  const handleCellClick = () => {
    console.log("현재startDate", startDate, "현재CheckoutDate", checkoutDate);
    if (startDate === null && cellData && selectedRoom === "여유" && (cellData[0].reservationState === 1 || !cellData[0].reservable)) return;
    if (startDate === null && cellData && selectedRoom === "여행" && (cellData[1].reservationState === 1 || !cellData[1].reservable)) return;
    if (startDate === null && cellData && (cellData[0].reservationState === 1 || !cellData[0].reservable) && (cellData[1].reservationState === 1 || !cellData[1].reservable))
      return;
    if (isPastAsSelectedDate || isAfterAsSelectedDate) return;
    if (afterCheckoutDate) return;
    if (
      cellData[0].reservationState === 0 &&
      cellData[1].reservationState === 0 &&
      !isAfterAsSelectedDate &&
      !isPastAsSelectedDate &&
      !modalOpen &&
      !isModal &&
      selectedRoom === null
    ) {
      setModalOpen(true);
      setIsModal(true);
      return;
    }
    if (!(dayjs() > dayjs(currentDate).set("date", day) && "passed-date")) {
      // handleDateClick(day, currentDate);
      // A방만 예약된 경우 => B방으로 설정
      // B방만 예약된 경우 => A방으로 설정
      // 두 방 모두 예약된 경우 => startDate로 선택불가, 체크아웃만 가능
      if ((cellData[0].reservationState === 1 || !cellData[0].reservable) && cellData[1].reservationState === 0) {
        handleDateClick(day, currentDate);
        if (selectedRoom !== "여유") {
          // 체크아웃으로 선택되지않을경우 => B로 선택
          setSelectedRoom("여행");
        }
      } else if (cellData[0].reservationState === 0 && (cellData[1].reservationState === 1 || !cellData[1].reservable)) {
        handleDateClick(day, currentDate);
        if (selectedRoom !== "여행") {
          setSelectedRoom("여유");
        }
      } else if (startDate !== null && (cellData[0].reservationState === 1 || !cellData[0].reservable) && (cellData[1].reservationState === 1 || !cellData[1].reservable)) {
        handleDateClick(day, currentDate);
        // setCanReserve(false);
      } else handleDateClick(day, currentDate);
    }
  };

  useEffect(() => {
    if (!modalOpen) {
      setIsModal(false);
    }
  }, [modalOpen]);

  // useEffect(() => {
  //   if (startDate && selectedRoom !== null) {
  //     const roomNum = selectedRoom === "A" ? 0 : 1;
  //     const index = data.findIndex((e) => e.date === startDate.format("YYYY-MM-DD"));
  //     const reserved = data.slice(index).find(({ rooms }) => rooms[roomNum].reservationState);
  //     if (reserved) {
  //       setCheckoutDate(dayjs(reserved.date));
  //     } else {
  //       setCheckoutDate(null);
  //     }
  //   } else {
  //     setCheckoutDate(null);
  //   }
  // }, [data, selectedRoom, startDate]);

  useEffect(() => {
    if (data && startDate && selectedRoom !== null) {
      const a = data.findIndex((e) => e.date === startDate.format("YYYY-MM-DD"));
      const roomNum = selectedRoom === "여유" ? 0 : 1;

      if (a !== -1) {
        if (!checkoutDate) {
          for (let i = a; i < data.length; i += 1) {
            if (data[i].rooms[roomNum].reservationState) {
              setCheckoutDate(dayjs(data[i].date));
              break;
            }
          }
        }
      }
    } else {
      setCheckoutDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, checkoutDate]);

  const isPassed = dayjs() > dayjs(currentDate).set("date", day);

  return (
    <td
      key={day}
      onClick={isPassed ? (e) => e.preventDefault() : () => handleCellClick()}
      aria-hidden="true"
      // className={selectedDate.getDate() === day ? "selected" : ""}
      className={cn(
        (cellDate.isSame(startDate) || cellDate.isSame(endDate)) && "selected",
        startDate && startDate < cellDate && endDate && endDate > cellDate && "between-day",
        isPassed && "passed-date",
        isModal && "room-selecting",

        // canReserve === false && "passed-date",
        isPastAsSelectedDate && "passed-date",
        isAfterAsSelectedDate && "passed-date",

        cellData && (cellData[0].reservationState === 1 || !cellData[0].reservable) && (cellData[1].reservationState === 1 || !cellData[1].reservable) && "notAvailable",

        ((cellData && selectedRoom === "여유" && (cellData[0].reservationState === 1 || !cellData[0].reservable)) ||
          (cellData && selectedRoom === "여행" && (cellData[1].reservationState === 1 || !cellData[1].reservable))) &&
          !isPassed &&
          !isPastAsSelectedDate &&
          !isAfterAsSelectedDate &&
          "checkout-only one-day-selected",

        startDate &&
          !cellDate.isSame(checkoutDate, "date") &&
          ((cellData && selectedRoom === "여유" && (cellData[0].reservationState === 1 || !cellData[0].reservable)) ||
            (cellData && selectedRoom === "여행" && (cellData[1].reservationState === 1 || !cellData[1].reservable))) &&
          cellData &&
          (cellData[0].reservationState === 1 || !cellData[0].reservable) &&
          (cellData[1].reservationState === 1 || !cellData[1].reservable) &&
          !isPassed &&
          !isPastAsSelectedDate &&
          !isAfterAsSelectedDate &&
          "passed-date",

        afterCheckoutDate && "passed-date",
      )}
    >
      <div className={cn("day")}>{day}</div>
      <span className={cn("tooltip-text-a")}>{t("reservation.checkoutOnly")}</span>
      <span className={cn("tooltip-text-b")}>{t("reservation.notAvailable")}</span>
      {cellData && (
        <>
          {/* <div>{!data[day - 1] && data[day - 1].rooms[0].price}</div> */}
          <ul className={cn("room-list")}>
            {/* {selectedRoom} */}
            {!isPassed && (selectedRoom === "여유" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[0].reservationState === 0 && "available")}>
                <strong className={cn("room-name")}>여유</strong>
                <span className={cn("price")}>{cellData[0].price / 10000}</span>
              </li>
            )}
            {cellData[1].reservationState === 0 && !isPassed && (selectedRoom === "여행" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[1].reservationState === 0 && "available")}>
                <strong className={cn("room-name")}>여행</strong>
                <span className={cn("price")}>{cellData[1].price / 10000}</span>
              </li>
            )}
          </ul>
        </>
      )}
      {isModal && (
        <RoomSelectModal setSelectedRoom={setSelectedRoom} setIsModal={setIsModal} handleCellClick={handleCellClick} />
      )}
    </td>
  );
}

export default DateCell;
