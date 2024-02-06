import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Pressable, Linking, ToastAndroid } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import Colors from '../../constants/Colors'
import CustomButtom from '../../components/CustomButtom'
import Lottie from 'lottie-react-native';
import { TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../Context/Contex';
const SignUpScreen = ({ navigation }) => {

    // const { user } = useContext(UserContext);

    const [number, setNumber] = useState('')
    const [confirm, setConfirm] = useState(null);

    const [loader, setLoader] = useState(false)
    const signin = async () => {
        console.log('signing...')
        try {
            if (number != undefined && number.length === 10) {
                setLoader(true);
                console.log('insinde sms')
                const confirmation = await auth().signInWithPhoneNumber('+91' + number);
                console.log("confirmation", confirmation)
                if (confirmation) {
                    setConfirm(confirmation);
                    navigation.navigate('otpVerification', { 'confirm': confirmation })
                    setLoader(false)
                }
            } else {
                ToastAndroid.show('Invalid phone number.', ToastAndroid.SHORT)
            }
        } catch (e) {
            ToastAndroid.show(e, ToastAndroid.SHORT)
        }

    }
    const handlePress = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openURL('https://smartjob.info/login.php');
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary700, }}>
            <View style={{ flex: 1, marginHorizontal: 20, }}>
                {loader ?
                    <View>
                        <Text style={styles.txt}>smart job</Text>
                        <View style={{ marginTop: 50 }}>
                            <Lottie resizeMode='contain' style={{ alignSelf: 'center', width: '100%', aspectRatio: 1 }} source={require('../../assets/lottie/otp_verify.json')} autoPlay loop />
                            <Text style={{ color: 'white', textAlign: "center", fontSize: 29 }}>Loading...</Text>
                        </View>
                    </View>
                    : <>
                        <Text style={styles.txt}>smart job</Text>
                        <View style={{ marginTop: 50 }}>
                            <Lottie resizeMode='contain' style={{ alignSelf: 'center', width: '50%', aspectRatio: 1 }} source={require('../../assets/lottie/login.json')} autoPlay loop />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                value={number}
                                onChangeText={(value) => setNumber(value)}
                                autoFocus mode='flat' error={false} label={'YourMobile'} maxLength={10} keyboardType='number-pad'
                                style={{ marginVertical: 30, fontSize: 25, backgroundColor: 'white', borderRadius: 5 }} underlineColor='black' activeUnderlineColor='black'
                            // theme={{ colors: { text: 'white' } }}
                            />
                            {/* <TextInput left={<TextInput.Icon icon="eye" />} autoFocus={true} /> */}
                            <View>
                                <CustomButtom title={'Verify Phone Number'} color='white' bgColor={'red'} onPress={signin} />
                                <Pressable onPress={handlePress}><Text style={styles.extraText}>I am recruiter</Text></Pressable>
                            </View>
                        </View>
                    </>}
            </View>
            <Text style={{ color: 'white', textAlign: 'center' }}>{'\u00A9'} All rights reserved</Text>

        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    txt: {
        paddingTop: 50,
        fontSize: 50,
        color: 'white',
        textAlign: "center",
        fontWeight: '800',
        padding: 10,
        // borderRadius: 8,

        // marginTop: 100
    },
    inputContainer: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    input: {
        width: '100%',
        color: 'white',
        fontSize: 22,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginBottom: 70
    },
    extraText: {
        paddingTop: 20,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
})