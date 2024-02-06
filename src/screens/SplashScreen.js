import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useContext } from 'react';
import Colors from '../constants/Colors';
import { UserContext } from '../Context/Contex';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    const { isLoggedIn, getUser } = useContext(UserContext);
    const getUserFromLocal = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('user');
            console.log('inside getitem', jsonString)
            console.log('inside getitem 2', typeof (jsonString))
            if (jsonString != null) {
                let user = JSON.parse(jsonString);
                console.log('user inside geuser', user);
                if (user != null) {
                    user.user_id != '' ? navigation.replace('homeNavigation') : navigation.replace('signUp');
                } else
                    navigation.replace('signUp');
            }
            else
                navigation.replace('signUp');

            // return jsonString != null ? JSON.parse(jsonString) : null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    const goToHandler = () => {
        console.log('goto running')
        // check user logged in or not
        // console.log('inside of splashscreen', isLoggedIn())
        console.log('isloggedIn return value', isLoggedIn());
        isLoggedIn() ? navigation.replace('homeNavigation') : navigation.replace('startingAppOnboarding');
    }
    useEffect(() => {
        setTimeout(getUserFromLocal, 1000);
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>smart job</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary700,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 45,
        color: 'white',
        fontWeight: '800',
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center'
    }
})