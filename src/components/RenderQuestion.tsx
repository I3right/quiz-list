import { wording } from "../assets/wording";

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
  const getButtonName = (): string => {
    return wording.btnRandomQuestion;
  };

  const countRemainingQuestion = (): string => {
    return `คำถาม ${remainQuestion.length} จาก ${listQuestion.length}`;
  };
  return (
    <>
      <div
        className="input-question-container flex-center flex-col g-16"
        style={{ width: "100%", height: "100%" }}
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
            {/* <span>{wording.labelShowQuestion}</span> */}
            <span>{countRemainingQuestion()}</span>
          </div>
          <p
            style={{
              border: "4px solid rgba(255,255,255,0.6)",
              padding: "1.5rem",
              textAlign: "center",
              fontSize: "6rem",
              minHeight: "6rem",
            }}
          >
            {currentQuestion}
          </p>
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
              <button onClick={resetQuestion}>{wording.btnReset}</button>
              <button onClick={addNewQuestion}>
                {wording.btnAddNewQuestion}
              </button>
            </div>
          ) : (
            <button onClick={randomQuestion}>{getButtonName()}</button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputQuestion;
