"use client";

import { useState } from "react";

const dates = [
  { label: "TUE", day: 27, month: "JAN" },
  { label: "WED", day: 28, month: "JAN" },
  { label: "THU", day: 29, month: "JAN" },
];

const times = [
  { label: "Morning", time: "8am–12pm" },
  { label: "Afternoon", time: "12pm–4pm" },
  { label: "Evening", time: "4pm–8pm" },
];

export default function ScheduleViewing({ property }) {
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedTime, setSelectedTime] = useState(times[0]);

  const handleSchedule = () => {
    console.log({
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto rounded-2xl overflow-hidden bg-[#f4f3f1]">
      {/* LEFT IMAGE */}
      <div className="w-1/2">
        <img
          src={property?.thumbnail}
          alt={property?.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold mb-6">Schedule a viewing</h2>

        {/* DATE SELECTOR */}
        <div className="flex gap-4 mb-6">
          {dates.map((date) => {
            const active = selectedDate.day === date.day;

            return (
              <button
                key={date.day}
                onClick={() => setSelectedDate(date)}
                className={`w-24 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                  ${
                    active
                      ? "border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
              >
                <span className="text-sm">{date.label}</span>
                <span className="text-2xl font-semibold">{date.day}</span>
                <span className="text-sm">{date.month}</span>
              </button>
            );
          })}
        </div>

        {/* TIME SELECTOR */}
        <div className="flex gap-4 mb-6">
          {times.map((slot) => {
            const active = selectedTime.label === slot.label;

            return (
              <button
                key={slot.label}
                onClick={() => setSelectedTime(slot)}
                className={`px-6 py-4 rounded-xl border-2 text-left
                  ${
                    active
                      ? "border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
              >
                <p className="font-medium">{slot.label}</p>
                <p className="text-sm text-gray-600">{slot.time}</p>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-600 mb-6">
          No obligation or purchase necessary, cancel at any time.
        </p>

        <button
          onClick={handleSchedule}
          className="bg-[#0a4f4f] text-white py-4 rounded-full text-lg font-semibold hover:opacity-90"
        >
          Schedule tour
        </button>
      </div>
    </div>
  );
}
