import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)

const colorText={
  textLight: ' text-white',
  textDark: ' text-black',
};
const colorComponent={
  componentDark: ' bg-gray-700',
  componentLight: ' bg-gray-200',
  borderLight: ' border-gray-200',
  componentBG: ' bg-gray-600',
};

interface InputProps {
    label: string;
    value: string;
    action: any;
}

export default function Input ({label, value, action}:InputProps) {
  return (
    <StyledView className={'flex h-max flex-row p-1 border-2'+colorComponent.borderLight+colorComponent.componentDark}>

    <StyledView className={'flex w-24 justify-center items-center'+colorComponent.componentBG}>
      <StyledText className={'text-1xl'+colorText.textLight}>{label}</StyledText>
    </StyledView>

    <StyledView className={'w-1 h-full'+colorComponent.componentLight}></StyledView>
    
    <StyledView className='flex-1 m-2 flex-col justify-center'>
      <StyledTextInput className={'text-1xl p-1'+colorText.textLight+colorComponent.componentBG} onChangeText={action} value={value}/>
    </StyledView>
    
    </StyledView>
  );
}