import { useState, useEffect } from "react";
import axios from "axios";
import { useTour } from "@reactour/tour";

import "./App.css";
import SearchAppBar from "../components/SearchAppBar";
import WeatherCard from "../components/WeatherCard";
import HumidityCard from "../components/HumidityCard";
import PressureCard from "../components/PressureCard";
import CloudCard from "../components/CloudCard";
import PrecCard from "../components/PrecipitationCard";
import WeeklyForecastCard from "../components/WeeklyForecastCard";
import TemperatureLineChart from "../components/DailyTempChart";
import WindDirCard from "../components/WindDirCard";
import MoonPhaseCard from "../components/MoonPhaseCard";
import MoonLocationCard from "../components/MoonLocationCard";
import SunLocationIcon from "../components/SunLocationCard";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface WeatherData {
  city: string;
  weather: any;
  forecastWeather: any;
  hourlyTemps: any[];
  pastTemps: any[];
}

function App() {
  // *********************** useState ************************* //
  const [citiesData, setCitiesData] = useState<Record<string, WeatherData>>({});
  const [selectedHourlyTemps, setSelectedHourlyTemps] = useState<any[]>([]);
  const [primaryCity, setPrimaryCity] = useState(() => {
    return localStorage.getItem("primaryCity") || "Ankara";
  });
  const [secondaryCities, setSecondaryCities] = useState<string[]>(() => {
    const saved = localStorage.getItem("secondaryCities");
    return saved ? JSON.parse(saved) : [];
  });
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCity, setMenuCity] = useState<string | null>(null);

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

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  const year = now.getFullYear();
  const month = aylar[now.getMonth()];
  const day = now.getDate();
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
    const primaryData = citiesData[primaryCity];
    if (!primaryData) return;

    if (date === todayString) {
      const pastTempValues = primaryData.pastTemps.map((hour) => hour.app_temp);
      const lastIndex = pastTempValues
        .map((v, i) => (v !== null ? i : -1))
        .filter((i) => i !== -1)
        .pop();

      const trimmedPast = pastTempValues.slice(0, (lastIndex || 0) + 1);
      const futureTemps = primaryData.hourlyTemps
        .filter((hour: any) => hour.timestamp_local.startsWith(date))
        .map((hour: any) => hour.temp);

      const combined = [...trimmedPast, ...futureTemps];
      setSelectedHourlyTemps(combined.slice(0, 24));
    } else {
      const temps = primaryData.hourlyTemps
        .filter((hour: any) => hour.timestamp_local.startsWith(date))
        .map((hour: any) => hour.temp);

      setSelectedHourlyTemps(temps);
    }
  };

  const handleWeatherCardClick = async (city: string) => {
    const oldPrimaryCity = primaryCity;
    if (city === primaryCity) return; // No action for primary city
    const newPrimaryCity = city;
    setPrimaryCity(newPrimaryCity);
    setSecondaryCities((prev) => {
      const updated = prev.filter((c) => c !== newPrimaryCity);
      return [oldPrimaryCity, ...updated];
    });
    await fetchAllCitiesData(); // Re-fetch data for new primary city
  };

  const handleAddCity = (city: string) => {
    const formatted = capitalizeWords(city.trim());
    if (
      formatted === "" ||
      formatted === primaryCity ||
      secondaryCities.includes(formatted)
    )
      return;

    setSecondaryCities((prev) => [...prev, formatted]);
  };

  const handleRemoveCity = (city: string) => {
    setSecondaryCities((prev) => prev.filter((c) => c !== city));
    setCitiesData((prev) => {
      const updated = { ...prev };
      delete updated[city];
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem("secondaryCities", JSON.stringify(secondaryCities));
  }, [secondaryCities]);

  useEffect(() => {
    localStorage.setItem("primaryCity", primaryCity);
  }, [primaryCity]);

  // ********************** Data Fetching ************************ //
  const fetchCityData = async (city: string) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const apiKey2 = import.meta.env.VITE_WEATHER2_API_KEY;

      // Fetch basic weather data
      const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const geocodeResponse = await axios.get(geocodeUrl);
      const { lat, lon } = geocodeResponse.data.coord;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;
      const weatherResponse = await axios.get(weatherUrl);

      // Fetch forecast data
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey2}&units=metric&lang=tr&days=8`;
      const weatherBitResponse = await axios.get(weatherBitUrl);

      // Fetch hourly data
      const hourlyUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${apiKey2}&hours=168&units=metric&lang=tr`;
      const hourlyResponse = await axios.get(hourlyUrl);

      // Fetch past weather (only for primary city)
      let pastTemps = [];
      if (city === primaryCity) {
        const pastWeatherUrl = `https://api.weatherbit.io/v2.0/history/hourly?city=${city}&start_date=${todayString}&end_date=${tomorrowString}&key=${apiKey2}&units=metric&lang=tr`;
        const pastResponse = await axios.get(pastWeatherUrl);
        pastTemps = pastResponse.data.data;
      }

      return {
        city,
        weather: weatherResponse.data,
        forecastWeather: weatherBitResponse.data,
        hourlyTemps: hourlyResponse.data.data,
        pastTemps,
      };
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
      return null;
    }
  };

  const fetchAllCitiesData = async () => {
    const allCities = [primaryCity, ...secondaryCities];
    const citiesDataPromises = allCities.map((city) => fetchCityData(city));
    const results = await Promise.all(citiesDataPromises);

    const newCitiesData: Record<string, WeatherData> = {};
    results.forEach((data, index) => {
      if (data) {
        newCitiesData[allCities[index]] = data;
      }
    });

    setCitiesData(newCitiesData);
  };

  // ********************** useEffect ************************ //
  useEffect(() => {
    fetchAllCitiesData();
  }, [primaryCity, secondaryCities.join()]);

  useEffect(() => {
    if (citiesData[primaryCity]?.forecastWeather?.data?.length > 0) {
      const firstDate =
        citiesData[primaryCity].forecastWeather.data[0].datetime;
      handleDayClick(firstDate);
    }
  }, [citiesData[primaryCity]]);

  // ******************** Components *********************** //
  const renderCityCards = () => {
    const allCities = [primaryCity, ...secondaryCities];
    return (
      <>
        {allCities.map((city) => {
          const cityData = citiesData[city];
          if (!cityData) return null;

          const isPrimary = city === primaryCity;
          const color = isPrimary ? "#EAFDFF" : "#FFFFF";
          const step = isPrimary ? "second-step" : "fourth-step";
          return (
            <Box
              key={city}
              sx={{
                display: "flex",
                flexDirection: "row",
                maxWidth: 500,
                gap: 1,
                flexWrap: "wrap",
                marginLeft: "70px",
              }}
            >
              <Box
                className={step}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "flex-start",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <WeatherCard
                    day={day}
                    month={month}
                    year={year}
                    dayOfWeek={dayOfWeek}
                    city={city}
                    country={cityData.weather.sys.country}
                    iconUrl={`http://openweathermap.org/img/wn/${cityData.weather.weather[0].icon}@2x.png`}
                    description={capitalizeWords(
                      cityData.weather.weather[0].description
                    )}
                    temperature={cityData.weather.main.temp}
                    felt_temp={cityData.weather.main.feels_like}
                    max_temp={cityData.weather.main.temp_max}
                    min_temp={cityData.weather.main.temp_min}
                    color={color}
                    onWeatherCardClick={() => handleWeatherCardClick(city)}
                  />
                  {!isPrimary && (
                    <>
                      <IconButton
                        className="sub-fourth-step"
                        size="small"
                        onClick={(e) => {
                          setMenuAnchorEl(e.currentTarget);
                          setMenuCity(city);
                        }}
                        sx={{
                          position: "absolute",
                          top: 15,
                          left: -2,
                          zIndex: 3,
                        }}
                      >
                        <MoreVertIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <HumidityCard
                    humidity={cityData.weather.main.humidity}
                    color={color}
                  />
                  <PressureCard
                    pressure={cityData.weather.main.pressure}
                    color={color}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                  }}
                >
                  <CloudCard
                    cloudiness={cityData.weather.clouds.all}
                    color={color}
                  />
                  <PrecCard
                    prec={cityData.forecastWeather.data[0].pop}
                    rain={cityData.forecastWeather.data[0].precip}
                    snow={cityData.forecastWeather.data[0].snow}
                    color={color}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <SunLocationIcon
                    sunrise={cityData.forecastWeather.data[0].sunrise_ts}
                    sunset={cityData.forecastWeather.data[0].sunset_ts}
                    time={cityData.weather.dt}
                    color={color}
                  />
                  <MoonLocationCard
                    moonrise={cityData.forecastWeather.data[0].moonrise_ts}
                    moonset={cityData.forecastWeather.data[1].moonset_ts}
                    time={cityData.weather.dt}
                    color={color}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <WindDirCard
                    wind_dir={cityData.weather.wind.deg}
                    wind_speed={cityData.weather.wind.speed}
                    color={color}
                  />
                  <MoonPhaseCard
                    moon_phase_lunation={
                      cityData.forecastWeather.data[0].moon_phase_lunation
                    }
                    latitude={cityData.weather.coord.lat}
                    color={color}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </>
    );
  };
  const { setIsOpen } = useTour();
  useEffect(() => {
    setIsOpen(true); // Start tour on mount
  }, [setIsOpen]);
  return (
    <div>
      <SearchAppBar onSearch={handleAddCity} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "flex-start",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        {renderCityCards()}
      </Box>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => {
          setMenuAnchorEl(null);
          setMenuCity(null);
        }}
      >
        <MenuItem
          onClick={() => {
            if (menuCity) handleRemoveCity(menuCity);
            setMenuAnchorEl(null);
            setMenuCity(null);
          }}
          sx={{ color: "red" }}
        >
          Şehri Kaldır
        </MenuItem>
      </Menu>

      <Box
        className="subsub-second-step"
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
        {citiesData[primaryCity]?.forecastWeather && (
          <WeeklyForecastCard
            forecastDays={citiesData[primaryCity].forecastWeather.data
              .slice(0, 7)
              .map((day: any) => ({
                date: day.datetime,
                weather: day.weather.description,
                maxTemp: day.max_temp,
                minTemp: day.min_temp,
              }))}
            onDayClick={(date) => handleDayClick(date)}
          />
        )}

        {selectedHourlyTemps && (
          <TemperatureLineChart
            series={[
              {
                data: selectedHourlyTemps,
                color: "#F582F1",
                valueFormatter: (v: number) => `${Math.round(v)}°C`,
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
}

export default App;
