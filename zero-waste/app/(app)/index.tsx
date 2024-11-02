import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        console.log('backend url: ', process.env.EXPO_PUBLIC_BACKEND_URL);
        setLoading(true);
        const res = await axios
          .get(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/${user?.emailAddresses[0].emailAddress}`
          )
          .then((res) => res);

        const data = await res.data;
        if (
          data?.isNewUser == true ||
          data?.isNewUser == undefined ||
          data?.isNewUser == null
        ) {
          router.push('/(auth)/sign-up');
        }
        console.log('data: ', data);
        setLoading(false);
      } catch (err) {
        if ((err as AxiosError)?.response?.status === 404) {
          setLoading(false);
          router.push('/(auth)/sign-up');
        }
      }
    };
    fetchUser();
    console.log('user fetched');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && (
        <View style={{ flex: 1 }} className="items-center justify-center">
          <AntDesign
            name="loading1"
            size={24}
            color="black"
            className="animate-spin"
          />
        </View>
      )}
      {!loading && (
        <View style={{ flex: 1 }} className="items-center justify-center">
          <Image
            source={{ uri: user?.imageUrl }}
            className="h-[100px] w-[100px] rounded-full"
          />
          <Text className="text-2xl">Welcome, {user?.firstName}!</Text>
          <Button
            title="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Page;
