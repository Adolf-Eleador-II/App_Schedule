import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { DayOfWeekName } from '../Lesson'

import SelectDropdown from 'react-native-select-dropdown';
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

interface SelectProps {
  label?: string;
  options: string[];
  defaultIndex?: number;
  action: (index: number) => void;
}


export function Select({ options, defaultIndex = 0, action }: SelectProps) {
  return (
    <StyledView className='flex flex-row border-2 border-gray-200'>
        <SelectDropdown
          renderButton={(selectedItem, isOpened) => _renderButton(selectedItem, isOpened)}
          renderItem={(item, index, isSelected) => _renderItem(item, index, isSelected)}
          data={options}
          defaultValueByIndex={defaultIndex}
          onSelect={(selectedItem, index) => { action(index) }}
        />
    </StyledView>
  );
}

export function SelectParameter({ label, options, defaultIndex = 0, action }: SelectProps) {
  return (
    <StyledView className='flex flex-row p-1 border-2 border-gray-200 bg-gray-700'>
      <StyledView className='flex w-24 justify-center items-center bg-gray-600'>
        <StyledText className='text-1xl text-white'>{label}</StyledText>
      </StyledView>

      <StyledView className='w-1 h-full bg-gray-200'></StyledView>

      <StyledView className='flex-1 m-1'>
        <SelectDropdown
          renderButton={(selectedItem, isOpened) => _renderButton(selectedItem, isOpened)}
          renderItem={(item, index, isSelected) => _renderItem(item, index, isSelected)}
          data={options}
          defaultValueByIndex={defaultIndex}
          onSelect={(selectedItem, index) => { action(index) }}
        />
      </StyledView>
    </StyledView>
  );

}

function _renderButton(selectedItem: any, isOpened: boolean): React.ReactNode {
  return (
    <StyledView>
      <StyledView className='p-1 justify-center items-center bg-gray-600'>
        <StyledText className='text-1xl text-white'>
          {selectedItem}
        </StyledText>
      </StyledView>
    </StyledView>
  );
}

function _renderItem(item: any, index: number, isSelected: boolean): React.ReactNode {
  return (
    <StyledView>
      <StyledView className='flex-1 justify-center items-center bg-gray-600 border-2 border-gray-700'>
        <StyledText className='text-1xl text-white'>{item}</StyledText>
      </StyledView>
    </StyledView>
  );
}
