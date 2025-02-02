import { useContext } from 'react';
import ThemeContext, {
  type ThemeState
} from 'context/ThemeContext/ThemeContext';

export default function useTheme(): ThemeState {
  return useContext(ThemeContext);
}
