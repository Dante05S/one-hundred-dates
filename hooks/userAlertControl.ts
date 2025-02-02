import AlertControlContext, {
  type AlertControlState
} from 'context/AlertControlContext';
import { useContext } from 'react';

export default function useAlertControl(): AlertControlState {
  return useContext(AlertControlContext);
}
