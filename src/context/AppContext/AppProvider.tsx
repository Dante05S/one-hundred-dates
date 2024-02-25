import React, { useState } from 'react';
import AppContext from '.';
import { type UserCouple } from 'models/User.interface';

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props): React.JSX.Element {
  const [user, setUser] = useState<UserCouple | null>(null);

  const onChangeUser = (value: UserCouple | null): void => {
    setUser(value);
  };

  return (
    <AppContext.Provider value={{ user, onChangeUser }}>
      {children}
    </AppContext.Provider>
  );
}
