import React, { ReactNode } from 'react';
import { View, Pressable, Text } from 'react-native';

// import { Select } from "native-base";
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)


interface ButtonTextProps {
  name: string;
  onPress: () => void;
}

export function ButtonText({ name, onPress: action }: ButtonTextProps): ReactNode {
  return (
    <Pressable onPress={action}>
      <StyledView className='border-2 p-1 border-gray-200'>
        <StyledText className='text-base text-center text-white'>{name}</StyledText>
      </StyledView>
    </Pressable>
  )
}

interface ButtonProps {
  children?: ReactNode;
  onPress: () => void;
}

export function Button({ children, onPress: action }: ButtonProps): ReactNode {
  return (
    <Pressable onPress={action}>
      <StyledView className='border-2 p-1 border-gray-200'>
        { children }
      </StyledView>
    </Pressable>
  )
}
