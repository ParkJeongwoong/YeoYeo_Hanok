import { useState, ChangeEvent, InputHTMLAttributes } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  title: string;
  regEx?: RegExp;
  placeholder?: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  disabled?: boolean;
  errorText?: string;
  classnames?: string;
  maxLength?: number;
  autoRegEx?: (inputValue: string) => string;
}

function Input({ title, regEx, placeholder, inputValue, setInputValue, disabled, errorText, classnames, maxLength, autoRegEx, type }: InputProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const validInput = (text: string) => {
    if (regEx) {
      const isValid = regEx.test(text);
      setIsError(!isValid);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (autoRegEx) {
      value = autoRegEx(value);
    }
    setInputValue(value);
    debounce(() => {
      validInput(value);
    }, 500)();
  };

  return (
    <div className={cn("input-wrap", classnames)}>
      {title && <span className={cn("input-title")}>{title}</span>}
      <input
        type={type}
        disabled={disabled}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className={cn(isError && "error")}
        maxLength={maxLength}
      />
      {isError && <span className={cn("error-text")}>{errorText}</span>}
    </div>
  );
}

export default Input;
