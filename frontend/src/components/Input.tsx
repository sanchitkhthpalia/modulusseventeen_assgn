import React from 'react';
import { TextInput } from 'react-native-paper';

export default function Input(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput mode="outlined" {...props} />;
}


