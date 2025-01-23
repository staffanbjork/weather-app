import { useEffect, useState } from "react";
import axios from "axios";
import { GeoData, Locality } from "../types/types";

type UseLocalityQueryProps = {
  changeLocation: (geoData: GeoData) => void;
  delay: number;
};


export default function useLocalityQuery({ delay = 500, changeLocation }: UseLocalityQueryProps){
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Locality[]>([]);
  const [debouncedValue, setDebouncedValue] = useState("")
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
    }
  }
  const handleOnClick = (location: Locality) => {
    changeLocation({locality: location, longitude: location.longitude, latitude: location.latitude})
    setQuery("");
    setResults([]);
  }
  useEffect(() => {
    const localityQuery = async () => {
      if (!(debouncedValue.length > 2)) {
        return;
      }
      try {
        const lowerCaseLocation = debouncedValue.toLowerCase();
        const queryString = lowerCaseLocation[0].toUpperCase() + lowerCaseLocation.slice(1);
        const { data } = await axios.get(
          `/api/location?location=${queryString}`
        );
        setResults(data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    localityQuery();
  }, [debouncedValue])
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);
    return () => {
      clearTimeout(timer)
    }
  }, [query, delay]);
  return { handleInputChange, handleOnClick, query, results};
}