import React, { useEffect, useState } from 'react';
import ShareCodeContext from '.';
import UserService from 'services/UserService';
import { responseIsOk } from 'helpers/request';
import useAlertControl from 'hooks/userAlertControl';
import { type CodeCouple } from 'models/User.interface';

interface Props {
  children: React.ReactNode;
}

export default function ShareCodeProvider({
  children
}: Props): React.JSX.Element {
  const { openAlert } = useAlertControl();
  const [coupleCode, setCoupleCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getCoupleCode = async (): Promise<void> => {
    setLoading(true);
    const userService = new UserService();
    const response = await userService.generateCoupleCode();
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      return;
    }
    const user = response.data as CodeCouple;
    setCoupleCode(user.temp_couple_code);
    setLoading(false);
  };

  useEffect(() => {
    void getCoupleCode();
  }, []);

  return (
    <ShareCodeContext.Provider value={{ coupleCode, loading }}>
      {children}
    </ShareCodeContext.Provider>
  );
}
