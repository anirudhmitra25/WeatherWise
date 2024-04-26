import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { FaWind } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { BallTriangle } from "react-loader-spinner";
import getBackgroundColor from "../helper/fetchBackgroundColor";
import fetchWeatherData from "../api/fetchWeatherData";
import formatLocalTime from "../helper/formatDate";
import HourlyWeatherComponent from "../components/HourlyWeatherComponent";
import { WiHumidity } from "react-icons/wi";

interface IWeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      code: number;
      text: string;
      icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avghumidity: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
        maxtemp_c: number;
        maxtemp_f: number;
        maxwind_kph: number;
        maxwind_mph: number;
        mintemp_c: number;
        mintemp_f: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

const LandingPage = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [query, setQuery] = useState("London");
  const [currentColor, setCurrentColor] = useState<string>("bg-gray-800");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWeatherData({ query })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("==>>", err);
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    if (weatherData) {
      const newColor = getBackgroundColor(weatherData.current.condition.code);
      setCurrentColor(newColor);
    }
  }, [weatherData]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div
      className={`h-screen w-screen ${
        loading ? "bg-gray-900" : "bg-slate-700"
      }`}
    >
      {loading && !weatherData ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinner"></div>{" "}
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        weatherData && (
          <div className={`h-screen w-screen bg-slate-700`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className={`sm:flex flex-row ${currentColor} h-screen w-screen overflow-auto`}
              >
                <div className="w-full sm:w-5/12 md:w-1/4 p-4 text-white">
                  <div className="mb-4 relative">
                    <SearchBar onSearch={handleSearch} isLoading={loading} />
                  </div>
                  <>
                    <div className="flex flex-row py-4">
                      <IoLocationOutline className=" w-8 h-8 mr-2" />
                      <span>
                        {weatherData.location.name},{" "}
                        {weatherData.location.country}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <h1 className="font-bold sm:text-6xl text-4xl">
                        {weatherData.current.temp_c}° C
                      </h1>
                    </div>
                    <div className="w-fit mx-auto opacity-80">
                      <div className="flex justify-start items-center mt-5 mb-5">
                        <FaWind className="w-7 h-7" />
                        <span className="ml-3 font-semibold">
                          {weatherData.current.wind_dir},{" "}
                          {weatherData.current.wind_kph} km/h
                        </span>
                      </div>
                      <div className="flex justify-start items-center mt-5 mb-5">
                        <WiHumidity className="w-7 h-7" />
                        <span className="ml-3 font-semibold">
                          {weatherData.current.humidity} %
                        </span>
                      </div>
                    </div>
                    <div className="sm:px-0 px-3 mt-10">
                      <h1 className=" font-semibold md:text-2xl text-xl ">
                        Next days Forecast:
                      </h1>
                      <div className=" overflow-y-auto">
                        {weatherData.forecast.forecastday
                          .slice(1)
                          .map((weather, key) => (
                            <div
                              key={key}
                              className="my-5 flex flex-row w-full overflow-x-auto"
                            >
                              <div
                                className="w-1/5 min-w-14 rounded-lg mr-3 px-1 flex items-center justify-center"
                                style={{
                                  background: "rgba(255, 255, 255, 0.3)",
                                }}
                              >
                                <img
                                  src={`https:${weather.day.condition.icon}`}
                                  alt="Weather Icon"
                                  className="opacity-100"
                                />
                              </div>
                              <div className="w-3/5">
                                <p className="font-semibold sm:text-sm">
                                  {formatLocalTime(weather.date)}
                                </p>
                                <p className="font-semibold opacity-50 sm:text-sm">
                                  {weather.day.condition.text}
                                </p>
                              </div>
                              <div className="flex flex-col font-semibold sm:text-sm">
                                <p>{weather.day.maxtemp_c}° C</p>
                                <p>{weather.day.mintemp_c}° C</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                </div>

                <div className="w-px mt-8 mb-8 bg-gray-200"></div>

                <div className="w-full sm:w-7/12 md:w-3/4 p-4 text-white">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-end">
                      <h2 className="text-xl mr-5 opacity-50">
                        {formatLocalTime(weatherData.location.localtime)}
                      </h2>
                    </div>
                    <div className="overflow-y-auto">
                      <div className="flex flex-col items-start justify-end pb-5 h-full">
                        <div className="flex flex-row items-center mb-5">
                          <img
                            src={`https:${weatherData.current.condition.icon}`}
                            alt="Weather Icon"
                            className="w-20 h-20"
                          />
                          <h2 className="md:text-8xl text-4xl font-semibold">
                            {weatherData.current.condition.text}
                          </h2>
                        </div>
                        <div className="overflow-x-auto max-w-full">
                          <div className="flex">
                            {weatherData.forecast.forecastday[0].hour.map(
                              (hour, index) => (
                                <HourlyWeatherComponent
                                  key={index}
                                  index={index}
                                  hour={hour}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )
      )}
    </div>
  );
};

export default LandingPage;
