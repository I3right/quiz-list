import { Flex, Progress } from "antd";
import { useEffect, useState } from "react";

interface CountDownProps {
  isPaused: boolean;
}

const CountDown: React.FC<CountDownProps> = ({ isPaused }) => {
  const tenPercentage = 17;
  const [countDown, setCountDown] = useState<number>(100);

  useEffect(() => {
    if (!isPaused && countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 600);
      return () => clearTimeout(timer);
    }
  }, [countDown, isPaused]);

  const getTimeRemain = (percentage: number | undefined): string => {
    const seconds = Math.floor(((percentage ?? 0) * 60) / 100);
    return `${seconds}s`;
  };

  return (
    <Flex
      gap="small"
      wrap
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "50%",
        padding: "0.2rem",
      }}
    >
      <Progress
        type="circle"
        percent={countDown}
        format={(percent) => getTimeRemain(percent)}
        status={countDown < tenPercentage ? "exception" : "normal"}
      />
    </Flex>
  );
};

export default CountDown;
