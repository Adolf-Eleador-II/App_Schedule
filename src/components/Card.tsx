import { View, Pressable, Text } from 'react-native';

import { styled } from 'nativewind';
import { Lesson } from '../page/SchedulePage';
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
};

interface CardProps {
    lesson: Lesson;
    action: () => void;
}

export default function Card({lesson, action}:CardProps) {
  return (
    // style={[styles.buttonContainer, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}
    <Pressable onPress={action}>
      <StyledView className={'flex h-max flex-row p-1 border-2'+colorComponent.borderLight+colorComponent.componentDark}>

        <StyledView className='flex w-10 m-2 flex-col justify-center items-center'>
          <StyledText className={'flex text-3xl p-2'+colorText.textLight+colorComponent.componentBG}>{lesson.period}</StyledText>
          <StyledText className={'text-1xl'+colorText.textLight}>{lesson.time[0]}</StyledText>
          <StyledText className={'text-1xl'+colorText.textLight}>{lesson.time[1]}</StyledText>
        </StyledView>

        <StyledView className={'w-1 h-full'+colorComponent.componentLight}></StyledView>
        
        <StyledView className='flex-1 m-2 flex-col justify-center'>
          <StyledText className={'flex-1 text-lg p-1'+colorText.textLight+colorComponent.componentBG}>{lesson.name}</StyledText>
          <StyledView className='flex flex-row p-1 justify-between'>
            <StyledText className={'text-1xl'+colorText.textLight}>{lesson.auditorium}</StyledText>
            <StyledText className={'text-1xl'+colorText.textLight}>{lesson.teacher}</StyledText>
          </StyledView>
        </StyledView>
      
      </StyledView>
    </Pressable>
  );
}
