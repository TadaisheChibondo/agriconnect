import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  MapPin,
  Loader2,
} from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Open-Meteo API fetching live data for Bulawayo
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-20.15&longitude=28.58&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto",
        );
        const data = await response.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center h-full border border-white/10 w-full min-h-[140px]">
        <Loader2 className="animate-spin text-emerald-400" size={24} />
      </div>
    );
  }

  if (!weather) return null;

  // A simple function to turn WMO weather codes into nice icons and text
  const getWeatherConfig = (code) => {
    if (code <= 3)
      return {
        icon: <Sun className="text-amber-400" size={40} />,
        text: "Clear / Cloudy",
      };
    if (code <= 48)
      return {
        icon: <Cloud className="text-stone-300" size={40} />,
        text: "Fog",
      };
    if (code <= 67)
      return {
        icon: <CloudRain className="text-blue-400" size={40} />,
        text: "Rain",
      };
    return {
      icon: <CloudRain className="text-blue-500" size={40} />,
      text: "Storm / Heavy Rain",
    };
  };

  const { icon, text } = getWeatherConfig(weather.weather_code);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white w-full shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-1 text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-1">
            <MapPin size={12} /> Bulawayo
          </div>
          <h3 className="text-3xl font-bold tracking-tight">
            {weather.temperature_2m}°C
          </h3>
          <p className="text-emerald-100 text-sm font-medium mt-1">{text}</p>
        </div>
        <div className="drop-shadow-md">{icon}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 mt-2">
        <div className="flex items-center gap-2 text-sm text-emerald-50 font-medium">
          <Wind size={16} className="text-emerald-300" />
          {weather.wind_speed_10m} km/h
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-50 font-medium">
          <Droplets size={16} className="text-emerald-300" />
          {weather.relative_humidity_2m}%
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
