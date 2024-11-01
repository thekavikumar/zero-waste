import { Text, TextInput, View } from 'react-native';
import React from 'react';
import { cn } from '@/utils/lib';

interface StyledTextInputProps {
  label?: string;
  className?: string;
  [key: string]: any;
}

export default function StyledTextInput({
  label,
  className,
  ...props
}: StyledTextInputProps) {
  return (
    <View className="max-w-xs w-full flex gap-1">
      {label && <Text className="text-sm text-left">{label}</Text>}
      <TextInput
        {...props}
        className={cn(
          className,
          'h-14 max-w-xs mx-auto w-full border rounded-md p-4'
        )}
      />
    </View>
  );
}
