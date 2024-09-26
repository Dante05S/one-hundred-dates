import { Pusher } from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

export const initPusher = async (): Promise<Pusher> => {
  await pusher.init({
    apiKey: '3175fda3028f3d5c6589',
    cluster: 'mt1'
  });
  await pusher.connect();
  return pusher;
};

export const unsubscribe = async (channelName: string): Promise<void> => {
  await pusher.unsubscribe({ channelName });
};
