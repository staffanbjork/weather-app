import { useState, useEffect } from "react";
import axios from "axios";
import {
  Position,
  GeoError,
  GeoData,
  WeatherDataResponse,
  ContextType, FetchConfig
} from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";


/**
 * This function tries to get the clients location through the browsers Navigator API, using geolocation. If geolocation is not available or permisssion declined by client then get the clients coordinates by using the ip-api.com API. When clients coordinates are obtained then fetch the weather forecast for the current location from the SMHI Open Data API.
 * https://opendata.smhi.se/apidocs/
 * @param refetchInterval, sets the interval for automatic refetching.
 * @returns The data object containing the fetched weather data, booleans for error and fetching status and the changeLocation function that sets a new location.
 */
export default function useGetWeather({ refetchInterval }: {refetchInterval: number}) {
  const [geoData, setGeoData] = useState<GeoData>({});
  const changeLocation = (newLocality: GeoData) => {
    setGeoData(newLocality);
  };

  async function getUserDataFromIp() {
    console.log("getUserIp");
    const { data } = await axios.get(
      "http://ip-api.com/json/?fields=status,country,city,lat,lon"
    );
    if (data.status === "success" && data.country === "Sweden") {
      setGeoData({
        locality: data.city,
        longitude: data.lon,
        latitude: data.lat,
      });
    } else {
      console.error("unvalid geodata");
    }
  }
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geoloaction not supported");
      getUserDataFromIp();
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
    function handleSuccess(position: Position) {
      console.log("Geolocation OK!");
      const coords = position.coords;
      setGeoData((prevGeoData) => ({
        ...prevGeoData,
        longitude: coords.longitude.toFixed(6),
        latitude: coords.latitude.toFixed(6),
      }));
    }
    function handleError(error: GeoError) {
      console.error("Error getting geolocation" + error);
      getUserDataFromIp();
    }
  }, []);

  const { data, error, isFetching } = useQuery({
    queryKey: ["weatherData", geoData.longitude, geoData.latitude],
    queryFn: () =>
      getWeatherData({
        method: "GET",
        url: `/api/weather?lon=${geoData.longitude}&lat=${geoData.latitude}${
          geoData.locality ? `&locality=${geoData.locality}` : ""
        }`,
      }),
    enabled: !!geoData.longitude && !!geoData.latitude,
    refetchInterval: refetchInterval,
  });
  const getWeatherData = async (fetchConfig: FetchConfig) => {
    try {
      const { data } = await axios(fetchConfig);

      return data as WeatherDataResponse;
    } catch (error) {
      console.error("Error getting weather data, error: " + error);
    }
  };
  return {data, error, isFetching, changeLocation}
}

export function useWeatherData() {
  return useOutletContext<ContextType>();
}