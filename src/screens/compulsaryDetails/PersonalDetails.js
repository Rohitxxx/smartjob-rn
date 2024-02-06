import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, HelperText, } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker'


const PersonalDetails = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState('Male');
    const [workExp, setWorkExp] = useState(true);
    const initialValues = {
        Name: '',
        CurrentCompany: '',
        WorkEx: workExp,
        Designation: '',
    }


    const validationSchema = Yup.object({
        Name: Yup.string().trim().required('Name cant be blank'),
        // CurrentCompany: Yup.string().trim().required('Mobile cant be blank'),
        WorkEx: Yup.boolean(),
        Designation: Yup.string().trim().when('WorkEx', {
            is: true,
            then: Yup.string().trim().required('Please fill your designation'),
            otherwise: Yup.string(),
        }),
        CurrentCompany: Yup.string().trim().when('WorkEx', {
            is: true,
            then: Yup.string().trim().required("Please fill your current company's name"),
            otherwise: Yup.string(),

        })
    })
    const Myform = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {
        const StepsFrame = ({ children, title }) => {
            return (
                <View style={styles.frameContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 200 }}>
                        {children}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', }}>
                        <Button
                            icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                            onPress={() => { navigation.goBack() }}
                            style={styles.btn}
                            labelStyle={{ fontSize: 16, }}
                            textColor='white'
                        >Back</Button>
                        <Button
                            onPress={handleSubmit}
                            style={styles.btn}
                            labelStyle={{ fontSize: 16 }}
                            textColor='white'
                            icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                        >Next</Button>
                    </View>
                </View>
            )
        }
        const { Name, CurrentCompany, Designation } = values

        return (
            <ScrollView ScrollView style={styles.mainContainer} >
                <View style={styles.frameContainer}>
                    <Text style={styles.title}>{'Personal Details'}</Text>
                    <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 200 }}>

                        <View>
                            <TextInput
                                label={'Name'}
                                onChangeText={handleChange('Name')}
                                onBlur={handleBlur('Name')}
                                left={<TextInput.Icon icon={'account'} />}
                                error={touched.Name && errors.Name}
                                mode='outlined'
                                value={Name}
                            />
                            {touched.Name && errors.Name ? <HelperText style={{ color: 'red' }}>{errors.Name}</HelperText> : null}
                        </View>
                        <View style={{ marginBottom: 9 }}>
                            <Text style={{ fontSize: 18, marginBottom: 9, color: 'black' }}>Gender</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Pressable onPress={() => setGender('Male')} style={gender == "Male" ? styles.selectedGender : styles.unSelectedGender}>
                                    <Image source={require('../../assets/man.png')} style={{ width: 60, height: 60 }} />
                                    <Text style={{ textAlign: 'center' }}>Male</Text>
                                </Pressable>
                                <Pressable onPress={() => setGender('Female')} style={gender == "Female" ? styles.selectedGender : styles.unSelectedGender}>
                                    <Image source={require('../../assets/woman.png')} style={{ width: 60, height: 60 }} />
                                    <Text style={{ textAlign: 'center' }}>Woman</Text>
                                </Pressable>
                                <Pressable onPress={() => setGender('Other')} style={gender == "Other" ? styles.selectedGender : styles.unSelectedGender}>
                                    <Image source={require('../../assets/user.png')} style={{ width: 60, height: 60 }} />
                                    <Text style={{ textAlign: 'center' }}>Other</Text>
                                </Pressable>
                            </View>
                        </View>
                        <TextInput
                            label={'DOB *'}
                            left={<TextInput.Icon icon={'cake'} />}
                            mode='outlined'
                            value={date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}
                            onFocus={() => setOpen(true)}
                        />
                        <DatePicker modal open={open} date={date} mode={'date'}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                        <Text style={{ fontSize: 22, color: 'black' }}>Do you have any work Experience?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Pressable onPress={() => { setWorkExp(true); setFieldValue('WorkEx', true) }} style={workExp ? styles.selectedGender : styles.unSelectedGender}>
                                <Image source={require('../../assets/form/yes.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ textAlign: 'center' }}>Yes</Text>
                            </Pressable>
                            <Pressable onPress={() => { setWorkExp(false); setFieldValue('WorkEx', false) }} style={!workExp ? styles.selectedGender : styles.unSelectedGender}>
                                <Image source={require('../../assets/form/no.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ textAlign: 'center' }}>No</Text>
                            </Pressable>
                        </View>
                        {workExp ? <View style={{ marginTop: 15 }}>
                            <View>
                                <TextInput
                                    label={'Current Company Name *'}
                                    onChangeText={handleChange('CurrentCompany')}
                                    onBlur={handleBlur('CurrentCompany')}
                                    left={<TextInput.Icon icon={'domain'} />}
                                    error={touched.CurrentCompany && errors.CurrentCompany}
                                    mode='outlined'
                                    value={CurrentCompany}
                                />
                                {touched.CurrentCompany && errors.CurrentCompany ? <HelperText style={{ color: 'red' }}>{errors.CurrentCompany}</HelperText> : null}
                            </View>
                            <View>
                                <TextInput
                                    label={'Designation *'}
                                    onChangeText={handleChange('Designation')}
                                    onBlur={handleBlur('Designation')}
                                    left={<TextInput.Icon icon={'toolbox-outline'} />}
                                    error={touched.Designation && errors.Designation}
                                    mode='outlined'
                                    value={Designation}
                                />
                                {touched.Designation && errors.Designation ? <HelperText style={{ color: 'red' }}>{errors.Designation}</HelperText> : null}
                            </View>
                        </View> : null}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', }}>
                        <Button
                            icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                            onPress={() => { navigation.goBack() }}
                            style={styles.btn}
                            labelStyle={{ fontSize: 16, }}
                            textColor='white'
                        >Back</Button>
                        <Button
                            onPress={handleSubmit}
                            style={styles.btn}
                            labelStyle={{ fontSize: 16 }}
                            textColor='white'
                            icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                        >Next</Button>
                    </View>
                </View>
            </ScrollView >
        )
    }

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                // alert('workign')
                const { Name, Designation, CurrentCompany } = values
                const selectedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                navigation.navigate('interestedIn', { Name, Designation, CurrentCompany, selectedDate, gender })
                // console.log('GetData' + Name, date.toISOString(), Designation, CurrentCompany)
            }}
        >
            {Myform}
        </Formik>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight,

    },
    frameContainer: {

    },
    title: {
        paddingVertical: 40,
        backgroundColor: Colors.primary700,
        color: 'white',
        fontSize: 29,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: Colors.primary700,
        flex: 1,
        marginHorizontal: 4,
    },
    dropdown: {
        marginBottom: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        backgroundColor: 'white'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedGender: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 3,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    unSelectedGender: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 3,
        alignItems: 'center'
    }
})