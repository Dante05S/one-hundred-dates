import React from 'react';
import { Redirect } from 'expo-router';

export default function Date(): React.JSX.Element | null {
  return <Redirect href="/login" />;
}
