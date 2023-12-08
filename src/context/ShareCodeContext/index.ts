import { createContext } from 'react';

export interface ShareCodeState {
  coupleCode: string;
  loading: boolean;
}

const initState: ShareCodeState = {
  coupleCode: '',
  loading: true
};

const ShareCodeContext = createContext<ShareCodeState>(initState);

export default ShareCodeContext;
