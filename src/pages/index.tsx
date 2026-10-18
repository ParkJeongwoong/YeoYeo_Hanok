import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Section from "@components/Intro/Section";
import cn from "classnames";
import Link from "next/link";

interface IntroProps {
  fadeState: string;
}

function Intro({ fadeState }: IntroProps) {
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  return (
    <main className={cn(`intro ${fadeState}`)}>
      <div ref={sectionWrapRef} className="section-wrap">
        <Section sectionType="intro-top" ref={introRef}>
          <div className="section-wrap">
            <div className={cn("section-inner")}>
              <div className="top">
              {/* <div className="top" data-aos="fade-down" data-aos-duration="1500"> */}
                <h1>
                  <span className="section-title1">{t("intro.intro.title1")}</span>{" "}
                  <span className="section-title2">{t("intro.intro.title2")}</span>
                </h1>
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
      <section className="stay-overview" aria-labelledby="stay-overview-title">
        <h2 id="stay-overview-title">{t("stayOverview.title")}</h2>
        <p>{t("stayOverview.description")}</p>
        <p>{t("address")}</p>
        <nav aria-label={String(t("stayOverview.navigation"))}>
          <Link href="/room/">{t("stayOverview.rooms")}</Link>
          <Link href="/service/">{t("stayOverview.services")}</Link>
          <Link href="/reservation/">{t("stayOverview.booking")}</Link>
        </nav>
      </section>
    </main>
  );
}

export default Intro;
