import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

//Set default
// const defaultTime = {
//   seconds: "00",
//   minutes: "00",
//   hours: "00",
//   days: "00",
// };

// const Timer = ({ timeInput }) => {
//   const [remaining, setRemaining] = useState(defaultTime);

//   useEffect(() => {
//     const timeout = setInterval(() => {
//       callTimer(timeInput);
//     }, 1000);
//     return () => clearInterval(timeout);
//   }, []);

//   const callTimer = (timeInput) => {
//     if (timeInput > 0) {
//       setRemaining(calcTime(timeInput));
//       // console.log(timeInput, remaining)
//     }
//     else setRemaining(defaultTime);
//   };

//   const calcTime = (timeInMilliseconds) => {
//     const timeObj = dayjs(timeInMilliseconds);
//     const currentTimeObj = dayjs();

//     //calcSeconds
//     const seconds = timeObj.diff(currentTimeObj, "seconds") % 60;
//     //calcMinutes
//     const minutes = timeObj.diff(currentTimeObj, "minutes") % 60;
//     //calcHours
//     const hours = timeObj.diff(currentTimeObj, "hours") % 24;
//     //calcDays
//     const days = timeObj.diff(currentTimeObj, "days");

//     return {
//       seconds: seconds,
//       minutes: minutes,
//       hours: hours,
//       days: days,
//     };
//   };

//   return (
//     <div>
//       <div>{`${remaining.days} Days`}</div>
//       <div>{`${remaining.hours} hours`}</div>
//       <div>{`${remaining.minutes} minutes`}</div>
//       <div>{`${remaining.seconds} seconds`}</div>
//     </div>
//   );
// };
// };

const Timer = () => {

  const [futureDate, setFutureDate] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  //Date Limit
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 60);
  let limit = `${maxDate.getFullYear().toString().padStart(2, '0')}-${maxDate.getMonth().toString().padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`


  const calculateTimeLeft = () => {
    const difference = +new Date(futureDate) - +new Date();
    setTimeLeft(difference);
  };

  useEffect(() => {
    console.log(limit);
    console.log(maxDate);

    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    if (time < 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      };
    }

    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value={futureDate}
        min="2018-06-07T00:00"
        max={`${limit}T00:00`}
        onChange={(e) => setFutureDate(e.target.value)} />
      <div className="countdown-container">
        <div className="countdown-item">
          <div className="countdown-value">{days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
