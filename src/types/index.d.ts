import { Dayjs } from "dayjs";
import { TFunction } from "i18next";

declare global {
  interface MonthRoomData {
    [key: string]: MonthRoomDataItem[];
  }

  interface MonthRoomDataItem {
    date: string;
    rooms: DateRoomItem[];
  }

  interface DateRoomItem {
    merchant_uid: string;
    price: number;
    reservationState: 0 | 1;
    roomId: number;
    roomName: string;
    reservable: true | false;
  }

  interface DateCellProps {
    day: number;
    data: MonthRoomDataItem[];
    cellData: DateRoomItem[];
    handleDateClick: (day: number, date: Dayjs) => void;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    checkoutDate: Dayjs | null;
    currentDate: Dayjs;
    selectedRoom: "여유" | "여행" | null;
    setSelectedRoom: (selectedRoom: "여유" | "여행") => void;
    setCheckoutDate: (checkoutDate: Dayjs | null) => void;
  }
  interface CalendarProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    checkoutDate: Dayjs | null;
    setCheckoutDate: (checkoutDate: Dayjs | null) => void;
    data: MonthRoomDataItem[];
    twoMonthsData: MonthRoomDataItem[];
    currentDate: Dayjs;
    handleDateClick: (day: number, date: Dayjs) => void;
    selectedRoom: "여유" | "여행" | null;
    setSelectedRoom: (selectedRoom: "여유" | "여행") => void;
  }

  interface RoomSelectModalProps {
    setSelectedRoom: (selectedRoom: "여유" | "여행") => void;
    setIsModal: (isModal: boolean) => void;
    handleCellClick: () => void;
  }
  interface InfoDtoListData {
    date: string;
    dateRoomId: string;
    price: number;
  }
  interface PeriodDataType {
    discountedPrice: number;
    infoDtoList: InfoDtoListData[];
    originalPrice: number;
    period: number;
    totalPrice: number;
  }

  interface DatePickerProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    checkoutDate: Dayjs | null;
    setStartDate: (startDate: Dayjs | null) => void;
    setEndDate: (endDate: Dayjs | null) => void;
    setPeriodData: (periodData: PeriodDataType) => void;
    setCheckoutDate: (checkoutDate: Dayjs | null) => void;
    selectedRoom: "여유" | "여행" | null;
    setSelectedRoom: (selectedRoom: "여유" | "여행" | null) => void;
    translation: TFunction;
    setIsModal: (isModal: boolean) => void;
  }

  interface LinkSelectModalProps {
    setIsModal: (isModal: boolean) => void;
  }

  interface CellRenderInfo {
    originNode: React.ReactElement;
    today: any;
    range?: "start" | "end" | undefined;
    type: any;
    locale?: any;
    subType?: "hour" | "minute" | "second" | "meridiem" | undefined;
  }
}

declare global {
  interface Window {
    gtag: any;
    IMP: any;
  }
}

declare module '*.png' {
  const src: string;
}