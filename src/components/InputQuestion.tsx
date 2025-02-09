import React from "react";
import { wording } from "../assets/wording";
import { Button } from "antd";

import { Input } from "antd";

const { TextArea } = Input;

interface InputQuestionProps {
  value: string;
  handleSetInput: (value: string) => void;
  handleSetQuestion: () => void;
}

const InputQuestion: React.FC<InputQuestionProps> = ({
  value,
  handleSetInput,
  handleSetQuestion,
}) => {
  function handleInputTextArea(question: string) {
    handleSetInput(question);
  }

  return (
    <>
      <div className="input-question-container flex-col g-16">
        <TextArea
          rows={10}
          cols={100}
          value={value}
          onChange={(e) => handleInputTextArea(e.target.value)}
          placeholder={wording.placeholderInputQuestion}
        />
        <div className="btn-question-container flex-row g-8">
          <Button onClick={handleSetQuestion}>{wording.btnSetQuestion}</Button>
        </div>
      </div>
    </>
  );
};

export default InputQuestion;
