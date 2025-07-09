import { useState, useEffect, use } from "react";
import axios from "axios";
import "./App.css";
import SearchAppBar from "../components/SearchAppBar";
import WeatherCard from "../components/WeatherCard";
import Box from "@mui/material/Box";
import HumidityCard from "../components/HumidityCard";
import PressureCard from "../components/PressureCard";
import CloudCard from "../components/CloudCard";
import PrecCard from "../components/PrecipitationCard";
import WeeklyForecastCard from "../components/WeeklyForecastCard";
import TemperatureLineChart from "../components/DailyTempChart";
import CustomTabPanel from "../components/CustomTabPanel";

// *********************** App.tsx ************************* //
function App() {
  // *********************** useState ************************* //
  const [weather, setWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);
  const [city, setCity] = useState("Ankara");
  const [selectedHourlyTemps, setSelectedHourlyTemps] = useState<any[]>([]);
  const [pastTemps, setPastTemps] = useState<any[]>([]);

  // ********************** Variables ************************ //
  const now = new Date();
  const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const formatDate = (date) => date.toISOString().slice(0, 10);

  const year = now.getFullYear();
  const month = aylar[now.getMonth()];
  const day = now.getDate();
  const hour = now.getHours();
  const dayOfWeek = now.toLocaleDateString("tr-TR", { weekday: "long" });
  const todayString = formatDate(now);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowString = formatDate(tomorrow);
  // ******************* Helper Functions ********************* //
  function capitalizeWords(text: string): string {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleDayClick = async (date: string) => {
    if (date === todayString) {
      // Past temps: sadece app_temp değerleri, null'ları sonda kırpıyoruz
      const pastTempValues = pastTemps.map((hour) => hour.app_temp);
      const lastIndex = pastTempValues
        .map((v, i) => (v !== null ? i : -1))
        .filter((i) => i !== -1)
        .pop();

      const trimmedPast = pastTempValues.slice(0, lastIndex + 1);

      // Gelecek saatler (bugün için)
      const futureTemps = hourlyTemps
        .filter((hour) => hour.timestamp_local.startsWith(date))
        .map((hour) => hour.temp);

      const combined = [...trimmedPast, ...futureTemps];
      setSelectedHourlyTemps(combined);
    } else {
      // Diğer günler için sadece temp değerlerini alıyoruz
      const temps = hourlyTemps
        .filter((hour) => hour.timestamp_local.startsWith(date))
        .map((hour) => hour.temp);

      setSelectedHourlyTemps(temps);
    }
  };

  // ********************** useEffect ************************ //
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const apiKey2 = import.meta.env.VITE_WEATHER2_API_KEY;

        const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const geocodeResponse = await axios.get(geocodeUrl);
        const { lat, lon } = geocodeResponse.data.coord;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;
        const response = await axios.get(url);
        setWeather(response.data);

        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey2}&units=metric&lang=tr&days=8`;
        const weatherBitResponse = await axios.get(weatherBitUrl);
        setForecastWeather(weatherBitResponse.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        const apiKey2 = import.meta.env.VITE_WEATHER2_API_KEY;
        const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${apiKey2}&hours=168&units=metric&lang=tr`;

        const response = await axios.get(weatherUrl);
        const hourlyData = response.data.data; // keep it all
        setHourlyTemps(hourlyData);
      } catch (error) {
        console.error("Error fetching hourly weather:", error);
      }
    };

    fetchHourlyWeather();
  }, [city]);

  useEffect(() => {
    const fetchPastWeather = async () => {
      try {
        const apiKey2 = import.meta.env.VITE_WEATHER2_API_KEY;
        const pastWeatherUrl = `https://api.weatherbit.io/v2.0/history/hourly?city=${city}&start_date=${todayString}&end_date=${tomorrowString}&key=${apiKey2}&units=metric&lang=tr`;

        const response = await axios.get(pastWeatherUrl);
        setPastTemps(response.data.data);
        console.log("Past temperatures:", response.data.data);
      } catch (error) {
        console.error("Error fetching past weather:", error);
      }
    };

    fetchPastWeather();
  }, [city, todayString, tomorrowString]);

  useEffect(() => {
    if (forecastWeather && forecastWeather.data.length > 0) {
      const firstDate = forecastWeather.data[0].datetime;
      handleDayClick(firstDate);
    }
  }, [forecastWeather]);

  // ******************** Components *********************** //
  return (
    <div>
      <SearchAppBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 7,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        <Box flexGrow={3}>
          {weather && (
            <WeatherCard
              day={day}
              month={month}
              year={year}
              dayOfWeek={dayOfWeek}
              city={city}
              country={weather.sys.country}
              iconUrl={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              description={capitalizeWords(weather.weather[0].description)}
              temperature={weather.main.temp}
              felt_temp={weather.main.feels_like}
              max_temp={weather.main.temp_max}
              min_temp={weather.main.temp_min}
              color="#F1F4F8"
            />
          )}
        </Box>
        <Box flexGrow={1}>
          {weather && (
            <HumidityCard humidity={weather.main.humidity} color="#F1F4F8" />
          )}

          {weather && (
            <PressureCard pressure={weather.main.pressure} color="#F1F4F8" />
          )}

          {weather && (
            <CloudCard cloudiness={weather.clouds.all} color="#F1F4F8" />
          )}

          {forecastWeather && (
            <PrecCard prec={forecastWeather.data[0].pop} color="#F1F4F8" />
          )}
        </Box>
        <Box flexGrow={3}>
          {weather && (
            <WeatherCard
              day={day}
              month={month}
              year={year}
              dayOfWeek={dayOfWeek}
              city="İstanbul"
              country="TR"
              iconUrl={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              description={capitalizeWords(weather.weather[0].description)}
              temperature="18"
              felt_temp="19"
              max_temp="21"
              min_temp="16"
              color="#EDEDED"
            />
          )}
        </Box>
        <Box flexGrow={1}>
          {weather && <HumidityCard humidity="79" color="#EDEDED" />}

          {weather && <PressureCard pressure="1012" color="#EDEDED" />}

          {weather && (
            <CloudCard cloudiness={weather.clouds.all} color="#EDEDED" />
          )}

          {forecastWeather && <PrecCard prec="0" color="#EDEDED" />}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 7,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        {forecastWeather && (
          <WeeklyForecastCard
            forecastDays={forecastWeather.data.slice(0, 7).map((day: any) => ({
              date: day.datetime,
              weather: day.weather.description,
              maxTemp: day.max_temp,
              minTemp: day.min_temp,
            }))}
            onDayClick={(date) => handleDayClick(date)}
          />
        )}

        <Box flexGrow={3}>
          {hourlyTemps && (
            <TemperatureLineChart
              series={[
                {
                  data: selectedHourlyTemps,
                  color: "#E56622",
                  valueFormatter: (v) => `${Math.round(v)}°C`,
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default App;
