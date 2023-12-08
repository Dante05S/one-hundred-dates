import ToastControlContext, {
  type ToastControlState
} from 'context/ToastControlContext';
import { useContext } from 'react';

export default function useToastControl(): ToastControlState {
  return useContext(ToastControlContext);
}
