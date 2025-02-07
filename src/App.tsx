import { useState } from "react";

import "./App.css";
import InputQuestion from "./components/InputQuestion";
import OutPut from "./components/RenderQuestion";
import { wording } from "./assets/wording";

function App() {
  const [rawInput, setRawInput] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [listQuestion, setListQuestion] = useState<string[]>([]);
  const [remainQuestion, setRemainQuestion] = useState<string[]>([]);
  const [isShowInput, setIsShowInput] = useState<boolean>(true);

  const handleSetQuestion = () => {
    setIsShowInput(!isShowInput);
    processQuestions();
  };

  const processQuestions = () => {
    const newQuestions = rawInput
      .split("\n")
      .filter((pharse) => pharse.trim() !== "");

    setListQuestion(newQuestions);
    setRemainQuestion([...newQuestions]);
    setCurrentQuestion("");
  };

  const randomQuestion = () => {
    const amountQuestionLeft = remainQuestion.length;
    if (!amountQuestionLeft) {
      setCurrentQuestion(wording.outOfQuestion);
      setTimeout(() => {
        setCurrentQuestion("");
      }, 1000);
      return;
    }

    const randomIndex = Math.floor(Math.random() * amountQuestionLeft);
    const selectQuestion = remainQuestion[randomIndex];
    setCurrentQuestion(selectQuestion);
    setRemainQuestion((listQuestion) =>
      listQuestion.filter((question) => question != selectQuestion)
    );
  };

  const addNewQuestion = () => {
    setIsShowInput(!isShowInput);
  };

  const resetQuestion = () => {
    setRemainQuestion([...listQuestion]);
  };

  return (
    <>
      <div className="main-container flex-center">
        {isShowInput ? (
          <InputQuestion
            value={rawInput}
            handleSetInput={setRawInput}
            handleSetQuestion={() => handleSetQuestion()}
          />
        ) : (
          <OutPut
            currentQuestion={currentQuestion}
            randomQuestion={randomQuestion}
            addNewQuestion={addNewQuestion}
            resetQuestion={resetQuestion}
            listQuestion={listQuestion}
            remainQuestion={remainQuestion}
          />
        )}
      </div>
    </>
  );
}

export default App;
