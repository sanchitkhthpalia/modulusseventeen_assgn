import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const nav = useNavigation<any>();
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        <Text>Email: {user?.email}</Text>
        <Button onPress={logout}>Logout</Button>
      </View>
    </View>
  );
}


