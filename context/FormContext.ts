import { type Control } from 'react-hook-form/dist/types';
import { type Error } from 'interfaces/error.interface';
import { createContext } from 'react';

export interface FormState {
  errors: Error[];
  control: Control;
}

const FormContext = createContext<FormState | undefined>(undefined);

export default FormContext;
