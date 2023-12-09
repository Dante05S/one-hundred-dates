import CoupleCodeContext, {
  type CoupleCodeState
} from 'context/CoupleCodeContext';
import { useContext } from 'react';

export default function useCoupleCode(): CoupleCodeState {
  return useContext(CoupleCodeContext);
}
