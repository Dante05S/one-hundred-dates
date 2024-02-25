/* eslint-disable @typescript-eslint/no-empty-function */
import { type UserCouple } from 'models/User.interface';
import { createContext } from 'react';

export interface AppState {
  user: UserCouple | null;
  onChangeUser: (value: UserCouple | null) => void;
}

const initState: AppState = {
  user: null,
  onChangeUser: (value: UserCouple | null) => {}
};

const AppContext = createContext<AppState>(initState);

export default AppContext;
