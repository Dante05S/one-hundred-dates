import React, { useEffect, useState } from 'react';
import CoupleCodeContext from '.';
import {
  type DataEvent,
  type PusherEventCustom,
  subscribe,
  unsubscribe
} from 'utils/pusher';
import useApp from 'hooks/useApp';
import { EventsPusher } from 'enums/events-pusher';
import useAlertControl from 'hooks/userAlertControl';
import { router } from 'expo-router';
import { type Couple } from 'models/Couple.interface';

interface Props {
  children: React.ReactNode;
}

export default function CoupleCodeProvider({
  children
}: Props): React.JSX.Element {
  const [inputCode, setInputCode] = useState<string>('');
  const { user, onChangeUser } = useApp();
  const { handleErrorPusher } = useAlertControl();

  const handleInputCode = (value: string): void => {
    setInputCode(value);
  };

  const redirect = (event: PusherEventCustom): void => {
    const data = JSON.parse(event.data) as DataEvent<{ couple: Couple }>;

    const updateUser = Object.assign({}, user, {
      type_couple: 'b',
      couple: data.message.couple
    });

    onChangeUser(updateUser);
    router.replace('/couple-data');
  };

  const handleEventPusher = async (): Promise<void> => {
    if (user !== null) {
      await subscribe(
        `USER_${user.id}`,
        [
          {
            condition: (event) => event === EventsPusher.CONNECT_COUPLE,
            callback: redirect
          }
        ],
        handleErrorPusher
      );
    }
  };

  useEffect(() => {
    void handleEventPusher();
    return () => {
      if (user !== null) void unsubscribe(`USER_${user.id}`);
    };
  }, []);

  return (
    <CoupleCodeContext.Provider
      value={{ inputCode, onInputCode: handleInputCode }}
    >
      {children}
    </CoupleCodeContext.Provider>
  );
}
