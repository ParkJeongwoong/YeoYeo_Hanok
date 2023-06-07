import Input from "@components/common/Input";
import axios from "axios";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { validReservationNumberPatter, validUserMobileNumber } from "src/utils/regEx";
import SEO from "src/utils/seo";

function ReservationCheck({ fadeState, setFadeState }: any) {
  const router = useRouter();
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [reservationNumber, setReservationNumber] = useState<string>("");
  const [isInputAllValid, setIsInputAllValid] = useState<boolean>(false);

  const autoRegExPhoneNumber = (inputValue: string) : string => {
    if (inputValue.length > 8) return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{4})(\d{1,4})$/,`$1-$2-$3`);
    if (inputValue.length > 3) return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{1,4})$/,`$1-$2`);
    return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{1,4})(\d{4})$/,`$1-$2-$3`);
  }

  useEffect(() => {
    if (validUserMobileNumber.test(userMobileNumber) && validReservationNumberPatter.test(reservationNumber)) {
      setIsInputAllValid(true);
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
        title="예약 정보"
        description="한옥스테이 여여의 예약 정보 조회 페이지입니다."
        siteTitle="한옥스테이 여여"
      />
      <div className={cn(`reservation-check-wrap ${fadeState}`)}>
        <div className="section-wrap">
          <div className={cn("header")}>
            <strong>예약 조회 / 취소 안내</strong>
            <ul>
              <li>1. 예약상품의 세부내역은 각 상품의 상세보기 버튼을 클릭하시면 확인할 수 있습니다.</li>
              <li>2. 예약취소는 각 상품의 상세보기 클릭 후 취소버튼을 클릭하시면 자동으로 환불요청 됩니다.</li>
            </ul>
          </div>

          <div className={cn("contents")}>
            <div>
              <Input
                title="핸드폰번호"
                regEx={validUserMobileNumber}
                placeholder="000-0000-0000"
                inputValue={userMobileNumber}
                setInputValue={setUserMobileNumber}
                autoRegEx={autoRegExPhoneNumber}
                errorText="번호가 올바르지 않습니다. 000-0000-0000 형식으로 작성해주세요."
                //   classnames="user-mobile-input"
                maxLength={13}
              />
              <Input
                title="예약번호"
                regEx={validReservationNumberPatter}
                placeholder="예약번호 13자리를 입력해주세요."
                inputValue={reservationNumber}
                setInputValue={setReservationNumber}
                errorText="문자로 전송된 예약번호 13자리를 입력해주세요."
                //   classnames="reservation-number"
                maxLength={13}
              />
              {/* <span>문자로 전송된 예약번호 13자리를 입력해주세요.</span> */}
            </div>
            <div className={cn("button-wrap")}>
              <button type="button" onClick={reqReservationCheck} disabled={!isInputAllValid}>
                <span>예약확인</span>
              </button>
            </div>
          </div>

          {/* <div className={cn("bottom-nav")}>
            <strong>유의사항</strong>
            <ul>
              <li>1. 예약상품의 세부내역은 각 상품의 상세보기 버튼을 클릭하시면 확인할 수 있습니다.</li>
              <li>2. 예약취소는 각 상품의 상세보기 클릭 후 취소버튼을 클릭하시면 자동으로 환불요청 됩니다.</li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ReservationCheck;
