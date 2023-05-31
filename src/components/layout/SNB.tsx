import { ReactElement } from "react";
import { ReactComponent as IcoCross } from "@icons/ico_cross.svg";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface SNBProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type LinkListItemType = {
  id: string;
};

function SNB({ open, setOpen }: SNBProps): ReactElement {
  const { t } = useTranslation("common");

  // 확장성 고려하여 우선 객체 리스트로 지정
  const LinkList: LinkListItemType[] = [
    {
      id: "main",
    },
    // {
    //   id: "intro",
    // },
    {
      id: "service",
    },
    {
      id: "room",
    },
    {
      id: "reservation",
    },
    {
      id: "reservation/check",
    },
  ];

  return (
    <div className={cn("snb-wrap", open && "open")}>
      <div className={cn("snb-inner")}>
        <div className={cn("btn-wrap")}>
          <button type="button" aria-label="menu close" onClick={() => setOpen(false)}>
            <IcoCross />
          </button>
        </div>
        <ul className={cn("link-list")}>
          {LinkList.map((el) => (
            <li key={el.id}>
              <Link to={`/${el.id}`} onClick={() => setOpen(false)}>
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
