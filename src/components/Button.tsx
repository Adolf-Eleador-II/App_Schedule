import React from 'react';
import { View, Pressable, Text } from 'react-native';

import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledText = styled(Text)

const colorText={
  textLight: ' text-white',
  textDark: ' text-black',
};
const colorComponent={
  componentDark: ' bg-gray-700',
  componentLight: ' bg-gray-200',
  borderLight: ' border-gray-200',
  componentBG: ' bg-gray-600',
  borderBG: ' border-gray-600',
};

interface ButtonProps {
  label: string;
  action: () => void;
}

export default function Button ({label, action}: ButtonProps) {

  return (
    // style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
    <Pressable onPress={ action }>
      <StyledView className={'p-1 border-2'+colorComponent.borderLight}>
        <StyledText className={'text-1xl'+colorText.textLight}>{label}</StyledText>
      </StyledView>
    </Pressable>
  );
}
