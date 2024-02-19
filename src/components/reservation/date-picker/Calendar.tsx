import cn from "classnames";
import i18next from "i18next";

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
    ["January","1월"],
    ["February","2월"],
    ["March","3월"],
    ["April","4월"],
    ["May","5월"],
    ["June","6월"],
    ["July","7월"],
    ["August","8월"],
    ["September","9월"],
    ["October","10월"],
    ["November","11월"],
    ["December","12월"],
  ];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  // getDay() -> 현재 요일 구함 (일요일 0 ~ 토요일 7)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  return (
    <div className={cn("calendar-item")}>
      <span className={cn("month-year")}>
        {i18next.language === "en" ? `${monthNames[currentDate.get("month")][0]} ${currentDate.get("year")}` : `${currentDate.get("year")}년 ${monthNames[currentDate.get("month")][1]}`}
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
                  return <td key={j} aria-label="no-date" className={cn("no-date", selectedRoom !== null && "passed-date")} />;
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
