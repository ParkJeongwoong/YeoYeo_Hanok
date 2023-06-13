import cn from "classnames";
import React from "react";

interface InputPeopleNumberProps {
  peopleNumber: number;
  setPeopleNumber: React.Dispatch<React.SetStateAction<number>>;
}

function InputPeopleNumber({ peopleNumber, setPeopleNumber }: InputPeopleNumberProps) {
  const handleButton = (action: string) => {
    if (action === "increase") {
      if (peopleNumber + 1 < 4) {
        setPeopleNumber((prev) => prev + 1);
      }
    } else if (action === "decrease") {
      setPeopleNumber((prev) => prev - 1);
    }
  };

  return (
    <div className={cn("people-number-input-wrap")}>
      {/* TODO: Change Button contents to svg asset */}
      <button
        type="button"
        className={cn("calc-button")}
        disabled={peopleNumber < 2}
        onClick={() => handleButton("decrease")}
      >
        -
      </button>
      <input type="text" value={peopleNumber} readOnly />
      <button
        type="button"
        className={cn("calc-button")}
        disabled={peopleNumber > 2}
        onClick={() => handleButton("increase")}
      >
        +
      </button>
    </div>
  );
}

export default InputPeopleNumber;
