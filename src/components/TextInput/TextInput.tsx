import React from "react";
import styles from "./TextInput.module.css";

interface ITextInputProps {
  onInput: (text: string) => void;
  placeholder: string;
}

const TextInput: React.FC<ITextInputProps> = ({ onInput, placeholder }) => {
  const [textValue, setTextValue] = React.useState<string>("");

  return (
    <div>
      <input
        className={styles.textInput}
        type="text"
        value={textValue}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTextValue(event.target.value);
          onInput(event.target.value);
        }}
      ></input>
    </div>
  );
};

export default TextInput;
