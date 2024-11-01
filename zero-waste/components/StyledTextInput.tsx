import { Text, TextInput, View } from 'react-native';
import React from 'react';

interface StyledTextInputProps {
  label: string;
  [key: string]: any;
}

export default function StyledTextInput({
  label,
  ...props
}: StyledTextInputProps) {
  return (
    <View className="max-w-xs w-full flex gap-1">
      <Text className="text-sm text-left">{label}</Text>
      <TextInput
        {...props}
        className="h-14 max-w-xs mx-auto w-full border rounded-md p-4"
      />
    </View>
  );
}
