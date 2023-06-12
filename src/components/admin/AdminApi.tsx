import axios from "axios";

const getReservation = async (i: number) => {
  const res = axios({
    method: "get",
    url: `/admin/reservation/list/${i}`,
  });
  return res;
};

const types = [0, 1, 2, 3, 4];

export const getReservations = async () => Promise.all(types.map((i) => getReservation(i)));

export const deleteReservation = async (i: number) => {
  const res = axios({
    method: "delete",
    url: `/admin/reservation/${i}`,
  });
  return res;
};

export const deletePayment = async (i: number) => {
  const res = axios({
    method: "delete",
    url: `/admin/payment/${i}`,
  });
  return res;
};

export interface Date {
  year: number;
  month: number;
  day: number;
}

export const updateReservation = async (date: Date, roomId: number) => {
  const res = axios({
    method: "post",
    url: `/admin/dateroom`,
    data: {
      year: date.year,
      month: date.month,
      day: date.day,
      roomId,
    },
  });
  return res;
};

export const updatePrice = async (dateRoomIdList: string[], price: number, priceType: number) => {
  const res = axios({
    method: "put",
    url: `/admin/dateroom/list/price`,
    data: {
      dateRoomIdList,
      price,
      priceType,
    },
  });
  return res;
};

export const updateStatus = async (dateRoomIdList: string[], roomReservationState: number) => {
  const res = axios({
    method: "put",
    url: `/admin/dateroom/list/status`,
    data: {
      dateRoomIdList,
      roomReservationState,
    },
  });
  return res;
};
