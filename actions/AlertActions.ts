import { Alert } from "../models/AlertModel";

// Type of Actions allowed
export enum AlertActionTypes {
  ADD_ALERT = "ADD_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT"
}

// The data type of the action object.
// Usually, we only send the whole data in Add, and only a unique identifier in other actions
// But we'll ignore that in this example
export type AlertAction = {
  type: AlertActionTypes;
  payload?: Alert;
};

// Action Generator for ADD
export const addAlert = (alert: Alert) => {
  return {
    type: AlertActionTypes.ADD_ALERT,
    payload: alert
  };
};

// Action Generator for Remove
export const removeAlert = (alert: Alert) => {
  return {
    type: AlertActionTypes.REMOVE_ALERT,
    payload: alert
  };
};