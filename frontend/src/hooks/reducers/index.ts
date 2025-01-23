import { ActionTypes, Actions } from "../actions";
import { TimeSerie, WeatherState } from "../../types/types";
import { parseWeatherState } from "../../utils/parseDetailedWeather";

const getHour = (timeSeries: TimeSerie[], index: number) => {
  if (index >= 0 && index < timeSeries.length) {
    return timeSeries[index].validHour;
  } else {
    return null;
  }
};

export default function reducer(state: WeatherState, action: Actions) {
  switch (action.type) {
    case ActionTypes.INCREMENT_TIME: {
      const prevHour = getHour(action.payload, state.index);
      const nextHour = getHour(action.payload, state.index + 2);

      return parseWeatherState(
        action.payload[state.index + 1],
        state.index + 1,
        prevHour,
        nextHour
      );
    }
    case ActionTypes.DECREMENT_TIME: {
      const prevHour = getHour(action.payload, state.index - 2);
      const nextHour = getHour(action.payload, state.index);
      return parseWeatherState(
        action.payload[state.index - 1],
        state.index - 1,
        prevHour,
        nextHour
      );
    }

    case ActionTypes.SET_TIME: {
      const prevHour = getHour(
        action.payload.timeSeries,
        action.payload.index - 1
      );
      const nextHour = getHour(
        action.payload.timeSeries,
        action.payload.index + 1
      );

      return parseWeatherState(
        action.payload.timeSeries[action.payload.index],
        action.payload.index,
        prevHour,
        nextHour
      );
    }

    default:
      return state;
  }
}
