import AppContext, { type AppState } from 'context/AppContext';

import { useContext } from 'react';
export default function useApp(): AppState {
  return useContext(AppContext);
}
