import { useState, useEffect } from 'react';

export default function Countdown({targetDate, className}) {
    
  const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
  });
  
  const Counter = (props) => {
    const value = props.value || 0
    const formattedValue = value < 10 ? `0${value}` : `${value}`
    return (
      <div className=''>
        <div className="w-20 mx-auto text-center font-exo">
          <div className="text-5xl mb-2 font-bold">{formattedValue}</div>
          <div className="text-sm text-green-400 font-bold">{props.label}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`relative z-2 w-full px-6 min-h-[10vh] ${className}`}>
      <div className="container max-w-6xl mx-auto">
        <div className="bg-blue-500 rounded-lg text-white py-8">
          <div className="grid grid-cols-2 mx-auto w-60 lg:w-3/4 gap-6 lg:gap-28 lg:grid-cols-4">
            <Counter value={timeLeft.days} label="DAYS" />
            <Counter value={timeLeft.hours} label="HRS" />
            <Counter value={timeLeft.minutes} label="MIN" />
            <Counter value={timeLeft.seconds} label="SEC" />
          </div>
        </div>
      </div>
    </div>
  )
}
