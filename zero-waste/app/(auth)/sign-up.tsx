import {
  Button,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import StyledTextInput from '@/components/StyledTextInput';

function Page() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useClerk();
  const [data, setData] = React.useState<any>(null);
  const onSubmit = (data: any) => {
    console.log(data);
    setData(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView className="flex-1 items-center w-screen justify-center gap-3">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledTextInput
              label="First Name"
              placeholder="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
          defaultValue={user?.firstName}
        />
        {errors.firstName && <Text>This field is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledTextInput
              label="Last Name"
              placeholder="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
          defaultValue={user?.lastName}
        />
        {errors.lastName && <Text>This field is required.</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <View>
          <Text>{data ? JSON.stringify(data) : null}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Page;
