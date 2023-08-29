import cn from "classnames";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import imageLoader from "src/utils/loader";

interface AgreementProps {
  setAgreementCompleted: (userMobileNumber: boolean) => void;
}

function Agreement({ setAgreementCompleted }: AgreementProps) {
  const ChevronDown = "/assets/icons/ico_chevrondown2.svg";
  
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [selectedRef, setSelectedRef] = useState<RefObject<HTMLDivElement> | null>(null);
  const [necessaryCheckBox, setNecessaryCheckBox] = useState({
    numberOfPeople: false,
    smoking: false,
    reimbursement: false,
    cooking: false,
    pet: false,
    refund: false,
    personalInfo: false,
    eventAlarm: false,
    allCheck: false,
  });
  const { t } = useTranslation("reservation");

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
    const { numberOfPeople, smoking, reimbursement, cooking, pet, refund, personalInfo } = necessaryCheckBox;
    if (numberOfPeople && smoking && reimbursement && cooking && pet && refund && personalInfo) {
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
              <span>▪️ {t("agreement.agreement")}</span>
            </button>
            <div className={cn("agree-checkbox")}>
              <div className="check">
                <input
                  type="checkbox"
                  id="checkall"
                  checked={
                    necessaryCheckBox.numberOfPeople &&
                    necessaryCheckBox.smoking &&
                    necessaryCheckBox.reimbursement &&
                    necessaryCheckBox.cooking &&
                    necessaryCheckBox.pet &&
                    necessaryCheckBox.refund &&
                    necessaryCheckBox.allCheck
                  }
                  onChange={({ target: { checked } }) => {
                    setNecessaryCheckBox((state) => ({
                      ...state,
                      numberOfPeople: checked,
                      smoking: checked,
                      reimbursement: checked,
                      cooking: checked,
                      pet: checked,
                      refund: checked,
                      allCheck: checked,
                    }));
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="checkall">{t("agreement.agreeAll")}</label>
              </div>
            </div>
          </div>
          <div className={cn("agreement-content-wrap show-content")}>
            <div className={cn("agreement-content")}>
              <div className={cn("agreement")}>
                <ul>
                  <li style={{ display: "flex", justifyContent: "space-between" }}>
                    {t("agreement.numberOfPeople")}{" "}
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
                        <label htmlFor="check1">{t("agreement.consent(required)")}</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    {t("agreement.nonSmokingInformation")}
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
                        <label htmlFor="check2">{t("agreement.consent(required)")}</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    {t("agreement.reimbursementInformation")}
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
                        <label htmlFor="check3">{t("agreement.consent(required)")}</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    {t("agreement.cookingRegulations")}
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
                        <label htmlFor="check4">{t("agreement.consent(required)")}</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    {t("agreement.petRegulations")}
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check5"
                          checked={necessaryCheckBox.pet}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, pet: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check4">{t("agreement.consent(required)")}</label>
                      </div>
                    </div>
                  </li>
                  <li>
                    {t("agreement.refundPolicy")}
                    <div className={cn("agree-checkbox")}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id="check6"
                          checked={necessaryCheckBox.refund}
                          onChange={({ target: { checked } }) => {
                            setNecessaryCheckBox((state) => ({ ...state, refund: checked }));
                          }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="check5">{t("agreement.consent(required)")}</label>
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
              <span>▪️ {t("agreement.personalInformation")}</span>
            </button>
            <div className={cn("agree-checkbox")}>
              <div className="check">
                <input
                  type="checkbox"
                  id="check7"
                  checked={necessaryCheckBox.personalInfo}
                  onChange={({ target: { checked } }) => {
                    setNecessaryCheckBox((state) => ({ ...state, personalInfo: checked }));
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="check7">{t("agreement.consent(required)")}</label>
              </div>
            </div>
          </div>
          <div className={cn("agreement-content-wrap")} />

          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef)}>
              <span>{t("agreement.seeDetails")}</span>
              <Image loader={imageLoader} src={ChevronDown} width={13.33} height={13.33} alt="약관 열기" />
            </button>
          </div>

          <div className={cn("agreement-content-wrap border-none")} ref={contentRef}>
            <div className={cn("agreement-content")}>
              <div className={cn("personal-info")}>
                <ul>
                  <li>{t("agreement.personalInfoContents.collectionItems")}</li>
                  <li>{t("agreement.personalInfoContents.purposeOfCollection")}</li>
                  <li>{t("agreement.personalInfoContents.retentionPeriod")}</li>
                  <li>{t("agreement.personalInfoContents.rightToRefuse")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("agreement-section")}>
          <div className={cn("agreement-title")}>
            <button type="button">
              <span>▪️ {t("agreement.alarmAgreement")}</span>
            </button>
            <div className={cn("agree-checkbox")}>
              <div className="check">
                <input
                  type="checkbox"
                  id="check8"
                  checked={necessaryCheckBox.eventAlarm}
                  onChange={({ target: { checked } }) => {
                    setNecessaryCheckBox((state) => ({ ...state, eventAlarm: checked }));
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="check8">{t("agreement.consent(optional)")}</label>
              </div>
            </div>
          </div>
          <div className={cn("agreement-content-wrap")} />

          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef2)}>
              <span>{t("agreement.seeDetails")}</span>
              <Image loader={imageLoader} src={ChevronDown} width={13.33} height={13.33} alt="약관 열기" />
            </button>
          </div>
          <div className={cn("agreement-content-wrap border-none")} ref={contentRef2}>
            <div className={cn("agreement-content")}>
              <div className={cn("event-alarm")}>
                <ul>
                  <li>{t("agreement.alarmAgreementContents.subscribe")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("refund-policy-wrap")}>
        <span className={cn("title")}>▪️ {t("agreement.refundPolicyInformation")}</span>
        <div className={cn("content-wrap")}>
          <div className={cn("content")}>
            <ul>
              <li>{t("agreement.refundPolicyInformationContents.before10days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before9days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before8days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before7days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before6days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before5days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before4days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before3days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before2days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.before1days")}</li>
              <li>{t("agreement.refundPolicyInformationContents.dDay")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreement;
