import { AlertAction, AlertActionTypes } from "../actions/AlertActions";
import { Alert } from "../models/AlertModel";
import { v4 as uuidv4 } from 'uuid';

export const AlertReducer = (state: Alert[], action: AlertAction) => {

  const { payload } = action;

  switch (action.type) {
    case AlertActionTypes.ADD_ALERT:
      return [
        ...state,
        {
          ...payload,
          id: uuidv4()
        }
      ]
    case AlertActionTypes.REMOVE_ALERT: {
      return state.filter((alert) => alert.id !== payload.id);
    }
    default:
      return state;
  }
}