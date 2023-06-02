import { ReactElement } from "react";
import Image from "next/image";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface SNBProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type LinkListItemType = {
  id: string;
  path: string;
};

function SNB({ open, setOpen }: SNBProps): ReactElement {
  const IcoCross = "/assets/icons/ico_cross.svg";
  const { t } = useTranslation("common");

  // 확장성 고려하여 우선 객체 리스트로 지정
  const LinkList: LinkListItemType[] = [
    {
      id: "main",
      path: "/",
    },
    // {
    //   id: "intro",
    // },
    {
      id: "service",
      path: "/service",
    },
    {
      id: "room",
      path: "/room",
    },
    {
      id: "reservation",
      path: "/reservation",
    },
    {
      id: "reservation/check",
      path: "/reservation/check",
    },
  ];

  return (
    <div className={cn("snb-wrap", open && "open")}>
      <div className={cn("snb-inner")}>
        <div className={cn("btn-wrap")}>
          <button type="button" aria-label="menu close" onClick={() => setOpen(false)}>
            <Image src={IcoCross} width={40} height={40} alt="햄버거 아이콘" />
          </button>
        </div>
        <ul className={cn("link-list")}>
          {LinkList.map((el) => (
            <li key={el.id}>
              <Link href={`${el.path}`} onClick={() => setOpen(false)}>
                {t(`router.${el.id}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SNB;
