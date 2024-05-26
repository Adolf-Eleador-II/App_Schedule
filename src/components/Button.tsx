import React, { ReactNode } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';

// import { Select } from "native-base";
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)


interface ButtonTextProps {
  name: string;
  action: () => void;
}

export function ButtonText({ name, action }: ButtonTextProps) {
  return (
    <Pressable onPress={action}>
      <StyledView className={'p-1 border-2 border-gray-200'}>
        <StyledText className={'text-1xl text-center text-white'}>{name}</StyledText>
      </StyledView>
    </Pressable>
  )
}

interface ButtonProps {
  children?: ReactNode;
  action: () => void;
}

export function Button({ children, action }: ButtonProps) {
  return (
    <Pressable onPress={action}>
      <StyledView className={'p-1 border-2 border-gray-200 '}>
        {children}
      </StyledView>
    </Pressable>
  )
}
