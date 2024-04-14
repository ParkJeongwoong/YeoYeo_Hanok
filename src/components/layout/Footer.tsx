import cn from "classnames";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LinkSelectModal from "@components/common/LinkSelectModal";
import imageLoader from "src/utils/loader";

function Footer() {
  const instagram = "/assets/icons/ico_instagram.png";
  const airbnb = "/assets/icons/ico_airbnb.png";
  const naver = "/assets/icons/ico_naver.png";

  const [isModal, setIsModal] = useState<boolean>(false);
  const { t } = useTranslation("common");

  return (
    <div className={cn("footer-wrap")}>
      <div className={cn("footer-wrap-link")}>
        <a type="button" href="https://www.instagram.com/yeoyeo9091/">
          <Image loader={imageLoader} src={instagram} width={25} height={25} alt="인스타그램 바로가기" />
        </a>
        <button type="button" onClick={()=>{setIsModal(true)}}>
          <Image loader={imageLoader} src={airbnb} width={25} height={25} alt="에어비앤비 바로가기" />
        </button>
        <a type="button" href="https://naver.me/GTS3ZojS">
          <Image loader={imageLoader} src={naver} width={25} height={25} alt="네이버 바로가기" />
        </a>
      </div>
      <h1>{t("yeoyeo")}</h1>
      <span>{t("registration-number")}</span>
      <span>{t("ecommerce-registration")}</span>
      <span>{t("address")}</span>
      <span>{t("owner")}</span>
      <span>{t("contact")}010-4695-9094</span>
      <span>pinokio775@daum.net | dvlprjw@gmail.com</span>
      {isModal && (
        <LinkSelectModal setIsModal={setIsModal} />
      )}
    </div>
  );
}

export default Footer;
