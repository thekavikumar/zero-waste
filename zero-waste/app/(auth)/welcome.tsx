import SignInWithOAuth from '@/components/SignInWithOAuth';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Page() {
  const { userId } = useAuth();
  if (userId) {
    return <Redirect href="/(app)" />;
  }
  return (
    <SafeAreaView>
      <View className="h-screen flex items-center justify-center">
        <Text>Welcome to the app!</Text>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
}

export default Page;
