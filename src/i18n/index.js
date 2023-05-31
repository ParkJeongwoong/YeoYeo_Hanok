import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// # if you'd like to detect user language and load translation
// npm install i18next-http-backend i18next-browser-languagedetector --save
// import detector from "i18next-browser-languagedetector";
// import Backend from "i18next-http-backend";

import en from "./locales/en";
import ko from "./locales/ko";

i18n
  // .use(Backend)  //백엔드에서 리소스 가져올시
  // .use(detector) //사용자 언어 감지 : https://github.com/i18next/i18next-browser-languageDetect
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ko,
      en,
    },
    lng: "ko",
    fallbackLng: "en",
    // ns:['pageKo','pageEn','pageCn'],    //ns는 namespace로 label, button, menu 등 구분해서 관리할 경우 필요
  });

export default i18n;
