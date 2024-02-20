
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 

const CountdownTimer = ({ targetDateTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDateTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);

      const days = Math.min(Math.floor(totalSeconds / (24 * 60 * 60)), 99).toString().padStart(2, '0');
      const hours = Math.min(Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)), 23).toString().padStart(2, '0');
      const minutes = Math.min(Math.floor((totalSeconds % (60 * 60)) / 60), 59).toString().padStart(2, '0');
      const seconds = Math.min(totalSeconds % 60, 59).toString().padStart(2, '0');

      timeLeft = { days, hours, minutes, seconds };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isStopped) {
        setTimeLeft(calculateTimeLeft());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isStopped, targetDateTime]);

  const handleStop = () => {
    setIsStopped(true);
  };

  const renderTimeBlocks = (digits) => {
    return (digits ?? '').split('').map((digit, index) => (
      <div className="time-block" key={index}>
        {digit}
      </div>
    ));
  };

  return (
    <div>
      <div className="time-container">
        <div className="time-group">
          <div className="time-wrapper">
            {renderTimeBlocks(timeLeft.days)}
          </div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-group">
          <div className="time-wrapper">
            {renderTimeBlocks(timeLeft.hours)}
          </div>
          <div className="time-label">Hours</div>
        </div>
        <div className="time-group">
          <div className="time-wrapper">
            {renderTimeBlocks(timeLeft.minutes)}
          </div>
          <div className="time-label">Minutes</div>
        </div>
        <div className="time-group">
          <div className="time-wrapper">
            {renderTimeBlocks(timeLeft.seconds)}
          </div>
          <div className="time-label">Seconds</div>
        </div>
      </div>
      {!isStopped && (
        <button className='stop'onClick={handleStop}>Stop Timer</button>
      )}
    </div>
  );
};

export default CountdownTimer;
