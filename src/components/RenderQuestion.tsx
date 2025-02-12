import { useState } from "react";
import { wording } from "../assets/wording";
import { Button } from "antd";
import ContinuoustLoading from "./ContinuoustLoading";
import CountDown from "./CountDown";

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
  const [isShowCountDown, setIsShowCountDown] = useState<boolean>(false);
  const [isPauseCountDown, setIsPauseCountDown] = useState<boolean>(false);
  const [isShowCountDownButton, setIsShowCountDownButton] =
    useState<boolean>(false);
  const [isShowPauseCountDownButton, setIsShowPauseCountDownButton] =
    useState<boolean>(false);
  const [isShowContinueCountDown, setIsShowContinueCountDown] =
    useState<boolean>(false);

  const stopRandomQuestion = () => {
    setIsRandomQuestion(false);
    setIsShowPauseCountDownButton(false);
  };

  const startRandomQuestion = () => {
    setIsShowCountDown(false);
    setIsShowContinueCountDown(false);
    randomQuestion();
    if (remainQuestion.length === 0) {
      return;
    }

    setIsRandomQuestion(true);
    setIsShowCountDownButton(true);
  };

  const countRemainingQuestion = (): string => {
    return `คำถาม ${remainQuestion.length} จาก ${listQuestion.length}`;
  };

  const startCountDown = () => {
    setIsShowCountDown(true);
    setIsShowPauseCountDownButton(true);
    setIsShowCountDownButton(false);
  };

  const handleRestQuestion = () => {
    setIsShowCountDownButton(false);
    setIsShowPauseCountDownButton(false);
    resetQuestion();
  };

  const handleStopCountDown = () => {
    setIsPauseCountDown(true);
    setIsShowContinueCountDown(true);
    setIsShowPauseCountDownButton(false);
  };

  const handleContinueCount = () => {
    setIsPauseCountDown(false);
    setIsShowContinueCountDown(false);
    setIsShowPauseCountDownButton(true);
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
              <div
                className="flex-row"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ width: "100%" }}>{currentQuestion}</p>
                {isShowCountDown && <CountDown isPaused={isPauseCountDown} />}
              </div>
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
              <Button onClick={handleRestQuestion}>{wording.btnReset}</Button>
              <Button onClick={addNewQuestion}>
                {wording.btnAddNewQuestion}
              </Button>
            </div>
          ) : (
            <>
              {isRandomQuestion ? (
                <Button onClick={stopRandomQuestion}>{"หยุดสุ่ม"}</Button>
              ) : (
                <div className="flex-col g-16">
                  <Button onClick={startRandomQuestion}>
                    {wording.btnRandomQuestion}
                  </Button>
                  {isShowCountDownButton && (
                    <Button onClick={startCountDown}>{"เริ่มจับเวลา"}</Button>
                  )}
                  {isShowPauseCountDownButton && (
                    <Button onClick={handleStopCountDown}>{"หยุดเวลา"}</Button>
                  )}
                  {isShowContinueCountDown && (
                    <Button onClick={handleContinueCount}>
                      {"จับเวลาต่อ"}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputQuestion;
