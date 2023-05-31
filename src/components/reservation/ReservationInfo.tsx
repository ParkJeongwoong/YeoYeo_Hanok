import cn from "classnames";

interface ReservationInfoProps {
  left: string | null;
  middle?: string | null;
  right: string | number | null;
  isLast?: boolean;
}
function ReservationInfo({ left, middle, right, isLast }: ReservationInfoProps) {
  return (
    <div className={cn("reservation-info", middle && "has-middle")}>
      <span>{left}</span>
      {middle && <span>{middle}</span>}
      <span style={{ fontWeight: isLast ? 700 : 600, fontSize: isLast ? "16px" : "14px" }}>{right}</span>
    </div>
  );
}

export default ReservationInfo;
