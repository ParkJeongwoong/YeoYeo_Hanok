import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import AirbnbRoomLinks from "@components/common/AirbnbRoomLinks";
import imageLoader from "src/utils/loader";
import SEO from "src/utils/seo";

interface ReservationProps {
  fadeState: string;
}

function Reservation({ fadeState }: ReservationProps) {
  const { t } = useTranslation("reservation");

  return (
    <>
      <SEO title={t("externalBooking.title")} description={t("externalBooking.description")} siteTitle="한옥스테이 여여" />
      <main className={cn("reservation-wrap", fadeState)}>
        <div className="reservation-inner">
          <h2 className="title">{t("externalBooking.title")}</h2>
          <section className="external-booking">
            <Image className="airbnb-mark" loader={imageLoader} src="/assets/icons/ico_airbnb.png" unoptimized width={56} height={56} alt="Airbnb" />
            <p>{t("externalBooking.description")}</p>
            <AirbnbRoomLinks />
            <div className="existing-booking">
              <p>{t("externalBooking.existingBooking")}</p>
              <Link href="/reservation/check">{t("externalBooking.checkBooking")}</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Reservation;
