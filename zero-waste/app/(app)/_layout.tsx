import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{ headerShown: false }} />;
}
