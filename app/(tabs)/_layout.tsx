import React from "react";
import {View, Text, ImageBackground,Image} from "react-native";
import { Tabs } from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {extractedProps} from "react-native-svg";

const TabIcon =({focused,icon,title}:any)=>{
    if(focused){
        return(
            <ImageBackground
                source={images.highlight}
                className='flex flex-row items-center justify-center w-full flex-1 min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden'>
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
            </ImageBackground>
        )
    }else{
        return(
            <View className='size-full justify-center items-center mt-4 rouded-full'>
                <Image source={icon} tintColor="#A8B5DB" className="size-5" />
            </View>
        )
    }

}

const Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        tabBarStyle:{
            backgroundColor: "#0f0D23",
            //backgroundColor:'white',
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height:52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0D23",
        }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
            tabBarIcon: ({ focused }) => (
                    <TabIcon
                    focused={focused}
                    icon={icons.home}
                    title="Home"/>
          ),
        }}
      />
      <Tabs.Screen name="Profile" options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.person}
                  title="Profile"/>
          ), }} />
      <Tabs.Screen name="Save" options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.save}
                  title="Saved"/>
          ), }} />
      <Tabs.Screen name="Search" options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.search}
                  title="Search"/>
          ), }} />
    </Tabs>
  );
};
export default Layout;
