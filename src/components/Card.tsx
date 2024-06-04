import { View, Pressable, Text } from 'react-native';

import { styled } from 'nativewind';
import type { Lesson } from '../Lesson'
import { ReactNode } from 'react';
const StyledView = styled(View)
const StyledText = styled(Text)

interface CardProps {
    lesson: Lesson;
    action: () => void;
}

export default function Card({lesson, action}:CardProps): ReactNode {
  return (
    <Pressable onPress={action}>
      <StyledView className='flex flex-row h-max p-1 border-gray-200 border-2 bg-gray-700'>

        <StyledView className='flex flex-col w-10 m-2 justify-center items-center'>
          <StyledText className='flex text-3xl p-2 text-white bg-gray-600'>{lesson.period}</StyledText>
          <StyledText className='text-1xl text-white'>{lesson.time[0]}</StyledText>
          <StyledText className='text-1xl text-white'>{lesson.time[1]}</StyledText>
        </StyledView>

        <StyledView className='w-1 h-full bg-gray-200'></StyledView>
        
        <StyledView className='flex-1 flex-col m-2 justify-center'>
          <StyledText className='flex-1 text-lg p-1 text-white bg-gray-600'>{lesson.name}</StyledText>
          <StyledView className='flex flex-row p-1 justify-between'>
            <StyledText className='text-1xl text-white'>{lesson.auditorium}</StyledText>
            <StyledText className='text-1xl text-white'>{lesson.teacher}</StyledText>
          </StyledView>
        </StyledView>
      
      </StyledView>
    </Pressable>
  );
}
