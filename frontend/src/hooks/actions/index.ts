import { TimeSerie } from "../../types/types";


export enum ActionTypes {
  INCREMENT_TIME = "INCREMENT_TIME",
  DECREMENT_TIME = "DECREMENT_TIME",
  SET_TIME = "SET_TIME",
}

export type IncrementTimeAction = {
  type: ActionTypes.INCREMENT_TIME;
  payload: TimeSerie[];
}
export type DecrementTimeAction = {
  type: ActionTypes.DECREMENT_TIME;
  payload: TimeSerie[];
}
export type SetTimeAction = {
  type: ActionTypes.SET_TIME;
  payload: {
    timeSeries: TimeSerie[];
    index: number;
  }
}


export type Actions = IncrementTimeAction | DecrementTimeAction | SetTimeAction;
