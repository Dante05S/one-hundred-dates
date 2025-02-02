import ProtectedRoute from 'components/ProtectedRoute';
import { Slot } from 'expo-router';
import React from 'react';

export default function AppLayout(): React.JSX.Element {
  return (
    <ProtectedRoute
      redirect="/login"
      validate={{ type: 'session', validateOpen: true }}
    >
      <Slot />
    </ProtectedRoute>
  );
}
