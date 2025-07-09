type HourlyData = {
  hour: string;
  temp: number;
};

type ForecastDay = {
  date: string;
  hourlyData: HourlyData[];
};
