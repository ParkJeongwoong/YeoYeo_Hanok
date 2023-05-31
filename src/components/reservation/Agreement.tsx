import cn from "classnames";
import { ReactComponent as ChevronDown } from "@icons/ico_chevrondown.svg";
import { RefObject, useEffect, useRef, useState } from "react";

interface AgreementProps {
  setAgreementCompleted: (userMobileNumber: boolean) => void;
}

function Agreement({ setAgreementCompleted }: AgreementProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [selectedRef, setSelectedRef] = useState<RefObject<HTMLDivElement> | null>(null);
  const [necessaryCheckBox, setNecessaryCheckBox] = useState({
    numberOfPeople: false,
    smoking: false,
    reimbursement: false,
    cooking: false,
    refund: false,
    personalInfo: false,
    eventAlarm: false,
  });

  function handleAgreementOpen(ref: RefObject<HTMLDivElement>) {
    const refDiv = ref.current;

    if (selectedRef !== ref) {
      selectedRef?.current?.style.removeProperty("max-height");
    }

    if (refDiv && !refDiv?.style.maxHeight) {
      // eslint-disable-next-line no-param-reassign
      refDiv.style.maxHeight = `${refDiv.scrollHeight}px`;
      setSelectedRef(ref);
    } else {
      refDiv?.style.removeProperty("max-height");
    }
  }

  useEffect(() => {
    const { numberOfPeople, smoking, reimbursement, cooking, refund, personalInfo } = necessaryCheckBox;
    if (numberOfPeople && smoking && reimbursement && cooking && refund && personalInfo) {
      setAgreementCompleted(true);
    } else {
      setAgreementCompleted(false);
    }
  }, [necessaryCheckBox, setAgreementCompleted]);

  return (
    <div className={cn("agreement-form-wrap")}>
      <div className={cn("agreement-wrap")}>
        <div className={cn("agreement-section")}>
          <div className={cn("agreement-title")}>
            <button type="button">
              <span>▪️ 동의사항</span>
            </button>
          </div>
          <div className={cn("agreement-content-wrap show-content")}>
            <div className={cn("agreement-content")}>
              <div className={cn("agreement")}>
                <ul>
                  <li style={{ display: "flex", justifyContent: "space-between" }}>
                    인원 규정 : 예약 인원 초과 입실 및 방문자 출입은 불가합니다. 위반시 환불 없이 퇴실 조치{" "}
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check1"
                          checked={necessaryCheckBox.numberOfPeople}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, numberOfPeople: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check1">동의(필수)</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    금연 안내 : 숙소 내 모든 구역에서는 전자담배 포함 절대 금연. 위반 시 환불 없이 즉각 퇴실 조치 및
                    청소비 청구
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check2"
                          checked={necessaryCheckBox.smoking}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, smoking: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check2">동의(필수)</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    변상 안내 : 숙소 내 기물 파손 및 침구 오염 등이 발생할 경우 배상비용이 청구
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check3"
                          checked={necessaryCheckBox.reimbursement}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, reimbursement: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check3">동의(필수)</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    취사 규정 : 화기를 사용한 취사가 불가능한 숙소이며, 냄새가 나는 음식(고기, 생선, 해산물 등)의 섭취를
                    금지
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check4"
                          checked={necessaryCheckBox.cooking}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, cooking: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check4">동의(필수)</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    환불 규정 : 안내된 환불 규정에 동의합니다.
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check5"
                          checked={necessaryCheckBox.refund}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, refund: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check5">동의(필수)</label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("agreement-section")}>
          <div className={cn("agreement-title")}>
            <button type="button">
              <span>▪️ 개인정보 수집 및 이용 동의(필수)</span>
            </button>
            <div className={cn("agree-checkbox")}>
              <div className="check">
                <input
                  type="checkbox"
                  id="check6"
                  checked={necessaryCheckBox.personalInfo}
                  onChange={({ target: { checked } }) => {
                    setNecessaryCheckBox((state) => ({ ...state, personalInfo: checked }));
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="check6">동의(필수)</label>
              </div>
            </div>
          </div>
          <div className={cn("agreement-content-wrap")} />

          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef)}>
              <span>자세히보기</span>
              <ChevronDown />
            </button>
          </div>

          <div className={cn("agreement-content-wrap border-none")} ref={contentRef}>
            <div className={cn("agreement-content")}>
              <div className={cn("personal-info")}>
                <ul>
                  <li>1. 수집항목 : [필수] 이름, 연락처, 이메일주소, 인원정보</li>
                  <li>
                    2. 수집 및 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리,
                    분쟁조정 해결을 위한 기록보존, 스테이폴리오 멤버십 및 프로모션, 이벤트 안내
                  </li>
                  <li>
                    3. 보관기간 : 회원탈퇴 등 개인정보 이용목적 달성 시까지 보관. 단, 상법 및 ‘전자상거래 등에서의
                    소비자 보호에 관한 법률’ 등 관련 법령에 의하여 일정 기간 보관이 필요한 경우에는 해당 기간 동안
                    보관함
                  </li>
                  <li>
                    4. 동의 거부권 등에 대한 고지 : 정보주체는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 이
                    경우 상품 및 서비스 예약이 제한될 수 있습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("agreement-section")}>
          <div className={cn("agreement-title")}>
            <button type="button">
              <span>▪️ 쿠폰, 이벤트 등 혜택 알림 동의(선택)</span>
            </button>
            <div className={cn("agree-checkbox")}>
              <div className="check">
                <input
                  type="checkbox"
                  id="check7"
                  checked={necessaryCheckBox.eventAlarm}
                  onChange={({ target: { checked } }) => {
                    setNecessaryCheckBox((state) => ({ ...state, eventAlarm: checked }));
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="check7">동의(선택)</label>
              </div>
            </div>
          </div>
          <div className={cn("agreement-content-wrap")} />

          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef2)}>
              <span>자세히보기</span>
              <ChevronDown />
            </button>
          </div>
          <div className={cn("agreement-content-wrap border-none")} ref={contentRef2}>
            <div className={cn("agreement-content")}>
              <div className={cn("event-alarm")}>
                <ul>
                  <li>한옥스테이 여여의 혜택 및 프로모션, 이벤트 소식 구독</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("refund-policy-wrap")}>
        <span className={cn("title")}>▪️ 환불규정안내</span>
        <div className={cn("content-wrap")}>
          <div className={cn("content")}>
            <ul>
              <li>10일 전 : 결제 금액의 100% 환불</li>
              <li>9일 전 : 결제 금액의 90% 환불</li>
              <li>8일 전 : 결제 금액의 80% 환불</li>
              <li>7일 전 : 결제 금액의 70% 환불</li>
              <li>6일 전 : 결제 금액의 60% 환불</li>
              <li>5일 전 : 결제 금액의 50% 환불</li>
              <li>4일 전 : 결제 금액의 40% 환불</li>
              <li>3일 전 : 결제 금액의 30% 환불</li>
              <li>2일 전 : 결제 금액의 20% 환불</li>
              <li>1일 전 : 결제 금액의 10% 환불</li>
              <li>당일 : 환불 불가</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreement;
