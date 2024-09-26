import React, { useEffect, useState } from 'react';
import CoupleCodeContext from '.';
import { initPusher, unsubscribe } from 'utils/pusher';
import useApp from 'hooks/useApp';
import { type PusherEvent } from '@pusher/pusher-websocket-react-native';

interface Props {
  children: React.ReactNode;
}

export default function CoupleCodeProvider({
  children
}: Props): React.JSX.Element {
  const [inputCode, setInputCode] = useState<string>('');
  const { user } = useApp();

  const handleInputCode = (value: string): void => {
    setInputCode(value);
  };

  const handleEventPusher = async (): Promise<void> => {
    if (user !== null) {
      const pusher = await initPusher();
      await pusher.subscribe({
        channelName: `USER_${user.id}`,
        onEvent: (event: PusherEvent) => {
          console.log(event);
        }
      });
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
