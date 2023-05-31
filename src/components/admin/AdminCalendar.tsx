import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import Calendar from "@components/reservation/date-picker/Calendar";
import { Button } from "antd";

function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs().set("date", 1));
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [roomMonthData, setRoomMonthData] = useState<MonthRoomData>({} as MonthRoomData);
  const [nextMonth, setNextMonth] = useState(dayjs(currentDate).add(1, "month"));
  const [selectedRoom, setSelectedRoom] = useState<"여유" | "여행" | null>(null);
  const [, setPeriodData] = useState<PeriodDataType>({} as PeriodDataType);
  const [checkoutDate, setCheckoutDate] = useState<any | null>(null);
  const [twoMonthsData, setTwoMonthsData] = useState<any>();

  const handlePrevMonth = () => {
    if (currentDate < dayjs().set("date", 1)) return;
    setCurrentDate((prevState) => dayjs(prevState).add(-1, "month").set("date", 1));
  };
  const handleNextMonth = () => setCurrentDate((prevState) => dayjs(prevState).add(1, "month").set("date", 1));
  const handleDateClick = (day: number, date: Dayjs) => {
    const selectedDate = dayjs(date).set("date", day);

    if (startDate?.isSame(selectedDate)) {
      setStartDate(null);
      return;
    }
    if (endDate?.isSame(selectedDate)) {
      setEndDate(null);
      return;
    }
    if (startDate === null || startDate > selectedDate || (endDate !== null && endDate > selectedDate)) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  useEffect(() => {
    setNextMonth(dayjs(currentDate).add(1, "month"));
  }, [currentDate]);

  useEffect(() => {
    axios({
      method: "get",
      url: `/dateroom/${currentDate.get("year")}/${currentDate.get("month") + 1}`,
    }).then((res) => {
      setTwoMonthsData([...res.data.month, ...res.data.nextMonth]);
      setRoomMonthData(res.data);
    });
  }, [currentDate]);

  // TODO: start/end date 모두 설정 시 데이터 계산해서 넘겨주기
  useEffect(() => {
    if (startDate && endDate) {
      axios({
        method: "get",
        url: `/dateroom/price/1/${startDate.format("YYYYMMDD")}/${endDate.format("YYYYMMDD")}`,
      }).then((res) => {
        setPeriodData(res.data);
        console.log("inside res", res.data);
      });
    }
  }, [startDate, endDate, setPeriodData]);

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        <div>
          <div className={cn("date-picker-wrap")}>
            <div className={cn("calendar-header")}>
              <button type="button" onClick={() => handlePrevMonth()}>
                Prev
              </button>
              <button type="button" onClick={() => handleNextMonth()}>
                Next
              </button>
            </div>
            <div className={cn("calender-wrap")}>
              <Calendar
                startDate={startDate}
                endDate={endDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                data={roomMonthData?.month}
                currentDate={currentDate}
                handleDateClick={handleDateClick}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                twoMonthsData={twoMonthsData}
              />
              <Calendar
                startDate={startDate}
                endDate={endDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                data={roomMonthData?.nextMonth}
                currentDate={nextMonth}
                handleDateClick={handleDateClick}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                twoMonthsData={twoMonthsData}
              />
            </div>
            <div className={cn("input-wrap")}>
              <input
                type="text"
                value={startDate?.format("YYYY-MM-DD") || ""}
                // onFocus={() => setFocusedInput("startDate")}
                placeholder="Start Date"
                onChange={() => null}
              />
              <input
                type="text"
                value={endDate?.format("YYYY-MM-DD") || ""}
                // onFocus={() => setFocusedInput("endDate")}
                placeholder="End Date"
                onChange={() => null}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "10px",
              flexDirection: "column",
            }}
          >
            <Button onClick={() => {}}>hi</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCalendar;
