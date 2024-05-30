import React from 'react';
import { View, Text, TextInput } from 'react-native';

// import { Select } from "native-base";
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)

interface InputProps {
    label: string;
    value: string;
    action: (value: string) => void;
  }
  
  export function InputParameter({ label, value, action }: InputProps) {
    return (
      <StyledView className='flex h-max flex-row p-1 border-2 border-gray-200 bg-gray-700'>
  
        <StyledView className='flex w-24 justify-center items-center bg-gray-600'>
          <StyledText className='text-1xl text-white'>{label}</StyledText>
        </StyledView>
  
        <StyledView className='w-1 h-full bg-gray-200'></StyledView>
  
        <StyledView className='flex-1 m-1'>
          <StyledTextInput className='text-1xl p-1 text-white bg-gray-600' onChangeText={(value) => action(value)} value={value} />
        </StyledView>
  
      </StyledView>
    );
  }