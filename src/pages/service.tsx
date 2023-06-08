import cn from "classnames";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import imageLoader from "src/utils/loader";
import SEO from "src/utils/seo";

// 서비스 배너
const ServiceBanner = "/assets/images/service/service_banner.jpg";

// Service 이미지들
const Bread = '/assets/images/service/Bread.jpg';
const Table = '/assets/images/service/Table.jpg';
const Projector1 = '/assets/images/service/Projector1.jpg';
const Projector2 = '/assets/images/service/Projector2.jpg';
const Bath1 = '/assets/images/service/Bath1.jpg';
const Bath2 = '/assets/images/service/Bath2.jpg';
const Cloth1 = "/assets/images/service/Cloth1.jpg";
const Cloth2 = "/assets/images/service/Cloth2.jpg";

interface ServiceProps {
  fadeState: string;
}

function Service({ fadeState }: ServiceProps) {
  const { t } = useTranslation("common");

  return (
    <>
      <SEO
        title="서비스"
        description="한옥스테이 여여에서 제공하는 서비스입니다."
        siteTitle="한옥스테이 여여"
      />
      <div className={cn(`service-wrap ${fadeState}`)}>
        {/* 배너 */}
        <div className={cn("banner-img-wrap")}>
          <h2 className={cn("service-main-title")}>{t("service.name")}</h2>
          <Image loader={imageLoader} src={ServiceBanner} fill alt="services" />
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
                <Image loader={imageLoader} src={Bread} fill alt="야외 커피, 빵 이미지" />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image loader={imageLoader} src={Table} fill alt="실내 커피, 빵 이미지" />
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
                <Image loader={imageLoader} src={Projector1} fill alt="빔프로젝터 1" />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image loader={imageLoader} src={Projector2} fill alt="빔프로젝터 2 " />
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
                <Image loader={imageLoader} src={Bath1} fill alt="욕실 이미지 1" />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image loader={imageLoader} src={Bath2} fill alt="욕실 이미지 2 " />
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
              <div className={cn("service-detail-grid-item")} style={{widows: '100%'}}>
                <Image loader={imageLoader} src={Cloth1} fill alt="생활한복 이미지 1" />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image loader={imageLoader} src={Cloth2} fill alt="생활한복 이미지 2 " />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Service;
