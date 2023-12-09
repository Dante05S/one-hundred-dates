/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export interface CoupleCodeState {
  inputCode: string;
  onInputCode: (value: string) => void;
}

const initState: CoupleCodeState = {
  inputCode: '',
  onInputCode: (value: string) => {}
};

const CoupleCodeContext = createContext<CoupleCodeState>(initState);

export default CoupleCodeContext;
