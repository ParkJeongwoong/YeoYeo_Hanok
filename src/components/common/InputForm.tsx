import cn from "classnames";
import { ReactElement } from "react";

interface InputFormProps {
  title: string;
  children: ReactElement;
}

function InputForm({ title, children }: InputFormProps) {
  return (
    <div className={cn("input-wrap")}>
      <span className={cn("input-title")}>{title}</span>
      {children}
    </div>
  );
}

export default InputForm;
