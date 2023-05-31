import cn from "classnames";
import { useTranslation } from "react-i18next";

import instagram from '@icons/ico_instagram.png'
import airbnb from '@icons/ico_airbnb.png'
import naver from '@icons/ico_naver.png'
import { useState } from "react";
import LinkSelectModal from "@components/common/LinkSelectModal";

function Footer() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { t } = useTranslation("common");

  return (
    <div className={cn("footer-wrap")}>
      <div className={cn("footer-wrap-link")}>
        <a type="button" href="https://www.instagram.com/yeoyeo9091/">
          <img src={instagram} alt="인스타그램 바로가기" />
        </a>
        <button type="button" onClick={()=>{setIsModal(true)}}>
          <img src={airbnb} alt="에어비앤비 바로가기" />
        </button>
        <a type="button" href="https://naver.me/GTS3ZojS">
          <img src={naver} alt="네이버 바로가기" />
        </a>
      </div>
      <span>{t("yeoyeo")}</span>
      <span>{t("registration-number")}</span>
      <span>{t("ecommerce-registration")}</span>
      <span>{t("address")}</span>
      <span>{t("owner")}</span>
      <span>010-8959-9091 | 010-2033-9091</span>
      <span>pinokio775@daum.net | dvlprjw@gmail.com</span>
      {isModal && (
        <LinkSelectModal setIsModal={setIsModal} />
      )}
    </div>
  );
}

export default Footer;
