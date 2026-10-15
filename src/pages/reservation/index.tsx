import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import AirbnbRoomLinks from "@components/common/AirbnbRoomLinks";
import imageLoader from "src/utils/loader";

interface ReservationProps {
  fadeState: string;
}

function Reservation({ fadeState }: ReservationProps) {
  const { t } = useTranslation("reservation");

  return (
      <main className={cn("reservation-wrap", fadeState)}>
        <div className="reservation-inner">
          <h1 className="title">{t("externalBooking.title")}</h1>
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
  );
}

export default Reservation;
