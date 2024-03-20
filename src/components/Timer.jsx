import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

//Set default
const defaultTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Timer = ({ timeInput }) => {
  const [remaining, setRemaining] = useState(defaultTime);

  useEffect(() => {
    const timeout = setInterval(() => {
      callTimer(timeInput);
    }, 1000);
    return () => clearInterval(timeout);
  }, []);
  
  const callTimer = (timeInput) => {
    if (timeInput > 0) {
      setRemaining(calcTime(timeInput));
      // console.log(timeInput, remaining)
    }
  };

  const calcTime = (timeInMilliseconds) => {
    const timeObj = dayjs(timeInMilliseconds);
    const currentTimeObj = dayjs();

    //calcSeconds
    const seconds = timeObj.diff(currentTimeObj, "seconds") % 60;
    //calcMinutes
    const minutes = timeObj.diff(currentTimeObj, "minutes") % 60;
    //calcHours
    const hours = timeObj.diff(currentTimeObj, "hours") % 24;
    //calcDays
    const days = timeObj.diff(currentTimeObj, "days");

    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
    };
  };

  return (
    <div>
      <div>{`${remaining.days} Days`}</div>
      <div>{`${remaining.hours} hours`}</div>
      <div>{`${remaining.minutes} minutes`}</div>
      <div>{`${remaining.seconds} seconds`}</div>
    </div>
  );
};

export default Timer;
