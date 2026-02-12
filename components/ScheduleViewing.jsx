"use client";

import { useState } from "react";

const dates = [
  { label: "TUE", day: 27, month: "JAN" },
  { label: "WED", day: 28, month: "JAN" },
  { label: "THU", day: 29, month: "JAN" },
];

const times = [
  { label: "Morning", time: "8am-12pm" },
  { label: "Afternoon", time: "12pm-4pm" },
  { label: "Evening", time: "4pm-8pm" },
];

export default function ScheduleViewing({ property }) {
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const previewImage = property?.images?.[0];

  const handleSchedule = () => {
    console.log({
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto rounded-2xl overflow-hidden bg-[#f4f3f1] border border-gray-200">
      <div className="w-full md:w-1/2">
        {previewImage ? (
          <img
            src={previewImage}
            alt={property?.name || "Property image"}
            className="h-40 md:h-full w-full object-cover"
          />
        ) : (
          <div className="h-40 md:h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-10 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 leading-tight">
          Schedule a viewing
        </h2>

        <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-6">
          {dates.map((date) => {
            const active = selectedDate.day === date.day;

            return (
              <button
                key={date.day}
                onClick={() => setSelectedDate(date)}
                className={`w-full h-24 sm:h-28 rounded-xl border-2 flex flex-col items-center justify-center ${
                  active
                    ? "border-black"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <span className="text-xs sm:text-sm">{date.label}</span>
                <span className="text-xl sm:text-2xl font-semibold">
                  {date.day}
                </span>
                <span className="text-xs sm:text-sm">{date.month}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 sm:mb-6">
          {times.map((slot) => {
            const active = selectedTime.label === slot.label;

            return (
              <button
                key={slot.label}
                onClick={() => setSelectedTime(slot)}
                className={`w-full px-3 sm:px-4 py-3 rounded-xl border-2 text-left ${
                  active
                    ? "border-black"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <p className="font-medium">{slot.label}</p>
                <p className="text-xs sm:text-sm text-gray-600">{slot.time}</p>
              </button>
            );
          })}
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          No obligation or purchase necessary, cancel at any time.
        </p>

        <button
          onClick={handleSchedule}
          className="bg-[#0a4f4f] text-white py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90"
        >
          Schedule tour
        </button>
      </div>
    </div>
  );
}
