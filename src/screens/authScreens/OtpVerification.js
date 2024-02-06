import { StyleSheet, Text, ToastAndroid, View, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Colors from '../../constants/Colors'
import Lottie from 'lottie-react-native';
import { Button, TextInput } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CustomButtom from '../../components/CustomButtom';
import AxiosObj from '../../AxiosObj/AxiosObj';
import MyStore from '../../store/MyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../Context/Contex';
const OtpVerification = ({ navigation, route }) => {
    const [pin, setPin] = useState();
    const { confirm } = route.params;
    const { user, editUser, getUserFromServer } = useContext(UserContext);
    const OtpVerify = async () => {
        console.log(pin)
        try {
            console.log('pin', pin)
            let data = await confirm.confirm(pin);
            authWithPhone(data.user.phoneNumber);
            console.log("data", data);
            console.log("phone no", data.user.phoneNumber);
        } catch (error) {
            console.log('Invalid code.');
            ToastAndroid.show('Invalid code.', ToastAndroid.SHORT)
        }
    }
    const authWithPhone = async (contact_no) => {

        let formdata = new FormData()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            }
        };
        formdata.append('contact_no', contact_no)

        try {
            const response = await AxiosObj.post('auth_with_phone.php', formdata, config);
            if (response.data.error === false) {
                console.log('response data', response.data);
                editUser(response.data.data)
                if (response.data.data.name == null || response.data.data.name.trim() == '') {
                    console.log('new user', 'name not found')
                    navigation.replace('personalDetails')
                } else {
                    console.log('existing user', 'name found')
                    getUserFromServer();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'homeNavigation' }]
                    });
                    navigation.replace('homeNavigation')
                }
            }
            else
                console.log('response data', response.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={styles.otpContainer}>

            <Text style={{ fontSize: 35, color: Colors.primary700, marginBottom: 20, textAlign: 'center' }}>Enter OTP</Text>

            <OTPInputView
                style={styles.outputView}
                pinCount={6}

                code={pin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={(value) => setPin(value)}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled={(code) => {
            //     console.log(`Code is ${code}, you are good to go!`)
            //     OtpVerify()
            // }}

            />
            {/* <Button onPress={OtpVerify} >check</Button> */}
            <View style={{ margin: 40 }}><CustomButtom title={'Verify'} color='white' bgColor={'red'} onPress={OtpVerify} />
            </View>
            <Pressable onPress={() => navigation.replace('signUp')}><Text style={styles.extraText}>Resend code</Text></Pressable>
            {/* <Text style={{ fontSize: 25, color: 'white' }}>Verifying...</Text> */}
            {/* <Button onPress={gotoHome} >gotoHome</Button> */}
        </View>
    )
}

export default OtpVerification

const styles = StyleSheet.create({
    otpContainer: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 150,
        alignSelf: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 120,
        borderTopEndRadius: 130,
        borderTopStartRadius: 130,

    },
    outputView: {
        width: '100%',
        height: 80,
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: Colors.primary700
    },

    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
        borderColor: 'grey',
        color: 'black',
        fontSize: 25,
        backgroundColor: '#ccc'

    },

    underlineStyleHighLighted: {
        borderColor: Colors.primary700,
    },
    extraText: {
        paddingTop: 20,
        color: Colors.primary700,
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
});