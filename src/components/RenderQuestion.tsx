import { useState } from "react";
import { wording } from "../assets/wording";
import ContinuoustLoading from "./ContinuoustLoading";
import { Button } from "antd";

interface RenderQuestion {
  currentQuestion: string;
  randomQuestion: () => void;
  resetQuestion: () => void;
  addNewQuestion: () => void;
  listQuestion: string[];
  remainQuestion: string[];
}

const InputQuestion: React.FC<RenderQuestion> = ({
  currentQuestion,
  randomQuestion,
  addNewQuestion,
  resetQuestion,
  listQuestion,
  remainQuestion,
}) => {
  const [isRandomQuestion, setIsRandomQuestion] = useState<boolean>(false);

  const stopRandomQuestion = () => {
    setIsRandomQuestion(false);
  };

  const startRandomQuestion = () => {
    randomQuestion();
    if (remainQuestion.length === 0) {
      return;
    }

    setIsRandomQuestion(true);
  };

  const countRemainingQuestion = (): string => {
    return `คำถาม ${remainQuestion.length} จาก ${listQuestion.length}`;
  };
  return (
    <>
      <div
        className="input-question-container flex-center flex-col aln-center g-16"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="question-contianer"
          style={{
            width: "80%",
            padding: "1.5rem",
            color: "salmon",
          }}
        >
          <div className="flex-row" style={{ justifyContent: "flex-end" }}>
            <span>{countRemainingQuestion()}</span>
          </div>
          <div
            style={{
              border: "4px solid rgba(255,255,255,0.6)",
              padding: "1.5rem",
              textAlign: "center",
              fontSize: "3rem",
              height: "15rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isRandomQuestion ? (
              <ContinuoustLoading listQuestion={listQuestion} />
            ) : (
              <p style={{ width: "100%" }}>{currentQuestion}</p>
            )}
          </div>
        </div>

        <div
          className="btn-container flex-col g-8"
          style={{ width: "30%", justifyContent: "space-around" }}
        >
          {remainQuestion.length === 0 &&
          currentQuestion === wording.outOfQuestion ? (
            <div
              className="btn flex-row"
              style={{ justifyContent: "space-between" }}
            >
              <Button onClick={resetQuestion}>{wording.btnReset}</Button>
              <Button onClick={addNewQuestion}>
                {wording.btnAddNewQuestion}
              </Button>
            </div>
          ) : (
            <>
              {isRandomQuestion ? (
                <Button onClick={stopRandomQuestion}>{"หยุดสุ่ม"}</Button>
              ) : (
                <Button onClick={startRandomQuestion}>
                  {wording.btnRandomQuestion}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputQuestion;
