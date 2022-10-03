import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Splash from "./screens/Splash";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ViewMovie from "./screens/ViewMovie";
import MyList from "./screens/MyList";
import { LogBox } from "react-native";
import SearchScreen from "./screens/SearchScreen";

LogBox.ignoreLogs(['Warning:...']);
LogBox.ignoreAllLogs();


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function App() {
  function BottomStack() {
    return (
      <Tab.Navigator
        screenOptions={{
        headerShown:false,  
          tabBarActiveTintColor:'#E50914',
          tabBarStyle:{
            backgroundColor:'#000000'
          }
        
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign
                name="home"
                color={color}
                size={24}
                style={{ marginBottom: -10 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Coming Soon"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="video-library"
                color={color}
                size={24}
                style={{ marginBottom: -10 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Downloads"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign
                name="download"
                color={color}
                size={24}
                style={{ marginBottom: -10 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const screenOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              gestureEnabled: true,
              animationEnabled: true,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              gestureEnabled: true,
              animationEnabled: true,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen name="BottomStack" component={BottomStack} />
          <Stack.Screen name="ViewMovie" component={ViewMovie} />
          <Stack.Screen name="MyList" component={MyList} />
          <Stack.Screen name="Search" component={SearchScreen} />

          <Stack.Screen name="Splash" component={Splash} />
          
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
