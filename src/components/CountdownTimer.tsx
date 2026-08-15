import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingData.date.targetIsoDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}'s Wedding`);
    const details = encodeURIComponent(
      `Join us in celebrating the wedding of ${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}.\n\nRegistration: 10:00 AM at Kumaranellur Register Office\nReception: 12:00 PM - 3:00 PM at NAS Auditorium, Kumbidi`
    );
    const location = encodeURIComponent('NAS Auditorium, Kumbidi, Kerala, India');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260907T043000Z/20260907T093000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto card-gradient-plum rounded-3xl p-6 sm:p-10 text-center text-white relative overflow-hidden shadow-2xl border border-[#f1df9d]/40">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#936492]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f1df9d]" />
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#f1df9d]">
            Counting Down To Forever
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#f1df9d]" />
        </div>

        <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-normal text-[#fbf6e2] mb-1">
          Until We Say "I Do"
        </h2>

        <p className="relative z-10 font-display italic text-xs sm:text-base text-white/80 max-w-md mx-auto mb-6">
          Every second brings us closer to the most magical day of our lives.
        </p>

        {/* Horizontal Single Row Countdown Across ALL Screens (Mobile & Desktop) */}
        <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto mb-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-[#f1df9d]/30 flex flex-col items-center justify-center shadow-inner hover:bg-white/15 transition-all duration-300 min-w-0"
            >
              <span className="font-serif text-xl sm:text-4xl md:text-5xl font-bold text-[#fbf6e2] tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-[#f1df9d] font-semibold mt-0.5 sm:mt-1 truncate w-full">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button: Add to Calendar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#b38719] text-[#2c122b] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#2c122b]" /> Add to Google Calendar
          </button>
          
          <span className="text-xs text-white/70 flex items-center gap-1 font-light">
            <Clock className="w-3 h-3 text-[#f1df9d]" />
            {weddingData.date.formattedFull} · 10:00 AM
          </span>
        </div>

      </div>
    </section>
  );
};
