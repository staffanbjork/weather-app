import { Outlet } from "react-router";
import { ContextType } from "../../types/types";
import { useWeatherData } from "../../hooks/useGetWeather";

export default function Weather() {
  const { data } = useWeatherData();
  return (
    <section>
      {/* Weather */}
      <Outlet context={{ data } satisfies ContextType} />
    </section>
  );
}
