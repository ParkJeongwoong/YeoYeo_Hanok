import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Dayjs } from "dayjs";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
import ReservationSidebar from "@components/reservation/ReservationSidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from "jotai";
import modalStatus from "src/state/modalStatus";
import Agreement from "@components/reservation/Agreement";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import SEO from "src/utils/seo";
import LinkSelectModal from "@components/common/LinkSelectModal";

interface ReservationProps {
  fadeState: string;
}

function Reservation({ fadeState }: ReservationProps) {
  const [selectedRoom, setSelectedRoom] = useState<"여유" | "여행" | null>(null);
  const [username, setUsername] = useState<string>("");
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [peopleNumber, setPeopleNumber] = useState<number>(2);
  const [requestedTerm, setRequestedTerm] = useState<string>("");
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [agreementCompleted, setAgreementCompleted] = useState<boolean>(false);

  const router = useRouter();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(null);
  const [periodData, setPeriodData] = useState<PeriodDataType>({} as PeriodDataType);

  const [isModalMask, setIsModalMask] = useAtom(modalStatus);
  const [isModal, setIsModal] = useState<boolean>(false);
  const reservationFormRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("reservation");

  useEffect(() => {
    const clientTop = reservationFormRef.current?.getBoundingClientRect().top;
    if (periodData) {
      window.scrollTo({
        top: clientTop! - 73,
        behavior: "smooth",
      });
    }
  }, [periodData]);

  function callBack(response: any) {
    axios({
      method: "post",
      url: "/payment/pay",
      data: {
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
      },
    })
    .then(() => {
      alert("예약이 완료되었습니다.")
      router.push(`/reservation/success/${response.merchant_uid}`);
    })
    .catch(() => console.log("서버 전송 결과에 문제가 있습니다."));
  }

  function onClickPayment(merchantUid: number) {
    try {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init(process.env.NEXT_PUBLIC_IMP_UID);

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "tosspayments",
        merchant_uid: merchantUid, // 고유 주문번호 (날짜+방)
        name: `한옥스테이 여여 - ${selectedRoom}`,
        pay_method: "card",
        escrow: false,
        amount: peopleNumber > 2 ? periodData.totalPrice + 30000 * periodData.period : periodData.totalPrice, // 결제금액
        buyer_name: username,
        buyer_email: email,
        buyer_tel: userMobileNumber,
        currency: "KRW",
        locale: i18next.language,
        m_redirect_url: `https://yeoyeo.kr/reservation/success/${merchantUid}`,
        confirm_url: "https://api.yeoyeo.co.kr/payment/confirm",
        bypass: {
          tosspayments: {
            useInternationalCardOnly: i18next.language === "en", // 영어 결제창 활성화
          }
        },
      };

      IMP.request_pay(data, callBack);
    } catch (e) {
      console.log("error error", e);
    }
  }

  function getReservationId() {
    const dateRoomIdList: string[] = [];
    periodData.infoDtoList.map((item) => dateRoomIdList.push(item.dateRoomId));

    const data = {
      dateRoomIdList,
      email,
      guestCount: peopleNumber,
      name: username,
      phoneNumber: userMobileNumber,
      request: requestedTerm,
    };
    axios({
      method: "post",
      url: "/reservation/reserve",
      data,
    })
      .then((res) => {
        onClickPayment(res.data.resultId);
      })
      .catch((err) => console.log("err", err));
  }

  function validCheck() {
    if (formCompleted && agreementCompleted) {
      getReservationId();
    } else {
      alert("예약폼완성 및 동의사항을 체크해주세요.");
    }
  }

  return (
    <>
      <SEO
        title="예약하기"
        description="한옥스테이 여여의 실시간 예약 페이지입니다."
        siteTitle="한옥스테이 여여"
      />
      <div className={cn(`reservation-wrap ${fadeState}`)}>
        <div className={cn("reservation-inner")}>
          <h2 className={cn("title")}>Reservation</h2>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            checkoutDate={checkoutDate}
            setCheckoutDate={setCheckoutDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setPeriodData={setPeriodData}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            translation={t}
            setIsModal={setIsModal}
          />
          {startDate && endDate && (
            <>
              <div ref={reservationFormRef} className={cn("reservation-form-wrap")}>
                <CustomerForm
                  username={username}
                  setUsername={setUsername}
                  userMobileNumber={userMobileNumber}
                  setUserMobileNumber={setUserMobileNumber}
                  email={email}
                  setEmail={setEmail}
                  peopleNumber={peopleNumber}
                  setPeopleNumber={setPeopleNumber}
                  requestedTerm={requestedTerm}
                  setRequestedTerm={setRequestedTerm}
                  setCanReserve={setFormCompleted}
                  translation={t}
                />
                <ReservationSidebar
                  startDate={startDate}
                  endDate={endDate}
                  periodData={periodData}
                  peopleNumber={peopleNumber}
                  onClickPayment={() => validCheck()}
                  selectedRoom={selectedRoom}
                  translation={t}
                />
              </div>
              <Agreement setAgreementCompleted={setAgreementCompleted} />
            </>
          )}
        </div>
        {isModalMask && (
          <div
            tabIndex={0}
            role="button"
            className={cn("modal-mask")}
            onClick={() => setIsModalMask(false)}
            onKeyDown={() => {}}
            aria-label="close modal"
          />
        )}
        {isModal && (
          <LinkSelectModal setIsModal={setIsModal} />
        )}
      </div>
    </>
  );
}

export default Reservation;
