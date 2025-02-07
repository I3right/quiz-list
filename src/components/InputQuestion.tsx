import React from "react";
import { wording } from "../assets/wording";

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
        <textarea
          value={value}
          onChange={(e) => handleInputTextArea(e.target.value)}
          placeholder={wording.placeholderInputQuestion}
          rows={20}
          cols={50}
        />
        <div className="btn-question-container flex-row g-8">
          <button onClick={handleSetQuestion}>{wording.btnSetQuestion}</button>
        </div>
      </div>
    </>
  );
};

export default InputQuestion;
