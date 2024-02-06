import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const width = Dimensions.get('window').width;
const StartingAppOnboarding = ({ navigation }) => {
    const signUpPageHandler = () => {
        navigation.navigate('signUp')
    }

    return (
        <>
            {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../../assets/onboard1_.png')} style={{ width: 100, aspectRatio: 1 }} resizeMode={'cover'} />,
                        title: 'Never miss an opportunity.',
                        subtitle: 'Easily find jobs, chat and collaborate on the go.',

                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../../assets/onboard2_.png')} style={{ width: '80%', aspectRatio: 1 }} resizeMode={'contain'} />,
                        title: 'Find relevent jobs and easily apply.',
                        subtitle: 'Stand out by replying to clients quickly and getting to work.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../../assets/onboard3_.png')} style={{ width: '80%', aspectRatio: 1 }} resizeMode={'contain'} />,
                        title: 'Get Interviewed',
                        subtitle: "Get interviewed by India's leading companies",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../../assets/good-job.png')} style={{ width: '80%', aspectRatio: 1 }} resizeMode={'contain'} />,
                        title: 'Sign Up now',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },

                ]} imageContainerStyles={{ width: 100 }}
                onSkip={signUpPageHandler}
                onDone={signUpPageHandler}
            />
        </>
    )
}

export default StartingAppOnboarding

const styles = StyleSheet.create({})