import { ChangeEvent, useEffect, useState } from "react";
import cn from "classnames";
import { TFunction } from "i18next";

import Input from "@components/common/Input";
import InputForm from "@components/common/InputForm";
import InputPeopleNumber from "@components/common/InputPeopleNumber";
import { validUsername, validEmail, validUserMobileNumber } from "src/utils/regEx";
import axios from "axios";
import Timer from "./Timer";

interface CustomerFormProps {
  username: string;
  setUsername: (username: string) => void;
  userMobileNumber: string;
  setUserMobileNumber: (userMobileNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
  peopleNumber: number;
  setPeopleNumber: React.Dispatch<React.SetStateAction<number>>;
  requestedTerm: string;
  setRequestedTerm: (requestedTerm: string) => void;
  setCanReserve: (canReserve: boolean) => void;
  translation: TFunction;
}

function CustomerForm({
  username,
  setUsername,
  userMobileNumber,
  setUserMobileNumber,
  email,
  setEmail,
  peopleNumber,
  setPeopleNumber,
  requestedTerm,
  setRequestedTerm,
  setCanReserve,
  translation
}: CustomerFormProps) {
  const [userAuthNumber, setUserAuthNumber] = useState<string>("");
  const [authResultMsg, setAuthResultMsg] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isBtnFocused, setIsBtnFocused] = useState<boolean>(false);

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRequestedTerm(value);
  };
  const handleAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserAuthNumber(value);
  };
  const autoRegExPhoneNumber = (inputValue: string) : string => {
    if (inputValue.length > 8) return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{4})(\d{1,4})$/,`$1-$2-$3`);
    if (inputValue.length > 3) return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{1,4})$/,`$1-$2`);
    return inputValue.replace(/[^0-9]/g,'').replace(/^(\d{3})(\d{1,4})(\d{4})$/,`$1-$2-$3`);
  }

  useEffect(() => {
    if (validUsername.test(username) 
      && validUserMobileNumber.test(userMobileNumber)
      && validEmail.test(email)
      && isAuthorized) setCanReserve(true);
    else setCanReserve(false);
  }, [username, userMobileNumber, email, isAuthorized, setCanReserve]);

  return (
    <div className={cn("customer-form-wrap")}>
      <Input
        title={translation("form.name")}
        regEx={validUsername}
        placeholder="이름을 입력해주세요"
        inputValue={username}
        setInputValue={setUsername}
        errorText="영문이나 한글로만 작성해주세요."
      />
      <Input
        title={translation("form.email")}
        regEx={validEmail}
        placeholder="이메일을 입력해주세요"
        inputValue={email}
        setInputValue={setEmail}
        errorText="올바른 이메일 양식으로 작성해주세요."
        type="email"
      />
      <InputForm title={translation("form.contact")}>
        {isBtnFocused ? (
          <div className={cn("mobile-input-wrap")}>
            <Input
              title=""
              regEx={validUserMobileNumber}
              placeholder=""
              inputValue={userMobileNumber}
              setInputValue={setUserMobileNumber}
              autoRegEx={autoRegExPhoneNumber}
              errorText=""
              classnames="user-mobile-input disabled"
              disabled
            />

            <div className={cn("user-auth-number-wrap")}>
              <input
                disabled={isAuthorized}
                value={userAuthNumber}
                onChange={(e) => handleAuthNumber(e)}
                placeholder="인증번호"
                maxLength={6}
                type="number"
              />
              {!isAuthorized && (
                <Timer setAuthResultMsg={setAuthResultMsg} isAuthorized={isAuthorized} setIsTimeOut={setIsTimeOut} />
              )}
            </div>
            {/* </span> */}
            <button
              // 인증되지않거나, 시간만료, 인증번호를 치지않은 경우 비활성화
              disabled={isAuthorized || isTimeOut || userAuthNumber.length === 0}
              type="button"
              className={cn("certification-check-button")}
              onClick={() => {
                setIsBtnFocused(true);
                axios
                  .get(`/reservation/validation/authKey/${userMobileNumber}/${userAuthNumber}`)
                  .then((res) => {
                    if (res.data) {
                      setIsAuthorized(true);
                      setAuthResultMsg("인증이 성공적으로 완료되었습니다.");
                      const msgDiv = document.getElementsByClassName("certification-result-msg");
                      msgDiv[0].classList.add("success");
                    } else if (res.data === false) {
                      setAuthResultMsg("인증번호가 올바르지 않습니다.");
                      const msgDiv = document.getElementsByClassName("certification-result-msg");
                      msgDiv[0].classList.add("error");
                    }
                  })
                  .catch((err) => {
                    console.log("인증번호에러", err);
                    setAuthResultMsg("인증도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
                  });
              }}
            >
              {translation("form.validateCode")}
            </button>
            <div className={cn("certification-result-msg")}>
              <span>{authResultMsg}</span>
            </div>
          </div>
        ) : (
          <div>
            <Input
              title=""
              regEx={validUserMobileNumber}
              placeholder="000-0000-0000"
              inputValue={userMobileNumber}
              setInputValue={setUserMobileNumber}
              autoRegEx={autoRegExPhoneNumber}
              errorText="번호가 올바르지 않습니다. 000-0000-0000 형식으로 작성해주세요."
              classnames="user-mobile-input"
              maxLength={13}
              type="tel"
            />
            <button
              type="button"
              className={cn("certification-button")}
              onClick={() => {
                setIsBtnFocused(true);
                axios
                  .get(`/reservation/sms/authKey/${userMobileNumber}`)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }}
              disabled={!validUserMobileNumber.test(userMobileNumber)}
            >
              {translation("form.requestCode")}
            </button>
          </div>
        )}
      </InputForm>
      <InputForm title={translation("form.count")}>
        <InputPeopleNumber peopleNumber={peopleNumber} setPeopleNumber={setPeopleNumber} />
      </InputForm>
      <InputForm title={translation("form.request")}>
        <div className={cn("text-area-wrap")}>
          <textarea
            cols={5}
            rows={4}
            maxLength={200}
            placeholder="요청사항을 적어주세요. (최대 200자)"
            className={cn("input-text-area")}
            value={requestedTerm}
            onChange={(e) => handleTextAreaInput(e)}
            wrap="on"
          />
          <span className={cn("text-count")}>{requestedTerm.length}/200</span>
        </div>
      </InputForm>
    </div>
  );
}

export default CustomerForm;
