import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { DayOfWeekName } from '../Lesson'

import ModalDropdown from "react-native-modal-dropdown";
import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

interface SelectProps {
  label: string;
  options: string[];
  defaultIndex?: number;
  action: (index: number) => void;
}

export function Select({ label, options, defaultIndex = 0, action }: SelectProps) {
  let dropdown: any;
  return (
    <StyledView className='flex h-max flex-row p-1 border-2 border-gray-200 bg-gray-700'>
      <StyledView className='flex w-24 justify-center items-center bg-gray-600'>
        <StyledText className='text-1xl text-white'>{label}</StyledText>
      </StyledView>
      <StyledView className='w-1 h-full bg-gray-200'></StyledView>

      <StyledView className='flex-1 m-2 flex-col justify-center'>
        <ModalDropdown
          ref={el => dropdown = el}
          defaultValue={options[defaultIndex]}
          defaultIndex={defaultIndex}
          style={styles.dropdown}
          textStyle={styles.dropdown_text}
          dropdownStyle={styles.dropdown_dropdown}
          options={options}
          renderButtonText={_renderButtonText}
          renderRow={_renderRow}
          renderSeparator={(selectionID, rowID, adjacentRowHighlighted) => _renderSeparator(selectionID, rowID, adjacentRowHighlighted)}
          isFullWidth={true}
          onSelect={(rowID) => action(+rowID)}
          // onDropdownWillShow={ () => dropdown.show() }
          // onDropdownWillHide={ () => dropdown.hide() }
        />
      </StyledView>
    </StyledView>
  );

  function _renderButtonText(text: any): string {
    return (
      text
    );
  }

  function _renderRow(option: string, index: string, isSelected: boolean): ReactNode {
    return (
      <StyledView className='flex-1 p-2 justify-center items-center bg-gray-600'>
        <StyledText className='text-1xl text-white'>{option}</StyledText>
      </StyledView>
    );
  }

  function _renderSeparator(selectionID: string, rowID: string, adjacentRowHighlighted: boolean): React.ReactNode {
    if (+rowID == options.length - 1) return;
    const key = `spr_${+rowID}`;
    return (<StyledView className='h-px bg-gray-200'
      key={key}
    />);
  }
}



const styles = StyleSheet.create({
  dropdown: {
    textAlign: 'center',
    backgroundColor: '#4b5563',
  },
  dropdown_text: {
    flex: 1,
    padding: 4,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  dropdown_dropdown: {
    minHeight: 10,
    borderColor: '#e5e7eb',
    padding: 1,
  }, 
});