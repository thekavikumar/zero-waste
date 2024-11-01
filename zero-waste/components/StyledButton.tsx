import { Button, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { cn } from '@/utils/lib';

interface StyledButtonProps {
  children: React.ReactNode;
  className?: string;
  onPress: () => void;
}

export default function StyledButton({
  children,
  className,
  onPress,
}: StyledButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        className,
        'max-w-xs w-full p-4 bg-green-400 items-center rounded-md'
      )}
    >
      {children}
    </TouchableOpacity>
  );
}
