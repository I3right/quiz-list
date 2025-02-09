import { useState } from "react";

import "./App.css";
import InputQuestion from "./components/InputQuestion";
import OutPut from "./components/RenderQuestion";
import { wording } from "./assets/wording";

const initail =
  "หากคุณสามารถเปลี่ยนแปลงโลกได้หนึ่งอย่าง คุณจะเลือกเปลี่ยนอะไร และทำไม?\nคุณคิดว่าอะไรคือคุณสมบัติที่สำคัญที่สุดของผู้นำที่ดี?\nถ้าคุณสามารถพูดคุยกับบุคคลสำคัญในประวัติศาสตร์ได้หนึ่งคน คุณจะเลือกใคร และจะถามอะไร?\nในยุคดิจิทัลที่ข้อมูลแพร่กระจายอย่างรวดเร็ว คุณคิดว่าเราจะจัดการกับข่าวปลอมได้อย่างไร?\nอะไรคือแรงบันดาลใจที่ทำให้คุณเข้าร่วมการประกวดนางงามครั้งนี้?\n";

function App() {
  const [rawInput, setRawInput] = useState<string>(initail);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [listQuestion, setListQuestion] = useState<string[]>([]);
  const [remainQuestion, setRemainQuestion] = useState<string[]>([]);
  const [isShowInput, setIsShowInput] = useState<boolean>(true);

  const handleSetQuestion = () => {
    if (!rawInput.length) return;
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
    setCurrentQuestion("");
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
