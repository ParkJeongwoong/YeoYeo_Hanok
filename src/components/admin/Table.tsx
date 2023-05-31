import { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import { getReservations } from "./AdminApi";

interface Reservation {
  checkInDate: string;
  roomName: string;
  reservationState: number;
}

interface CalendarData {
  type: string;
  content: string;
}

function Table() {
  const [datas, setDatas] = useState([{ data: [{} as Reservation] }]);
  const [month, setMonth] = useState(dayjs().month());
  useEffect(() => {
    getReservations().then((reservations) => setDatas(reservations));
  }, []);

  const getCurrentMonthDates = (reservations: Reservation[]): Reservation[] =>
    reservations.filter((data) => dayjs(data.checkInDate).month() === month);

  const currentMonthDates = getCurrentMonthDates(datas[0].data);

  const getUniqueDates = (duplicateDates: Reservation[]) =>
    duplicateDates.reduce((acc: Reservation[], curr) => {
      if (
        !acc.find(
          (item: Reservation) =>
            item.checkInDate === curr.checkInDate &&
            item.roomName === curr.roomName &&
            item.reservationState === curr.reservationState,
        )
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);

  const getBadgeState = (data: Reservation) => {
    const states = ["미결제", "숙박 예정", "예약 취소", "환불 완료"];
    const space = "";
    if (data.reservationState === 0) {
      return { type: "processing", content: data.roomName + space + states[0] };
    }
    if (data.reservationState === 1) {
      return { type: "success", content: data.roomName + space + states[1] };
    }
    if (data.reservationState === -1) {
      return { type: "error", content: data.roomName + space + states[2] };
    }
    if (data.reservationState === -2) {
      return { type: "default", content: data.roomName + space + states[3] };
    }
    return { type: "None", content: data.roomName };
  };

  const getReservationState = (reservations: Reservation[]) =>
    reservations.reduce<CalendarData[]>((acc, data) => {
      const badgeState = getBadgeState(data);
      if (badgeState.type !== "None") {
        acc.push(badgeState);
      }
      return acc;
    }, []);

  const getListData = (value: Dayjs): CalendarData[] => {
    const uniqueDates = getUniqueDates(currentMonthDates);
    const dayUniqueDates = uniqueDates.filter((date) => dayjs(date.checkInDate).date() === value.date());
    return getReservationState(dayUniqueDates);
  };

  // const getMonthData = (value: Dayjs) => {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  // };

  // const monthCellRender = (value: Dayjs) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (current: Dayjs, mode: string) => {
    if (mode === "month") {
      const selectedMonth = current.month();
      setMonth(selectedMonth);
    }
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />;
}

export default Table;
