import cn from "classnames";
import { useTranslation } from "react-i18next";

// 서비스 배너
import ServiceBanner from "@images/service/service_banner.jpg";
// import ServiceBanner from "@images/service/ServiceBanner.jpg";

// Service 이미지들
import Bread from '@images/service/Bread.jpg';
import Table from '@images/service/Table.jpg';
import Projector1 from '@images/service/Projector1.jpg';
import Projector2 from '@images/service/Projector2.jpg';
import Bath1 from '@images/service/Bath1.jpg';
import Bath2 from '@images/service/Bath2.jpg';
import Cloth1 from "@images/service/Cloth1.jpg";
import Cloth2 from "@images/service/Cloth2.jpg";

function Service() {
  const { t } = useTranslation("common");

  return (
    <div className={cn("service-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <h2 className={cn("service-main-title")}>{t("service.name")}</h2>
        <img src={ServiceBanner} alt="services" />
      </div>

      <section className={cn("service-inner")}>
        {/* 커피와 빵 */}
        <div className={cn("service-detail")}>
          <div className={cn("service-detail-description")}>
            <h3 className={cn("service-title")}>{t("service.features.0")}</h3>
            <div className={cn("service-features")}>
              <span>{t("service.coffeeBread.0")}</span>
              <span className={cn("service-features-comment")}>{t("service.coffeeBread.1")}</span>
            </div>
          </div>
          <div className={cn("service-detail-pictures")}>
            <div className={cn("service-detail-grid-item")}>
              <img src={Bread} alt="야외 커피, 빵 이미지" />
            </div>
            <div className={cn("service-detail-grid-item")}>
              <img src={Table} alt="실내 커피, 빵 이미지" />
            </div>
          </div>
        </div>

        {/* 빔프로젝터 */}
        <div className={cn("service-detail service-detail2")}>
          <div className={cn("service-detail-description service-order")}>
            <h3 className={cn("service-title")}>{t("service.features.1")}</h3>
            <div className={cn("service-features")}>
              <span>{t("service.projector.0")}</span>
              <span className={cn("service-features-comment")}>{t("service.projector.1")}</span>
            </div>
          </div>
          <div className={cn("service-detail-pictures")}>
            <div className={cn("service-detail-grid-item")}>
              <img src={Projector1} alt="빔프로젝터 1" />
            </div>
            <div className={cn("service-detail-grid-item")}>
              <img src={Projector2} alt="빔프로젝터 2 " />
            </div>
          </div>
        </div>

        {/* 욕실 */}
        <div className={cn("service-detail")}>
          <div className={cn("service-detail-description")}>
            <h3 className={cn("service-title")}>{t("service.features.2")}</h3>
            <div className={cn("service-features")}>
              <span>{t("service.bath.0")}</span>
            </div>
          </div>
          <div className={cn("service-detail-pictures")}>
            <div className={cn("service-detail-grid-item")}>
              <img src={Bath1} alt="욕실 이미지 1" />
            </div>
            <div className={cn("service-detail-grid-item")}>
              <img src={Bath2} alt="욕실 이미지 2 " />
            </div>
          </div>
        </div>

        {/* 생활한복 */}
        <div className={cn("service-detail service-detail2")}>
          <div className={cn("service-detail-description service-order")}>
            <h3 className={cn("service-title")}>{t("service.features.3")}</h3>
            <div className={cn("service-features")}>
              <span>{t("service.cloth.0")}</span>
            </div>
          </div>
          <div className={cn("service-detail-pictures")}>
            <div className={cn("service-detail-grid-item")}>
              <img src={Cloth1} alt="생활한복 이미지 1" />
            </div>
            <div className={cn("service-detail-grid-item")}>
              <img src={Cloth2} alt="생활한복 이미지 2 " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
