import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function RootLayout() {
  return(
      <SafeAreaView
          className={'flex-1'}
      >
        <StatusBar translucent={true} backgroundColor={'#221f3d'} barStyle={'light-content'}  />
        <Stack screenOptions={{headerShown: false}} />


      </SafeAreaView>
     )
}

