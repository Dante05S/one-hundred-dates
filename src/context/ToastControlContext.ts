/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export interface ToastControlState {
  message: string;
  alertToast: (value: string) => void;
}

const initState: ToastControlState = {
  message: '',
  alertToast: (value: string) => {}
};

const ToastControlContext = createContext<ToastControlState>(initState);

export default ToastControlContext;
