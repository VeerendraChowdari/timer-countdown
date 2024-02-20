
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimeInput.css'; 
import CountdownTimer from './CountdownTimer';

const DateTimeInput = () => {
  const [dateTime, setDateTime] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleDateChange = (date) => {
    setDateTime(date);
  };

  const handleStartCountdown = () => {
    setShowCountdown(true); 
  };

  const handleCancel = () => {
    setShowCountdown(false); 
  };

  return (
    <div className="input-container">
      <h1 className='heading'>Select Date and Time for the countdown timer</h1>
      <div className="button-container">
        <DatePicker
        
          selected={dateTime}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          showMonthDropdown={false}
          showYearDropdown={false}
          popperPlacement="top-start"
          customInput={<CustomInput />}
          calendarClassName="custom-calendar" 
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="header-container">
              
              <button onClick={decreaseMonth}>{"<"}</button>
              <span>{date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              <button onClick={increaseMonth}>{">"}</button>
            </div>
          )}
          renderCustomInput={() => null} 
          calendarContainer={({ children }) => (
            <div>
              {children}
              <div className="time-container">
                <input
                  type="time"
                  className="time-input"
                  onChange={() => {}}
                />
                <select
                  className="am-pm-dropdown"
                  onChange={() => {}}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          )}
        />
        {!showCountdown && <button className='strtcd' onClick={handleStartCountdown}>Start Countdown</button>} 
      </div>
      {showCountdown && <CountdownTimer targetDateTime={dateTime} />} 
      {showCountdown && <button className='cancel' onClick={handleCancel}>Cancel Countdown</button>} 
    </div>
  );
};


const CustomInput = ({ value, onClick }) => (
  <input
    type="text"
    className="custom-input"
    placeholder="Date and Time" 
    value={value}
    onClick={onClick}
  />
);

export default DateTimeInput;
