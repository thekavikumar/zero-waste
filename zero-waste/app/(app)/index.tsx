import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';

function Page() {
  const { user, signOut } = useClerk();
  const [loading, setLoading] = React.useState(false);
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(process.env.EXPO_PUBLIC_BACKEND_URL);
        setLoading(true);
        const res = await axios
          .get(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/${user?.emailAddresses[0].emailAddress}`
          )
          .then((res) => res);

        const data = await res.data;
        console.log('data: ', data);
        if (res.status === 404) {
          router.push('/(auth)/sign-up');
          setLoading(false);
        }
      } catch (err) {
        if ((err as AxiosError)?.response?.status === 404) {
          router.push('/(auth)/sign-up');
        }
      }
    };
    fetchUser();
    console.log('user fetched');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1 }} className="items-center justify-center">
          <AntDesign
            name="loading1"
            size={24}
            color="black"
            className="animate-spin"
          />
        </View>
      ) : (
        <View>
          <Text>Welcome, {user?.firstName}</Text>
          <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text>
          <Button
            title="Sign Out"
            onPress={() => {
              signOut().then(() => {
                <Redirect href="/(auth)/welcome" />;
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Page;
