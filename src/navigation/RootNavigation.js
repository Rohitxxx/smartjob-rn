import { StyleSheet, } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/bottomTabScreens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import InterView from '../screens/bottomTabScreens/InterView';
import Colors from '../constants/Colors';
import Resume from '../screens/bottomTabScreens/Resume';
import Account from '../screens/bottomTabScreens/Account';
import Search from '../screens/bottomTabScreens/Search';
import StartingAppOnboarding from '../screens/onboardingScreen/StartingAppOnboarding';
import SignUpScreen from '../screens/authScreens/SignUpScreen';
import OtpVerification from '../screens/authScreens/OtpVerification';
import JobDetails from '../screens/JobDetails';
import FavouriteJobs from '../screens/FavouriteJobs';
import Notifications from '../screens/Notifications';
import CreateResume from '../screens/createResume/CreateResume';
import PhoneSignIn from '../screens/authScreens/PhoneSignIn';
import PersonalDetails from '../screens/compulsaryDetails/PersonalDetails';
import InterestedIn from '../screens/compulsaryDetails/InterestedIn';
import SearchedJob from '../screens/SearchedJob';
import { UserContext } from '../Context/Contex';
function HomeNavigation() {
    const BottomTab = createBottomTabNavigator();
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                // tabBarStyle: { backgroundColor: 'white',elevation:5 },
                tabBarActiveTintColor: 'black',
                
            }}>
            <BottomTab.Screen name='homeMain' component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicon name='home-outline' color={color} size={size} />,
                    title: 'Jobs'
                }}
            />
            <BottomTab.Screen name='interview' component={InterView}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicon name='people-outline' color={color} size={size} />,
                    title: 'InterView',
                    unmountOnBlur: true
                }} />
            <BottomTab.Screen name='search' component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicon name='search-outline' color={color} size={size} />,
                    title: 'Search'
                }} />
            <BottomTab.Screen name='resume' component={Resume}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicon name='document-text-outline' color={color} size={size} />,
                    title: 'Resume',
                    unmountOnBlur: true // this will cause screen to reload everytime

                }} />
            <BottomTab.Screen name='account' component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicon name='person-outline' color={color} size={size} />,
                    title: 'My Account'
                }} />
        </BottomTab.Navigator>
    );
}
const RootNavigation = () => {
    const Stack = createNativeStackNavigator();
    const { user, getUserFromServer } = useContext(UserContext);
    useEffect(() => {
        console.log('local user in rootnavigation', user);
        if (user != null) {
            console.log('getting user data from server');
            getUserFromServer();
        }
    }, []);
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={'splashScreen'} >
                <Stack.Screen name='splashScreen' component={SplashScreen} />
                <Stack.Screen name='homeNavigation' component={HomeNavigation} />
                <Stack.Screen name='startingAppOnboarding' component={StartingAppOnboarding} />
                <Stack.Screen name='signUp' component={SignUpScreen} />
                <Stack.Screen name='otpVerification' component={OtpVerification} options={{ contentStyle: { backgroundColor: Colors.primary700 } }} />
                <Stack.Screen name='jobDetails' component={JobDetails} />
                <Stack.Screen name='favJobs' component={FavouriteJobs} options={{ headerShown: true, title: 'Favourite Jobs' }} />
                <Stack.Screen name='notifications' component={Notifications} options={{ headerShown: true, title: 'Notifications' }} />
                <Stack.Screen name='createResume' component={CreateResume} />
                <Stack.Screen name='phoneSignIn' component={PhoneSignIn} />
                <Stack.Screen name='personalDetails' component={PersonalDetails} />
                <Stack.Screen name='interestedIn' component={InterestedIn} options={{ headerShown: true, title: 'I am interested in : ' }} />
                <Stack.Screen name='searchedJob' component={SearchedJob} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default RootNavigation

const styles = StyleSheet.create({})