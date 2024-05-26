import React from 'react';
import { View, Text } from 'react-native';

// import { Select } from "native-base";
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

interface SelectProps {
    label: string;
    options: any;
    defaultValue?: number;
  }
  
  export function Select({label, options, defaultValue}: SelectProps) {
    return(
      <StyledView className={'flex h-max flex-row p-1 border-2 border-gray-200 bg-gray-700'}>
  
        <StyledView className={'flex w-24 justify-center items-center bg-gray-600'}>
          <StyledText className={'text-1xl text-white'}>Text 1</StyledText>
        </StyledView>
  
        <StyledView className={'w-1 h-full bg-gray-200'}></StyledView>
  
        <StyledView className='flex-1 m-2 flex-col justify-center'>
          
        
        </StyledView>
  
      </StyledView>
    );
  }
