import { Text, View } from "react-native";
import { usePushNotifications } from "./usePushNotifications";
import { ReactNode } from "react";

import { styled } from 'nativewind';
import { Button } from "../components/Button";
import { AntDesign } from "@expo/vector-icons";
const StyledView = styled(View)
const StyledText = styled(Text)

interface NotificationsPageProps {
  route: any;
  navigation: any;
}

export default function NotificationsPage({ route, navigation }: NotificationsPageProps): ReactNode {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  return (
    <StyledView className='flex-1 flex-col justify-between space-y-3 p-3 border-8 bg-gray-700 border-gray-600'>
      <StyledView className='flex flex-row space-x-2'>
        <Button action={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={19} color='white' /></Button>
        <StyledText className='text-3xl text-white'>Уведомления:</StyledText>
      </StyledView>

      <StyledView className="flex justify-center items-center">
        <StyledText className='text-1xl text-white'>Token: {expoPushToken?.data ?? ""}</StyledText>
        <StyledText className='text-1xl text-white'>Notification: {data}</StyledText>
      </StyledView>

      <StyledView className='flex flex-row justify-between space-x-2'>

      </StyledView>
    </StyledView>
  );
}
