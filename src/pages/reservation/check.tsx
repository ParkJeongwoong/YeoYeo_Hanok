import Input from "@components/common/Input";
import axios from "axios";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { validReservationNumberPatter, validUserMobileNumber } from "src/utils/regEx";
import SEO from "src/utils/seo";

interface ReservationCheckProps {
  fadeState: string;
  setFadeState: (fadeState: string) => void;
}

function ReservationCheck({ fadeState, setFadeState }: ReservationCheckProps) {
  const router = useRouter();
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [reservationNumber, setReservationNumber] = useState<string>("");
  const [isInputAllValid, setIsInputAllValid] = useState<boolean>(false);
  const { t } = useTranslation("reservation");

  const autoRegExPhoneNumber = (inputValue: string): string => {
    if (inputValue.length > 8)
      return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{4})(\d{1,4})$/, `$1-$2-$3`);
    if (inputValue.length > 3)
      return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{1,4})$/, `$1-$2`);
    return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{1,4})(\d{4})$/, `$1-$2-$3`);
  }

  useEffect(() => {
    if (validUserMobileNumber.test(userMobileNumber) && validReservationNumberPatter.test(reservationNumber)) {
      setIsInputAllValid(true);
    } else {
      setIsInputAllValid(false);
    }
  }, [userMobileNumber, reservationNumber]);

  const reqReservationCheck = () => {
    if (validUserMobileNumber && validReservationNumberPatter) {
      axios({
        method: "get",
        url: `reservation/detail/${reservationNumber}/${userMobileNumber}`,
      })
        .then((res) => {
          if (res.data) {
            setFadeState("fade-out");
            router.push(
              {
                pathname: "/reservation/detail",
                query: { phoneNumber: res.data.phoneNumber,
                  roomName: res.data.roomName,
                  startDate: res.data.startDate,
                  endDate: res.data.endDate,
                  guestCount: res.data.guestCount,
                  paidAmount : res.data.paidAmount.toLocaleString(),
                  reservationNumber },
              },
              "/reservation/detail"
            )
            setTimeout(()=>{
              setFadeState("fade-in");
            }, 500)
          } else {
            alert(`해당 예약을 확인할 수 없습니다.`);
          }
        })
        .catch((err) => {
          alert(`해당 예약을 확인할 수 없습니다. ${err.message}`);
        });
    } else {
      alert("휴대폰번호 혹은 예약번호를 확인해주세요.");
    }
  };

  return (
    <>
      <SEO
        title="예약 조회"
        description="한옥스테이 여여의 예약 조회 페이지입니다."
        siteTitle="한옥스테이 여여"
      />
      <div className={cn(`reservation-check-wrap ${fadeState}`)}>
        <div className="section-wrap">
          <div className={cn("header")}>
          <strong>{t("check.title")}</strong>
            <ul>
              <li>1. {t("check.guideMessage1")}</li>
              <li>2. {t("check.guideMessage2")}</li>
            </ul>
          </div>

          <div className={cn("contents")}>
            <div>
              <Input
                title={`${t("check.mobileNumber")}`}
                regEx={validUserMobileNumber}
                placeholder="000-0000-0000"
                inputValue={userMobileNumber}
                setInputValue={setUserMobileNumber}
                autoRegEx={autoRegExPhoneNumber}
                errorText={`${t("check.errorText.mobileNumber")}`}
                maxLength={13}
              />
              <Input
                title={`${t("check.reservationNumber")}`}
                regEx={validReservationNumberPatter}
                placeholder={`${t("check.placeholderText.reservationNumber")}`}
                inputValue={reservationNumber}
                setInputValue={setReservationNumber}
                errorText={`${t("check.errorText.reservationNumber")}`}
                maxLength={13}
              />
            </div>
            <div className={cn("button-wrap")}>
              <button type="button" onClick={reqReservationCheck} disabled={!isInputAllValid}>
                <span>{t("check.confirmReservation")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationCheck;
