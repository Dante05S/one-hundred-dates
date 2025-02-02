import ShareCodeContext, {
  type ShareCodeState
} from 'context/ShareCodeContext';
import { useContext } from 'react';

export default function useShareCode(): ShareCodeState {
  return useContext(ShareCodeContext);
}
