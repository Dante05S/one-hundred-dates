import {
  Pusher,
  type PusherEvent
} from '@pusher/pusher-websocket-react-native';
import { type EventsPusher } from 'enums/events-pusher';

export interface PusherEventCustom
  extends Omit<PusherEvent, 'eventName' | 'data'> {
  eventName: EventsPusher;
  data: string;
}

export interface DataEvent<T> {
  message: T;
}

const pusher = Pusher.getInstance();

export const subscribe = async (
  channelName: string,
  events: Array<{
    condition: (eventName: EventsPusher) => boolean;
    callback: (event: PusherEventCustom) => void;
  }>,
  onSubscriptionError?: (channelName: string, message: string, e: any) => void
): Promise<void> => {
  await pusher.init({
    apiKey: process.env.EXPO_PUBLIC_PUSHER_KEY ?? '',
    cluster: process.env.EXPO_PUBLIC_PUSHER_CLUSTER ?? ''
  });
  await pusher.connect();
  await pusher.subscribe({
    channelName,
    onEvent: (event: PusherEvent) => {
      events.forEach((eventHandler) => {
        if (eventHandler.condition(event.eventName as EventsPusher)) {
          eventHandler.callback(event as PusherEventCustom);
        }
      });
    },
    onSubscriptionError
  });
};

export const unsubscribe = async (channelName: string): Promise<void> => {
  await pusher.unsubscribe({ channelName });
};
