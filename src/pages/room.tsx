import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay, type Swiper as swiperRef } from "swiper";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import imageLoader from "src/utils/loader";
import SEO from "src/utils/seo";

// 배너
const RoomBanner = "/assets/images/room/room_banner1.jpg";

// 배너와 공간도, 스와이퍼 이미지들
const RoomAIntro = "/assets/images/room/roomA_intro.jpg";
const RoomBIntro = "/assets/images/room/roomB_intro.jpg";
const FloorPlanA = "/assets/images/room/floor_plan_A.png";
const FloorPlanB = "/assets/images/room/floor_plan_B.png";

// Room 이미지들
const OUTSIDE_1 = '/assets/images/room/outside1.jpg';
const OUTSIDE_2 = '/assets/images/room/outside2.jpg';
const OUTSIDE_3 = '/assets/images/room/outside3.jpg';
const OUTSIDE_4 = '/assets/images/room/outside4.jpg';
const OUTSIDE_5 = '/assets/images/room/outside5.jpg';
const OUTSIDE_6 = '/assets/images/room/outside6.jpg';

const ROOM_A_LIVING_1 = "/assets/images/room/roomA_living1.jpg";
const ROOM_A_LIVING_2 = "/assets/images/room/roomA_living2.jpg";
const ROOM_A_LIVING_3 = "/assets/images/room/roomA_living3.jpg";
const ROOM_A_LIVING_4 = "/assets/images/room/roomA_living4.jpg";
const ROOM_A_BED_1 = "/assets/images/room/roomA_bed1.jpg";
const ROOM_A_BED_2 = "/assets/images/room/roomA_bed2.jpg";
const ROOM_A_BED_3 = "/assets/images/room/roomA_bed3.jpg";
const ROOM_A_BED_4 = "/assets/images/room/roomA_bed4.jpg";
const ROOM_A_KITCHEN_1 = "/assets/images/room/roomA_kitchen1.jpg";
const ROOM_A_KITCHEN_2 = "/assets/images/room/roomA_kitchen2.jpg";
const ROOM_A_BATH_1 = "/assets/images/room/roomA_bath1.jpg";
const ROOM_A_BATH_2 = "/assets/images/room/roomA_bath2.jpg";
const ROOM_A_BATH_3 = "/assets/images/room/roomA_bath3.jpg";
const ROOM_A_YARD_1 = '/assets/images/room/roomA_yard1.jpg'
const ROOM_A_YARD_2 = '/assets/images/room/roomA_yard2.jpg'

const ROOM_B_LIVING_1 = "/assets/images/room/roomB_living1.jpg";
const ROOM_B_LIVING_2 = "/assets/images/room/roomB_living2.jpg";
const ROOM_B_LIVING_3 = "/assets/images/room/roomB_living3.jpg";
const ROOM_B_LIVING_4 = "/assets/images/room/roomB_living4.jpg";
const ROOM_B_LIVING_5 = "/assets/images/room/roomB_living5.jpg";
const ROOM_B_LIVING_6 = "/assets/images/room/roomB_living6.jpg";
const ROOM_B_BED_1 = "/assets/images/room/roomB_bed1.jpg";
const ROOM_B_BED_2 = "/assets/images/room/roomB_bed2.jpg";
const ROOM_B_BED_3 = "/assets/images/room/roomB_bed3.jpg";
const ROOM_B_KITCHEN_1 = '/assets/images/room/roomB_kitchen1.jpg';
const ROOM_B_KITCHEN_2 = '/assets/images/room/roomB_kitchen2.jpg';
const ROOM_B_KITCHEN_3 = '/assets/images/room/roomB_kitchen3.jpg';
const ROOM_B_KITCHEN_4 = '/assets/images/room/roomB_kitchen4.jpg';
const ROOM_B_BATH_1 = "/assets/images/room/roomB_bath1.jpg";
const ROOM_B_BATH_2 = "/assets/images/room/roomB_bath2.jpg";
const ROOM_B_BATH_3 = "/assets/images/room/roomB_bath3.jpg";
const ROOM_B_YARD_1 = '/assets/images/room/roomB_yard1.jpg';
const ROOM_B_YARD_2 = '/assets/images/room/roomB_yard2.jpg';

// import { debounce } from "lodash";

interface RoomProps {
  fadeState: string;
}

function Room({ fadeState }: RoomProps) {
  const [ImgList, setImgList] = useState([OUTSIDE_1]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  
  const introRef = useRef<HTMLDivElement>(null);
  const roomSelectionRef = useRef<HTMLDivElement>(null);
  const roomARef = useRef<HTMLDivElement>(null);
  const roomBRef = useRef<HTMLDivElement>(null);

  const spaceA1 = useRef<HTMLDivElement>(null);
  const spaceA2 = useRef<HTMLDivElement>(null);
  const spaceA3 = useRef<HTMLDivElement>(null);
  const spaceA4 = useRef<HTMLDivElement>(null);
  const spaceA5 = useRef<HTMLDivElement>(null);
  const selectA0 = useRef<HTMLDivElement>(null);
  const selectA1 = useRef<HTMLDivElement>(null);
  const selectA2 = useRef<HTMLDivElement>(null);
  const selectA3 = useRef<HTMLDivElement>(null);
  const selectA4 = useRef<HTMLDivElement>(null);
  const selectA5 = useRef<HTMLDivElement>(null);
  
  const swiperWrap1 = useRef<HTMLDivElement>(null);
  const swiperWrap2 = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  const swiperRef1 = useRef<swiperRef>();
  const swiperRef2 = useRef<swiperRef>();

  const selectSpace = (idx: number)=>{
    if (selectedRoom==="A" && swiperRef1.current) {
      swiperRef1.current.init();
      swiperRef1.current.slideTo(0, 0);
    } else if (selectedRoom==="B" && swiperRef2.current) {
      swiperRef2.current.init();
      swiperRef2.current.slideTo(0, 0);
    }
    setSelectedSpace(idx);
    setIsChanged(true);
  }

  const selectRoom = (room: string) => {
    swiperWrap1.current?.style.setProperty("opacity", '0');
    swiperWrap2.current?.style.setProperty("opacity", '0');
    const roomA = document.querySelector(".roomA-info");
    const roomB = document.querySelector(".roomB-info");
    if (room==="A") {
      roomA?.setAttribute("style", "display:block;");
      roomB?.setAttribute("style", "display:none;");
      roomARef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      roomA?.setAttribute("style", "display:none;");
      roomB?.setAttribute("style", "display:block;");
      roomBRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedRoom(room);
    setSelectedSpace(0);
    setIsChanged(true);
  }

  useEffect(()=>{
    if (isChanged && selectedRoom && ImgList) {
      swiperWrap1.current?.style.setProperty("opacity", '0');
      swiperWrap2.current?.style.setProperty("opacity", '0');
      setTimeout(()=>{
        switch (selectedRoom+selectedSpace) {
          case "A0":
            setImgList([OUTSIDE_1, OUTSIDE_2, OUTSIDE_3, OUTSIDE_4, OUTSIDE_5, OUTSIDE_6,
              ROOM_A_LIVING_1, ROOM_A_LIVING_2, ROOM_A_LIVING_3, ROOM_A_LIVING_4,
              ROOM_A_BED_1, ROOM_A_BED_2, ROOM_A_BED_3, ROOM_A_BED_4,
              ROOM_A_KITCHEN_1, ROOM_A_KITCHEN_2,
              ROOM_A_BATH_1, ROOM_A_BATH_2, ROOM_A_BATH_3,
              ROOM_A_YARD_1, ROOM_A_YARD_2])
            break;
          case "A1":
            setImgList([ROOM_A_LIVING_1, ROOM_A_LIVING_2, ROOM_A_LIVING_3, ROOM_A_LIVING_4])
            break;
          case "A2":
            setImgList([ROOM_A_BED_1, ROOM_A_BED_2, ROOM_A_BED_3, ROOM_A_BED_4])
            break;
          case "A3":
            setImgList([ROOM_A_KITCHEN_1, ROOM_A_KITCHEN_2])
            break;
          case "A4":
            setImgList([ROOM_A_BATH_1, ROOM_A_BATH_2, ROOM_A_BATH_3])
            break;
          case "A5":
            setImgList([ROOM_A_YARD_1, ROOM_A_YARD_2])
            break;
          case "B0":
            setImgList([OUTSIDE_1, OUTSIDE_2, OUTSIDE_3, OUTSIDE_4, OUTSIDE_5, OUTSIDE_6,
              ROOM_B_LIVING_1, ROOM_B_LIVING_2, ROOM_B_LIVING_3, ROOM_B_LIVING_4,ROOM_B_LIVING_5, ROOM_B_LIVING_6,
              ROOM_B_BED_1, ROOM_B_BED_2, ROOM_B_BED_3,
              ROOM_B_KITCHEN_1, ROOM_B_KITCHEN_2, ROOM_B_KITCHEN_3, ROOM_B_KITCHEN_4,
              ROOM_B_BATH_1, ROOM_B_BATH_2, ROOM_B_BATH_3,
              ROOM_B_YARD_1, ROOM_B_YARD_2])
            break;
          case "B1":
            setImgList([ROOM_B_LIVING_1, ROOM_B_LIVING_2, ROOM_B_LIVING_3, ROOM_B_LIVING_4, ROOM_B_LIVING_5, ROOM_B_LIVING_6])
            break;
          case "B2":
            setImgList([ROOM_B_BED_1, ROOM_B_BED_2, ROOM_B_BED_3])
            break;
          case "B3":
            setImgList([ROOM_B_KITCHEN_1, ROOM_B_KITCHEN_2, ROOM_B_KITCHEN_3, ROOM_B_KITCHEN_4])
            break;
          case "B4":
            setImgList([ROOM_B_BATH_1, ROOM_B_BATH_2, ROOM_B_BATH_3])
            break;
          case "B5":
            setImgList([ROOM_B_YARD_1, ROOM_B_YARD_2])
            break;
          default:
            console.log("올바르지 않은 접근입니다.")
            break;
        }
        setTimeout(()=>{
          swiperWrap1.current?.style.setProperty("opacity", "1");
          swiperWrap2.current?.style.setProperty("opacity", "1");
        }, 50)
      }, 500)
      setIsChanged(false);
    }
  }, [selectedRoom, selectedSpace, ImgList, isChanged])

  return (
    <>
      <SEO
        title="객실"
        description='한옥스테이 여여의 객실, "여유"와 "여행"을 소개합니다.'
        siteTitle="한옥스테이 여여"
      />
      <div className={cn(`room-wrap ${fadeState}`)}>
        {/* 배너 */}
        <div
          ref={introRef} 
          className={cn("banner-img-wrap")}
          // onTouchStart={(e) => handleTouchStart(e)}
        >
          <h2 className={cn("room-main-title")}>{t("floorPlan.name")}</h2>
          <Image loader={imageLoader} src={RoomBanner} fill alt="yeoyeo-outside" />
        </div>

        <section className={cn("room-inner")}>
          {/* 객실 선택 */}
          <div ref={roomSelectionRef} className={cn("room-intro")}>
            <div
              role="presentation" 
              onClick={() => selectRoom("A")}>
              <span>{t("floorPlan.roomA.name")}</span>
              <Image loader={imageLoader} src={RoomAIntro} fill alt="roomA-intro" />
            </div>
            <div
              role="presentation" 
              onClick={() => selectRoom("B")}>
              <span>{t("floorPlan.roomB.name")}</span>
              <Image loader={imageLoader} src={RoomBIntro} fill alt="roomB-intro" />
            </div>
          </div>

          {/* A호실 */}
          <div ref={roomARef} className={cn("roomA-info")}>
            {/* 공간도 */}
            <div className={cn("floor-plan")}>
              <div>
                <div ref={spaceA1} className={cn("floor-plan-A-living", selectedSpace===1 && "selected")}
                  role="presentation" onClick={()=>selectSpace(1)} />
                <div ref={spaceA2} className={cn("floor-plan-A-bed", selectedSpace===2 && "selected")}
                  role="presentation" onClick={()=>selectSpace(2)} />
                <div ref={spaceA3} className={cn("floor-plan-A-kitchen", selectedSpace===3 && "selected")}
                  role="presentation" onClick={()=>selectSpace(3)} />
                <div ref={spaceA4} className={cn("floor-plan-A-bath", selectedSpace===4 && "selected")}
                  role="presentation" onClick={()=>selectSpace(4)} />
                <div ref={spaceA5} className={cn("floor-plan-A-yard", selectedSpace===5 && "selected")}
                  role="presentation" onClick={()=>selectSpace(5)} />
                <Image loader={imageLoader} src={FloorPlanA} width={647.111} height={316.556} role="presentation" onClick={()=>selectSpace(0)} alt="floor-plan" />
              </div>
            </div>

            {/* 공간 선택 */}
            <div className={cn("space-selection")}>
              <div ref={selectA0} className={cn(selectedSpace===0 && "selected")}
              role="presentation" onClick={()=>selectSpace(0)}>{t("floorPlan.roomA.titles.0")}</div>
              <div ref={selectA1} className={cn(selectedSpace===1 && "selected")}
              role="presentation" onClick={()=>selectSpace(1)}>{t("floorPlan.roomA.titles.1")}</div>
              <div ref={selectA2} className={cn(selectedSpace===2 && "selected")}
              role="presentation" onClick={()=>selectSpace(2)}>{t("floorPlan.roomA.titles.2")}</div>
              <div ref={selectA3} className={cn(selectedSpace===3 && "selected")}
              role="presentation" onClick={()=>selectSpace(3)}>{t("floorPlan.roomA.titles.3")}</div>
              <div ref={selectA4} className={cn(selectedSpace===4 && "selected")}
              role="presentation" onClick={()=>selectSpace(4)}>{t("floorPlan.roomA.titles.4")}</div>
              <div ref={selectA5} className={cn(selectedSpace===5 && "selected")}
              role="presentation" onClick={()=>selectSpace(5)}>{t("floorPlan.roomA.titles.5")}</div>
            </div>

            {/* swiper */}
            <div className={cn("swiper-wrap")} ref={swiperWrap1}>
              <Swiper
                navigation
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                slidesPerView={1}
                rewind
                autoplay={{delay:10000, disableOnInteraction: false}}
                onInit={(swiper: SwiperCore) => {
                  swiperRef1.current = swiper;
                }}
              >
                {ImgList.map((el) => (
                  <SwiperSlide>
                    <div className="img-wrap">
                      <Image loader={imageLoader} src={el} fill alt="여유 방 사진" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <p className={cn("space-description", selectedSpace===0 && "selected")}>{t("floorPlan.serviceDescription")}</p>
            <p className={cn("space-description", selectedSpace===1 && "selected")}>{t("floorPlan.roomA.descriptions.0")}</p>
            <p className={cn("space-description", selectedSpace===2 && "selected")}>{t("floorPlan.roomA.descriptions.1")}</p>
            <p className={cn("space-description", selectedSpace===3 && "selected")}>{t("floorPlan.roomA.descriptions.2")}</p>
            <p className={cn("space-description", selectedSpace===4 && "selected")}>{t("floorPlan.roomA.descriptions.3")}</p>
            <p className={cn("space-description", selectedSpace===5 && "selected")}>{t("floorPlan.roomA.descriptions.4")}</p>
          </div>        

          {/* B호실 */}
          <div ref={roomBRef} className={cn("roomB-info")}>
            {/* 공간도 */}
            <div className={cn("floor-plan")}>
              <div>
                <div ref={spaceA1} className={cn("floor-plan-B-living", selectedSpace===1 && "selected")}
                  role="presentation" onClick={()=>selectSpace(1)} />
                <div ref={spaceA2} className={cn("floor-plan-B-bed", selectedSpace===2 && "selected")}
                  role="presentation" onClick={()=>selectSpace(2)} />
                <div ref={spaceA3} className={cn("floor-plan-B-kitchen", selectedSpace===3 && "selected")}
                  role="presentation" onClick={()=>selectSpace(3)} />
                <div ref={spaceA4} className={cn("floor-plan-B-bath", selectedSpace===4 && "selected")}
                  role="presentation" onClick={()=>selectSpace(4)} />
                <div ref={spaceA5} className={cn("floor-plan-B-yard", selectedSpace===5 && "selected")}
                  role="presentation" onClick={()=>selectSpace(5)} />
                <Image loader={imageLoader} src={FloorPlanB} width={540} height={392} role="presentation" onClick={()=>selectSpace(0)} alt="floor-plan" />
              </div>
            </div>

            {/* 공간 선택 */}
            <div className={cn("space-selection")}>
              <div ref={selectA0} className={cn(selectedSpace===0 && "selected")}
              role="presentation" onClick={()=>selectSpace(0)}>{t("floorPlan.roomB.titles.0")}</div>
              <div ref={selectA1} className={cn(selectedSpace===1 && "selected")}
              role="presentation" onClick={()=>selectSpace(1)}>{t("floorPlan.roomB.titles.1")}</div>
              <div ref={selectA2} className={cn(selectedSpace===2 && "selected")}
              role="presentation" onClick={()=>selectSpace(2)}>{t("floorPlan.roomB.titles.2")}</div>
              <div ref={selectA3} className={cn(selectedSpace===3 && "selected")}
              role="presentation" onClick={()=>selectSpace(3)}>{t("floorPlan.roomB.titles.3")}</div>
              <div ref={selectA4} className={cn(selectedSpace===4 && "selected")}
              role="presentation" onClick={()=>selectSpace(4)}>{t("floorPlan.roomB.titles.4")}</div>
              <div ref={selectA5} className={cn(selectedSpace===5 && "selected")}
              role="presentation" onClick={()=>selectSpace(5)}>{t("floorPlan.roomB.titles.5")}</div>
            </div>

            {/* swiper */}
            <div className={cn("swiper-wrap")} ref={swiperWrap2}>
              <Swiper
                navigation
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                slidesPerView={1}
                rewind
                autoplay={{delay:10000, disableOnInteraction: false}}
                onInit={(swiper: SwiperCore) => {
                  swiperRef2.current = swiper;
                }}
              >
                {ImgList.map((el) => (
                  <SwiperSlide>
                    <div className="img-wrap">
                      <Image loader={imageLoader} src={el} fill alt="여행 방 사진" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <p className={cn("space-description", selectedSpace===0 && "selected")}>{t("floorPlan.serviceDescription")}</p>
            <p className={cn("space-description", selectedSpace===1 && "selected")}>{t("floorPlan.roomB.descriptions.0")}</p>
            <p className={cn("space-description", selectedSpace===2 && "selected")}>{t("floorPlan.roomB.descriptions.1")}</p>
            <p className={cn("space-description", selectedSpace===3 && "selected")}>{t("floorPlan.roomB.descriptions.2")}</p>
            <p className={cn("space-description", selectedSpace===4 && "selected")}>{t("floorPlan.roomB.descriptions.3")}</p>
            <p className={cn("space-description", selectedSpace===5 && "selected")}>{t("floorPlan.roomB.descriptions.4")}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Room;
