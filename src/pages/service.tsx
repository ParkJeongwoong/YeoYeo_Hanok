import cn from "classnames";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import imageLoader from "src/utils/loader";

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
      <main className={cn(`service-wrap ${fadeState}`)}>
        {/* 배너 */}
        <div className={cn("banner-img-wrap")}>
          <h1 className={cn("service-main-title")}>{t("service.name")}</h1>
          <Image 
            loader={imageLoader} 
            src={ServiceBanner} 
            fill 
            sizes="100vw"
            unoptimized
            alt={t("imageAlt.serviceBanner")}
          />
        </div>

        <section className={cn("service-inner")}>
          {/* 커피와 빵 */}
          <div className={cn("service-detail")}>
            <div className={cn("service-detail-description")}>
              <h2 className={cn("service-title")}>{t("service.features.0")}</h2>
              <div className={cn("service-features")}>
                <span>{t("service.coffeeBread.0")}</span>
                <span className={cn("service-features-comment")}>{t("service.coffeeBread.1")}</span>
              </div>
            </div>
            <div className={cn("service-detail-pictures")}>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Bread} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.bread")}
                />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Table} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.table")}
                />
              </div>

            </div>
          </div>

          {/* 빔프로젝터 */}
          <div className={cn("service-detail service-detail2")}>
            <div className={cn("service-detail-description service-order")}>
              <h2 className={cn("service-title")}>{t("service.features.1")}</h2>
              <div className={cn("service-features")}>
                <span>{t("service.projector.0")}</span>
                <span className={cn("service-features-comment")}>{t("service.projector.1")}</span>
              </div>
            </div>
            <div className={cn("service-detail-pictures")}>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Projector1} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.projector1")}
                />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Projector2} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.projector2")}
                />
              </div>
            </div>

          </div>

          {/* 욕실 */}
          <div className={cn("service-detail")}>
            <div className={cn("service-detail-description")}>
              <h2 className={cn("service-title")}>{t("service.features.2")}</h2>
              <div className={cn("service-features")}>
                <span>{t("service.bath.0")}</span>
              </div>
            </div>
            <div className={cn("service-detail-pictures")}>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Bath1} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.bath1")}
                />
              </div>
              <div className={cn("service-detail-grid-item")}>

                <Image 
                  loader={imageLoader} 
                  src={Bath2} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.bath2")}
                />
              </div>
            </div>
          </div>

          {/* 생활한복 */}
          <div className={cn("service-detail service-detail2")}>
            <div className={cn("service-detail-description service-order")}>
              <h2 className={cn("service-title")}>{t("service.features.3")}</h2>
              <div className={cn("service-features")}>
                <span>{t("service.cloth.0")}</span>
              </div>
            </div>
            <div className={cn("service-detail-pictures")}>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Cloth1} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.cloth1")}
                />
              </div>
              <div className={cn("service-detail-grid-item")}>
                <Image 
                  loader={imageLoader} 
                  src={Cloth2} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  alt={t("imageAlt.cloth2")}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

export default Service;
