import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">⏱ Stopwatch</h1>

        <div className="text-5xl font-mono font-semibold mb-8">
          {formatTime()}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reset
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Stopwatch;