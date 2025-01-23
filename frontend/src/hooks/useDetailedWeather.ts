import { useReducer } from "react";
import { TimeSerie } from "../types/types";
import { parseWeatherState, getHour } from "../utils/parseDetailedWeather";
import { INITIAL_WEATHER_STATE } from "../assets/detailedWeather";
import reducer from "./reducers";
import { ActionTypes } from "./actions";

export default function useDetailedWeather(timeSeries: TimeSerie[]) {
  function initializeWeatherState() {
    const nextHour = getHour(timeSeries, 1);
    return parseWeatherState(timeSeries[0], 0, null, nextHour);
  }
  const [state, dispatch] = useReducer(
    reducer,
    INITIAL_WEATHER_STATE,
    initializeWeatherState
  );

  const getNextHour = () => {
    if (state.index < timeSeries.length - 1) {
      dispatch({ type: ActionTypes.INCREMENT_TIME, payload: timeSeries });
    }
  };
  const getPrevHour = () => {
    if (state.index !== 0) {
      dispatch({ type: ActionTypes.DECREMENT_TIME, payload: timeSeries });
    }
  };
  const setHour = (hour: number) => {
    if (hour > 0 && hour < timeSeries.length - 1) {
      dispatch({
        type: ActionTypes.SET_TIME,
        payload: { timeSeries, index: hour },
      });
    }
  };
  return {
    weather: state.weather,
    wind: state.wind,
    humidity: state.humidity,
    pressure: state.pressure,
    validHour: state.validHour,
    validDate: state.validDate,
    getNextHour,
    getPrevHour,
    setHour,
    prevHour: state.prevHour,
    nextHour: state.nextHour,
  };
}
