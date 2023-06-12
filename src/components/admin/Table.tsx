import { CellRenderInfo } from "rc-picker/lib/interface";
import { CookieSetOptions } from 'universal-cookie';
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Button, InputNumber, Modal, Radio, Space } from "antd";
import { getReservations, updatePrice, updateStatus, deletePayment, deleteReservation } from "./AdminApi";

interface TableProps {
  removeCookie: (name: "SESSION", options?: CookieSetOptions) => void;
}

interface Reservation {
  checkInDate: string;
  roomName: string;
  reservationState: number;
  reservationId?: number;
}

interface CalendarData {
  type: string;
  content: string;
}

function Table({ removeCookie }: TableProps) {
  const [datas, setDatas] = useState([{ data: [{} as Reservation] }]);
  const [pickedDate, setPickedDate] = useState([{} as Reservation]);
  const [pickedReservationId, setPickedReservationId] = useState<number>(0);
  const [month, setMonth] = useState(dayjs().month());
  const [price, setPrice] = useState<number>(235000);
  const [priceType, setPriceType] = useState<number>(1);
  const [status, setStatus] = useState<number>(0);
  // 여유: 1, 여행: 2
  const [roomName, setRoomName] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getReservations()
    .then((reservations) => setDatas(reservations))
    .catch(() => {
      removeCookie("SESSION", { path: "/admin" })
    });
  }, [selectedDate, roomName, removeCookie]);

  const roomNameStr = roomName === 1 ? "여유" : "여행";
  const dash = "-";
  const zero = "0";

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

  // 환불 처리 - 숙박 예정, 예약 취소 - 숙박 예정
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

  // reservationId, roomName (여행 1, 여유 2), checkInDate

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
    if (month !== dayjs(current).month()) return "";
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const priceOnChange = (value: any) => {
    setPrice(value);
  };

  const priceTypeOnChange = (value: any) => {
    setPriceType(value.target.value);
  };

  const statusOnChange = (value: any) => {
    setStatus(value.target.value);
  };

  const roomTypeOnChange = (value: any) => {
    setRoomName(value.target.value);
    const ans = pickedDate.filter((i) => i.roomName === roomNameStr);
    if (ans.length) setPickedReservationId(ans[0].reservationId || 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
    setPriceType(1);
    setStatus(0);
    setRoomName(1);
  };

  const okModal = () => {
    setIsModalOpen(false);
    updatePrice(
      [
        dayjs(selectedDate).year().toString() +
          (dayjs(selectedDate).month() + 1 < 10
            ? zero + (dayjs(selectedDate).month() + 1).toString()
            : (dayjs(selectedDate).month() + 1).toString()) +
          dayjs(selectedDate).date().toString() +
          roomName.toString(),
      ],
      price,
      priceType,
    );
    updateStatus(
      [
        dayjs(selectedDate).year().toString() +
          (dayjs(selectedDate).month() + 1 < 10
            ? zero + (dayjs(selectedDate).month() + 1).toString()
            : (dayjs(selectedDate).month() + 1).toString()) +
          dayjs(selectedDate).date().toString() +
          roomName.toString(),
      ],
      status,
    );
    setPriceType(1);
    setStatus(0);
    setRoomName(1);
  };

  const onSelect = (value: Dayjs) => {
    const checkedDate =
      dayjs(value).year().toString() +
      dash +
      (dayjs(value).month() + 1 < 10
        ? zero + (dayjs(value).month() + 1).toString()
        : (dayjs(value).month() + 1).toString()) +
      dash +
      (dayjs(value).date() + 1 < 10 ? zero + dayjs(value).date().toString() : dayjs(value).date().toString());
    const ans = datas[1].data.filter((reservation) => reservation.checkInDate === checkedDate);
    setPickedDate(ans);
    setSelectedDate(value);
    openModal();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "80%",
          height: "80%",
          marginTop: "200px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Calendar cellRender={cellRender} onPanelChange={onPanelChange} onSelect={onSelect} />
        <Modal
          title="방 가격/상태 수정"
          open={isModalOpen}
          onOk={okModal}
          onCancel={cancelModal}
          footer={[
            <Button key="back" onClick={cancelModal}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={okModal}>
              <span style={{ color: "white" }}>가격/상태 수정</span>
            </Button>,
            <Button
              danger
              key="refund"
              onClick={() => {
                deletePayment(pickedReservationId);
                setPriceType(1);
                setStatus(0);
                setRoomName(1);
              }}
              disabled={!pickedDate.some((date) => date.roomName === roomNameStr)}
            >
              <span style={{ color: "red" }}>환불</span>
            </Button>,
            <Button
              danger
              key="cancel"
              onClick={() => {
                deleteReservation(pickedReservationId);
                setPriceType(1);
                setStatus(0);
                setRoomName(1);
              }}
              disabled={!pickedDate.some((date) => date.roomName === roomNameStr)}
            >
              <span style={{ color: "red" }}>예약 취소</span>
            </Button>,
          ]}
        >
          <div>
            <Radio.Group onChange={priceTypeOnChange} value={priceType}>
              <Space direction="vertical">
                <Radio value={1}>비수기 주중</Radio>
                <Radio value={2}>비수기 주말</Radio>
                <Radio value={3}>성수기 주중</Radio>
                <Radio value={4}>성수기 주말</Radio>
                <Radio value={5}>
                  가격 직접 수정{"  "}
                  <InputNumber min={0} max={1000000} defaultValue={250000} onChange={priceOnChange} />
                </Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={statusOnChange} value={status}>
              <Space direction="vertical">
                <Radio value={0}>예약 가능</Radio>
                <Radio value={1}>예약 완료</Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={roomTypeOnChange} value={roomName}>
              <Space direction="vertical">
                <Radio value={1}>여유</Radio>
                <Radio value={2}>여행</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Table;
