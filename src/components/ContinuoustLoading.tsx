import { useEffect, useState } from "react";

interface ContinuousLoading {
  listQuestion: string[];
}

const InputQuestion: React.FC<ContinuousLoading> = ({ listQuestion }) => {
  const [currentWord, setCurrentWord] = useState(
    listQuestion[Math.floor(Math.random() * listQuestion.length)]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord(
        listQuestion[Math.floor(Math.random() * listQuestion.length)]
      );
    }, 10); // Change word every 10 ms

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>{currentWord}</div>
    </>
  );
};

export default InputQuestion;
