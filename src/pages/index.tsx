import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Section from "@components/Intro/Section";
import cn from "classnames";

function Intro({ fadeState }: any) {
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    const {referrer} = document;
    console.log(referrer);
  }, []);

  return (
    <div className={cn(`intro ${fadeState}`)}>
      <div ref={sectionWrapRef} className="section-wrap">
        <Section sectionType="intro-top" ref={introRef}>
          <div className="section-wrap">
            <div className={cn("section-inner")}>
              <div className="top">
              {/* <div className="top" data-aos="fade-down" data-aos-duration="1500"> */}
                <h1 className={cn("section-title1")}>{t("intro.intro.title1")}</h1>
                <h1 className={cn("section-title2")}>{t("intro.intro.title2")}</h1>
              </div>
              <div className="body">
              {/* <div className="body" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="1000"> */}
                <div className="poem">
                  <p>{t("intro.intro.poem.0")}</p>
                  <br />
                  <p>{t("intro.intro.poem.1")}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Intro;
