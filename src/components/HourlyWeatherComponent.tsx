import React from "react";
interface IHourlyWeatherComponent {
  index: number;
  hour: {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}
export default function HourlyWeatherComponent({
  index,
  hour,
}: IHourlyWeatherComponent) {
  return (
    <div
      key={index}
      className="p-4 bg-gray-800 bg-opacity-40 text-white mr-4 flex flex-col justify-center items-center py-5 rounded-lg "
    >
      <p className="text-xl font-semibold">{hour.time.split(" ")[1]}</p>
      <img
        src={`https:${hour.condition.icon}`}
        alt="Weather Icon"
        className="min-w-20 max-w-36"
      />
      <p className="mt-2">{hour.temp_c}° C</p>
    </div>
  );
}
