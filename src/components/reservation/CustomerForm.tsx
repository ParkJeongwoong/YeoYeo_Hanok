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
  translation,
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
  const autoRegExPhoneNumber = (inputValue: string): string => {
    if (inputValue.length > 8)
      return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{4})(\d{1,4})$/, `$1-$2-$3`);
    if (inputValue.length > 3)
      return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{1,4})$/, `$1-$2`);
    return inputValue.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{1,4})(\d{4})$/, `$1-$2-$3`);
  };

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
        placeholder={`${translation("form.placeholderText.name")}`}
        inputValue={username}
        setInputValue={setUsername}
        errorText={`${translation("form.errorText.name")}`}
      />
      <Input
        title={translation("form.email")}
        regEx={validEmail}
        placeholder={`${translation("form.placeholderText.email")}`}
        inputValue={email}
        setInputValue={setEmail}
        errorText={`${translation("form.errorText.email")}`}
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
                placeholder={`${translation("form.placeholderText.verificationNumber")}`}
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
                      setAuthResultMsg(`${translation("form.successText.verification")}`);
                      const msgDiv = document.getElementsByClassName("certification-result-msg");
                      msgDiv[0].classList.add("success");
                    } else if (res.data === false) {
                      setAuthResultMsg(`${translation("form.errorText.verificationNumber")}`);
                      const msgDiv = document.getElementsByClassName("certification-result-msg");
                      msgDiv[0].classList.add("error");
                    }
                  })
                  .catch(() => {
                    setAuthResultMsg(`${translation("form.errorText.verification")}`);
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
              errorText={`${translation("form.errorText.mobileNumber")}`}
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
            placeholder={`${translation("form.placeholderText.request")}`}
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
