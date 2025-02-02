import React from 'react';
import { Redirect } from 'expo-router';

export default function Root(): React.JSX.Element | null {
  return <Redirect href="/login" />;
}
