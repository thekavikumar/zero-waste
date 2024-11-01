import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import StyledTextInput from '@/components/StyledTextInput';
import { CountryPicker } from 'react-native-country-codes-picker';
import StyledButton from '@/components/StyledButton';
import axios from 'axios';

function Page() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  const { user } = useClerk();

  const [data, setData] = React.useState<any>(null);
  const [countryCode, setCountryCode] = React.useState('+91'); // default to India code
  const [isPickerVisible, setPickerVisible] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: '',
    },
  });

  const onSubmit = async (formData: any) => {
    // Concatenate country code with phone number for final data
    const formattedData = {
      ...formData,
      phoneNumber: `${countryCode}${formData.phoneNumber}`,
      email: user?.emailAddresses[0].emailAddress,
    };
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/register`,
        formattedData
      );
      if (response.status === 201) {
        ToastAndroid.show('Signed up successfully!', ToastAndroid.SHORT);
        router.push('/(app)');
      }
    } catch (error) {
      console.error('Error submitting form data: ', error);
    }
    // console.log(formattedData);
    // setData(formattedData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView className="flex-1 items-center w-screen justify-center gap-3">
        <Text className="text-2xl font-semibold tracking-wide mb-5">
          Onboarding Form
        </Text>
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
        />
        {errors.lastName && <Text>This field is required.</Text>}

        <View className="flex gap-1">
          <Text className="text-sm text-left">Phone Number</Text>
          <View className="flex-row items-center w-full max-w-xs">
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={{ marginRight: 6 }}
            >
              <StyledTextInput value={countryCode} editable={false} />
            </TouchableOpacity>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[0-9]{10}$/, // Validating a 10-digit phone number
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-14 max-w-xs mx-auto w-full border rounded-md p-4"
                  placeholder="00000 00000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  value={value}
                  style={{ flex: 4 }}
                />
              )}
              name="phoneNumber"
            />
          </View>
        </View>

        {errors.phoneNumber && (
          <Text>Enter a valid 10-digit phone number.</Text>
        )}

        <CountryPicker
          lang="en"
          show={isPickerVisible}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setPickerVisible(false);
          }}
          style={{
            modal: {
              height: 400,
            },
          }}
        />
        <StyledButton onPress={handleSubmit(onSubmit)} className="mt-3">
          <Text className="font-semibold tracking-wide">Submit</Text>
        </StyledButton>

        <View>
          <Text>{data ? JSON.stringify(data) : null}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Page;
