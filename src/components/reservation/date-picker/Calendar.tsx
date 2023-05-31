import cn from "classnames";

import DateCell from "./DateCell";

function Calendar({
  startDate,
  endDate,
  checkoutDate,
  setCheckoutDate,
  currentDate,
  handleDateClick,
  data,
  twoMonthsData,
  selectedRoom,
  setSelectedRoom,
}: CalendarProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  // getDay() -> 현재 요일 구함 (일요일 0 ~ 토요일 7)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  return (
    <div className={cn("calendar-item")}>
      <span className={cn("month-year")}>
        {monthNames[currentDate.get("month")]} {currentDate.get("year")}
      </span>
      <table className={cn("calendar")}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            Array.from({ length: 6 }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: 7 }, (__, j) => {
                  const day = 7 * i + j + 1 - getFirstDayOfMonth(currentDate.get("M"), currentDate.get("year"));
                  if (day > 0 && day <= getDaysInMonth(currentDate.get("M"), currentDate.get("year"))) {
                    // const cellDate = dayjs(currentDate).set("date", day);
                    return (
                      <DateCell
                        key={currentDate.toString() + day}
                        day={day}
                        data={twoMonthsData}
                        cellData={data[day - 1] && (data[day - 1].rooms as DateRoomItem[])}
                        handleDateClick={handleDateClick}
                        startDate={startDate}
                        endDate={endDate}
                        checkoutDate={checkoutDate}
                        currentDate={currentDate}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        setCheckoutDate={setCheckoutDate}
                      />
                    );
                  }
                  return <td key={j} className={cn("no-date")} />;
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
