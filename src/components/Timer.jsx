import React, { useEffect, useState } from "react";
import Units from "./Units";
import sound from "../audio/notification.mp3";

const Timer = () => {
  const [futureDate, setFutureDate] = useState(
    localStorage.getItem("futureDate") || ""
  );
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem("futureDate", futureDate);
  }, [futureDate]);

  //Date Limit
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 99);
  let upperLimit = `${maxDate.getFullYear().toString().padStart(2, "0")}-${(
    maxDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${maxDate.getDate().toString().padStart(2, "0")}`;
  let lowerLimit = `${currentDate.getFullYear().toString().padStart(2, "0")}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  //Calculate Time Difference
  const calculateTimeLeft = () => {
    const difference = new Date(futureDate) - new Date();
    setTimeLeft(difference);
  };

  useEffect(() => {
    calculateTimeLeft();
  }, [futureDate]);

  //Loop
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  });

  //For Displaying Time
  const formatTime = (time) => {
    if (time < 0 || isNaN(time)) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };


  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="h-screen flex items-center justify-center flex-col font-vi100 bg-[#000915] text-[#00ABD0]">
      <h1 className="text-[40px] py-[5%]">Countdown Timer</h1>
      <div className="flex flex-wrap items-center justify-center">
        <Units val={days} unitType="Days" />
        <Units val={hours} unitType="Hours" />
        <Units val={minutes} unitType="Minutes" />
        <Units val={seconds} unitType="Seconds" />
      </div>
      <h1 className="text-[28px] mt-[72px] mb-[24px]">Set future time below</h1>
      <input
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value={futureDate}
        min={`${lowerLimit}T00:00`}
        max={`${upperLimit}T00:00`}
        onChange={(e) => setFutureDate(e.target.value)}
        className="p-[10px] bg-transparent border-2 border-[#00ABD0] rounded-lg min-w-64 text-[20px]"
      />
      <button
        className="my-[36px] p-[10px] bg-transparent border-2 border-[#00ABD0] rounded-lg min-w-64 text-[20px]"
        onClick={() => {
          setFutureDate(0);
        }}
      >
        Reset Timer
      </button>
    </div>
  );
};

export default Timer;
