import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface TimerProps {
  setAuthResultMsg: (authResultMsg: string) => void;
  isAuthorized: boolean;
  setIsTimeOut: (isTimeOut: boolean) => void;
}
function Timer({ setAuthResultMsg, isAuthorized, setIsTimeOut }: TimerProps) {
  const [time, setTime] = useState<any>(180);
  const deadline = dayjs().add(181, "second");
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const getTime = (dueDate: any) => {
    const timeDiff = dueDate.diff(dayjs());
    if (timeDiff >= 0) {
      setTime(() => Math.floor(timeDiff / 1000));
      setMinutes(() => Math.floor((timeDiff / 1000 / 60) % 60));
      setSeconds(() => Math.floor((timeDiff / 1000) % 60));
    }
  };

  useEffect(() => {
    if (!isAuthorized && time === 0) {
      setIsTimeOut(true);
      setAuthResultMsg("인증시간이 만료되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (time >= 0) {
      const interval = setInterval(() => getTime(deadline), 1000);
      return () => clearInterval(interval);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span style={{}}>
      {`0${minutes}`} : {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
}

export default Timer;
