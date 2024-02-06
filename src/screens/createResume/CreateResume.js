import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TextInput, Button, HelperText, } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons'

import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { UserContext } from '../../Context/Contex';

import { Formik } from 'formik'
import * as Yup from 'yup';

const CreateResume = ({ navigation, route }) => {
    const [step, setStep] = useState(route.params.step != null ? route.params.step : 1);
    const [user, setUser] = useState(route.params.freshUser);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [martialStatus, setMartialStatus] = useState(user.martial_status.trim() != '' ? user.martial_status.trim() : 'Single');
    useEffect(() => { console.log(user.martial_status) }, [])
    const [salary, setSalary] = useState(user.current_salary.trim() != '' ? user.current_salary.trim() : '10000');

    const { setUserToServer } = useContext(UserContext);
    const [exp, setExp] = useState(user.experiance.trim() != '' ? user.experiance.trim() : 'Fresher');
    const [gender, setGender] = useState(user.gender.trim() != '' ? user.gender.trim() : 'Male');
    const [workExp, setWorkExp] = useState(true);
    const [education, setEducation] = useState('10');

    const dataMartialStatus = [
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Widow', value: 'Widow' },
        { label: 'widower', value: 'widower' },
    ];
    const dataSalary = [
        { label: '10,000+', value: '10000' },
        { label: '10,000 to 20,000', value: '20000' },
        { label: '20,000 to 30,000', value: '30000' },
        { label: '30,000 to 40,000', value: '40000' },
        { label: '40,000 to 50,000', value: '50000' },
        { label: '50,000 to 70,000', value: '60000' },
        { label: '70,000 to 80,000', value: '80000' },
        { label: '80,000 to 1,00,000', value: '90000' },
        { label: '1,00,000+', value: '100000' },
    ];
    const dataExp = [
        { label: 'Fresher', value: 'Fresher' },
        { label: '1 Year ', value: '1 Year ' },
        { label: '2 Years ', value: '2 Years ' },
        { label: '3 Years ', value: '3 Years ' },
        { label: '4 Years ', value: '4 Years ' },
        { label: '5 Years ', value: '5 Years ' },
        { label: '6 Years ', value: '6 Years ' },
        { label: '7 Years ', value: '7 Years ' },
        { label: '8 Years ', value: '8 Years ' },
        { label: '9 Years ', value: '9 Years ' },
        { label: '10 Years ', value: '10 Years ' },
        { label: '10+ Years ', value: '10+ Years ' },

    ];

    const FormSteps = () => {

        switch (step) {
            case 1:
                const initialValues1 = {
                    Name: user.name,
                    FatherName: user.father_name,
                    // Dob: user.dob,
                    // MartialStatus: user.martial_status,
                    // Gender:user.gender
                }
                const validationSchema1 = Yup.object({
                    Name: Yup.string().trim().required("Please enter a valid name"),
                    FatherName: Yup.string().trim().required("Father's name cant't be empty"),
                })
                const Myform1 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {

                    const { Name, FatherName } = values

                    return (
                        <View style={styles.frameContainer}>
                            <Text style={styles.title}>{'Step 1: Personal Details'}</Text>
                            <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 300 }}>

                                <View style={styles.input}>
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
                                <View style={styles.input}>
                                    <TextInput
                                        label={'FatherName'}
                                        onChangeText={handleChange('FatherName')}
                                        onBlur={handleBlur('FatherName')}
                                        left={<TextInput.Icon icon={'account-child'} />}
                                        error={touched.FatherName && errors.FatherName}
                                        mode='outlined'
                                        value={FatherName}
                                    />
                                    {touched.FatherName && errors.FatherName ? <HelperText style={{ color: 'red' }}>{errors.FatherName}</HelperText> : null}
                                </View>
                                <TextInput label='DOB*' left={<TextInput.Icon icon={'cake'} />} mode="outlined" value={user.dob.trim() != '' ? user.dob : date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()} onFocus={() => setOpen(true)} />
                                <DatePicker modal open={open} date={date} mode={'date'}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                        setUser({ ...user, dob: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() })
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={dataMartialStatus}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select item"
                                    searchPlaceholder="Search..."
                                    value={martialStatus}
                                    onChange={item => {
                                        setMartialStatus(item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <Ionicon style={styles.icon} color="black" name="people" size={20} />
                                    )}
                                />
                                <View>
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

                            </ScrollView>
                            <View>
                                <Button
                                    icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                    onPress={() => { handleSubmit(); navigation.navigate('resume') }}
                                    style={styles.savebtn}
                                    labelStyle={{ fontSize: 16, }}
                                    textColor='white'
                                >Save & Exit</Button>
                                <View style={{ flexDirection: 'row', }}>
                                    <Button
                                        icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                        onPress={() => { navigation.navigate('resume') }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16, }}
                                        textColor='white'
                                    >Back</Button>
                                    <Button
                                        onPress={() => { handleSubmit(); }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16 }}
                                        textColor='white'
                                        icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                                    >Next</Button>
                                </View>
                            </View>
                        </View>
                    )
                }

                return (

                    <Formik
                        initialValues={initialValues1}
                        validationSchema={validationSchema1}
                        onSubmit={(values, actions) => {
                            // alert('workign')
                            const { Name, FatherName } = values
                            const selectedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                            // navigation.navigate('interestedIn', { Name, date, gender, FatherName, })
                            console.log('step1 data to be saved', Name + FatherName + selectedDate + gender + martialStatus)
                            setUser({ ...user, name: Name, father_name: FatherName, dob: selectedDate, gender: gender, martial_status: martialStatus });
                            console.log('user while step1 submit', user);
                            setUserToServer({ ...user, name: Name, father_name: FatherName, dob: selectedDate, gender: gender, martial_status: martialStatus });
                            console.log('step1', values);
                            setStep(2);
                        }}
                    >
                        {Myform1}
                    </Formik>
                )

            case 2:
                const initialValues2 = {
                    WorkExp: workExp,
                    CompanyName: user.current_company,
                    Designation: user.designation,

                }
                const validationSchema2 = Yup.object({
                    WorkExp: Yup.boolean(),
                    Designation: Yup.string().trim().when('WorkExp', {
                        is: true,
                        then: Yup.string().trim().required('Please fill your designation'),
                        otherwise: Yup.string(),
                    }),
                    CompanyName: Yup.string().trim().when('WorkExp', {
                        is: true,
                        then: Yup.string().trim().required("Please fill your current company's name"),
                        otherwise: Yup.string(),

                    })
                })
                const Myform2 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {

                    const { Designation, CompanyName } = values

                    return (
                        <View style={styles.frameContainer}>
                            <Text style={styles.title}>{'Step 2: Work Experience'}</Text>
                            <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 300 }}>
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
                                            onChangeText={handleChange('CompanyName')}
                                            onBlur={handleBlur('CompanyName')}
                                            left={<TextInput.Icon icon={'domain'} />}
                                            error={touched.CompanyName && errors.CompanyName}
                                            mode='outlined'
                                            value={CompanyName}
                                        />
                                        {touched.CompanyName && errors.CompanyName ? <HelperText style={{ color: 'red' }}>{errors.CompanyName}</HelperText> : null}
                                    </View>
                                    <View>
                                        <TextInput
                                            label="Your Designation *"
                                            onChangeText={handleChange('Designation')}
                                            onBlur={handleBlur('Designation')}
                                            left={<TextInput.Icon icon={'card-account-details'} />}
                                            error={touched.Designation && errors.Designation}
                                            mode='outlined'
                                            value={Designation} />
                                        {touched.Designation && errors.Designation ? <HelperText style={{ color: 'red' }}>{errors.Designation}</HelperText> : null}
                                    </View>
                                    <View>
                                        <Text>Salary</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={dataSalary}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={salary}
                                            onChange={item => {
                                                setSalary(item.value);
                                            }}
                                            renderLeftIcon={() => (
                                                <Ionicon style={styles.icon} color="black" name="cash-outline" size={20} />
                                            )}
                                        />
                                    </View>
                                    <View>
                                        <Text>Experience</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={dataExp}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={exp}
                                            onChange={item => {
                                                setSalary(item.value);
                                            }}
                                            renderLeftIcon={() => (
                                                <Ionicon style={styles.icon} color="black" name="bar-chart" size={20} />
                                            )}
                                        />
                                    </View>
                                </View> : null}
                            </ScrollView>
                            <View>
                                <Button
                                    icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                    onPress={() => { handleSubmit(); navigation.navigate('resume') }}
                                    style={styles.savebtn}
                                    labelStyle={{ fontSize: 16, }}
                                    textColor='white'
                                >Save & Exit</Button>
                                <View style={{ flexDirection: 'row', }}>
                                    <Button
                                        icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                        onPress={() => { setStep(1) }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16, }}
                                        textColor='white'
                                    >Back</Button>
                                    <Button
                                        onPress={() => { handleSubmit(); }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16 }}
                                        textColor='white'
                                        icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                                    >Next</Button>
                                </View>
                            </View>
                        </View>
                    )
                }

                return (

                    <Formik
                        initialValues={initialValues2}
                        validationSchema={validationSchema2}
                        onSubmit={(values, actions) => {
                            const { CompanyName, Designation } = values
                            setUser({ ...user, current_company: CompanyName, designation: Designation, current_salary: salary, experiance: exp })
                            setUserToServer({ ...user, current_company: CompanyName, designation: Designation, current_salary: salary, experiance: exp })
                            console.log('step2 data', CompanyName + Designation)
                            setStep(3)
                        }}
                    >
                        {Myform2}
                    </Formik>
                )


            case 3:
                const initialValues3 = {
                    Education: education,

                    HighSchoolName: user.high_school_name,
                    HighSchoolPer: user.high_school_percentage,
                    HighSchoolBoard: user.high_school_board,
                    HighSchoolPass: user.high_school_yr_of_pass,

                    IntermediateInstitution: user.intermediate_institution,
                    IntermediateBoard: user.intermediate_board,
                    IntermediatePer: user.intermediate_percentage,
                    IntermediatePass: user.intermediate_yr_of_pass,

                    DiplomaClgName: user.diploma_clg_name,
                    DiplomaCourse: user.diploma_course,
                    DiplomaPer: user.diploma_percentage,
                    DiplomaPass: user.diploma_yr_of_pass,

                    UgClgName: user.ug_clg_name,
                    UgCourse: user.ug_course,
                    UgPer: user.ug_percentage,
                    UgPass: user.ug_yr_of_pass,

                    PgClgName: user.pg_clg_name,
                    PgCourse: user.pg_course,
                    PgPer: user.pg_percentage,
                    PgPass: user.pg_yr_of_pass,

                }
                const validationSchema3 = Yup.object({
                    Education: Yup.string(),
                    HighSchoolName: Yup.string().trim().when('Education', {
                        is: '10',
                        then: Yup.string().trim().required("Please fill your institute's name"),
                        otherwise: Yup.string(),
                    }),
                    HighSchoolPer: Yup.string().trim().when('Education', {
                        is: '10',
                        then: Yup.string().trim().required('Please fill your high school percentage'),
                        otherwise: Yup.string(),
                    }),
                    HighSchoolBoard: Yup.string().trim().when('Education', {
                        is: '10',
                        then: Yup.string().trim().required('Please fill your high school board'),
                        otherwise: Yup.string(),
                    }),
                    HighSchoolPass: Yup.string().trim().when('Education', {
                        is: '10',
                        then: Yup.string().trim().required('Please fill your high school passing year'),
                        otherwise: Yup.string(),
                    }),

                    IntermediateInstitution: Yup.string().trim().when('Education', {
                        is: '12',
                        then: Yup.string().trim().required("Please fill your institute's name"),
                        otherwise: Yup.string(),
                    }),
                    IntermediateBoard: Yup.string().trim().when('Education', {
                        is: '12',
                        then: Yup.string().trim().required('Please fill your intermediate board'),
                        otherwise: Yup.string(),
                    }),
                    IntermediatePer: Yup.string().trim().when('Education', {
                        is: '12',
                        then: Yup.string().trim().required('Please fill your intermediate percentage'),
                        otherwise: Yup.string(),
                    }),
                    IntermediatePass: Yup.string().trim().when('Education', {
                        is: '12',
                        then: Yup.string().trim().required('Please fill intermediate year of passing'),
                        otherwise: Yup.string(),
                    }),

                    DiplomaClgName: Yup.string().trim().when('Education', {
                        is: 'diploma',
                        then: Yup.string().trim().required('Please fill your institute name'),
                        otherwise: Yup.string(),
                    }),
                    DiplomaCourse: Yup.string().trim().when('Education', {
                        is: 'diploma',
                        then: Yup.string().trim().required('Please fill your course name (eg. diploma in electrical)'),
                        otherwise: Yup.string(),
                    }),
                    DiplomaPer: Yup.string().trim().when('Education', {
                        is: 'diploma',
                        then: Yup.string().trim().required('Please fill diploma percentage'),
                        otherwise: Yup.string(),
                    }),
                    DiplomaPass: Yup.string().trim().when('Education', {
                        is: 'diploma',
                        then: Yup.string().trim().required('Please fill diploma passing year'),
                        otherwise: Yup.string(),
                    }),

                    UgClgName: Yup.string().trim().when('Education', {
                        is: 'graduated',
                        then: Yup.string().trim().required('Please fill your institute name'),
                        otherwise: Yup.string(),
                    }),
                    UgCourse: Yup.string().trim().when('Education', {
                        is: 'graduated',
                        then: Yup.string().trim().required('Please fill your course name (eg. btech, bsc, ba)'),
                        otherwise: Yup.string(),
                    }),
                    UgPer: Yup.string().trim().when('Education', {
                        is: 'graduated',
                        then: Yup.string().trim().required('Please fill your graduation percentage'),
                        otherwise: Yup.string(),
                    }),
                    UgPass: Yup.string().trim().when('Education', {
                        is: 'graduated',
                        then: Yup.string().trim().required('Please fill your passing year'),
                        otherwise: Yup.string(),
                    }),

                    PgClgName: Yup.string().trim().when('Education', {
                        is: 'postGraduate',
                        then: Yup.string().trim().required('Please fill your institute name'),
                        otherwise: Yup.string(),
                    }),
                    PgCourse: Yup.string().trim().when('Education', {
                        is: 'postGraduate',
                        then: Yup.string().trim().required('Please fill your course name (eg. Mtech, MCA, MSc'),
                        otherwise: Yup.string(),
                    }),
                    PgPer: Yup.string().trim().when('Education', {
                        is: 'postGraduate',
                        then: Yup.string().trim().required('Please fill your percentage'),
                        otherwise: Yup.string(),
                    }),
                    PgPass: Yup.string().trim().when('Education', {
                        is: 'postGraduate',
                        then: Yup.string().trim().required('Please fill your passing year'),
                        otherwise: Yup.string(),
                    }),

                })
                const Myform3 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {

                    const { Education, HighSchoolName, HighSchoolPer, HighSchoolBoard, HighSchoolPass, IntermediateInstitution, IntermediateBoard, IntermediatePer, IntermediatePass, DiplomaClgName, DiplomaCourse, DiplomaPer, DiplomaPass, UgClgName, UgCourse, UgPer, UgPass, PgClgName, PgCourse, PgPer, PgPass, } = values

                    return (
                        <View style={styles.frameContainer}>
                            <Text style={styles.title}>{'Step 3: Education'}</Text>
                            <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 300 }}>
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 9, color: 'black' }}>Your Highest Education</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Pressable onPress={() => { setEducation('10'); }} style={education == "10" ? styles.selectedGender : styles.unSelectedGender}>
                                            <Image source={require('../../assets/form/10th.png')} style={{ width: 60, height: 60 }} />
                                            <Text style={{ textAlign: 'center' }}>10th {'\n'} (High School)</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setEducation('12')} style={education == "12" ? styles.selectedGender : styles.unSelectedGender}>
                                            <Image source={require('../../assets/form/12th.png')} style={{ width: 60, height: 60 }} />
                                            <Text style={{ textAlign: 'center' }}>12th {'\n'} (Intermediate)</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setEducation('diploma')} style={education == "diploma" ? styles.selectedGender : styles.unSelectedGender}>
                                            <Image source={require('../../assets/form/diploma.png')} style={{ width: 60, height: 60 }} />
                                            <Text style={{ textAlign: 'center' }}>Diploma</Text>
                                        </Pressable>

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25 }}>
                                        <Pressable onPress={() => setEducation('graduated')} style={education == "graduated" ? styles.selectedGender : styles.unSelectedGender}>
                                            <Image source={require('../../assets/form/graduated.png')} style={{ width: 60, height: 60 }} />
                                            <Text style={{ textAlign: 'center' }}>Graduated</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setEducation('postGraduate')} style={education == "postGraduate" ? styles.selectedGender : styles.unSelectedGender}>
                                            <Image source={require('../../assets/form/postGraduated.png')} style={{ width: 60, height: 60 }} />
                                            <Text style={{ textAlign: 'center' }}>Post Graduated</Text>
                                        </Pressable>
                                    </View>
                                    {education == '10' ?
                                        <View>
                                            <View>
                                                <TextInput
                                                    label={'School name *'}
                                                    onChangeText={handleChange('HighSchoolName')}
                                                    onBlur={handleBlur('HighSchoolName')}
                                                    left={<TextInput.Icon icon={'domain'} />}
                                                    error={touched.HighSchoolName && errors.HighSchoolName}
                                                    mode='outlined'
                                                    value={HighSchoolName}
                                                />
                                                {touched.HighSchoolName && errors.HighSchoolName ? <HelperText style={{ color: 'red' }}>{errors.HighSchoolName}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'High School Board * '}
                                                    onChangeText={handleChange('HighSchoolBoard')}
                                                    onBlur={handleBlur('HighSchoolBoard')}
                                                    left={<TextInput.Icon icon={'book'} />}
                                                    error={touched.HighSchoolBoard && errors.HighSchoolBoard}
                                                    mode='outlined'
                                                    value={HighSchoolBoard}
                                                />
                                                {touched.HighSchoolBoard && errors.HighSchoolBoard ? <HelperText style={{ color: 'red' }}>{errors.HighSchoolBoard}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Passing Year * '}
                                                    onChangeText={handleChange('HighSchoolPass')}
                                                    onBlur={handleBlur('HighSchoolPass')}
                                                    left={<TextInput.Icon icon={'clipboard-text-clock'} />}
                                                    error={touched.HighSchoolPass && errors.HighSchoolPass}
                                                    mode='outlined'
                                                    value={HighSchoolPass}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}

                                                />
                                                {touched.HighSchoolPass && errors.HighSchoolPass ? <HelperText style={{ color: 'red' }}>{errors.HighSchoolPass}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Percentage * '}
                                                    onChangeText={handleChange('HighSchoolPer')}
                                                    onBlur={handleBlur('HighSchoolPer')}
                                                    left={<TextInput.Icon icon={'percent'} />}
                                                    error={touched.HighSchoolPer && errors.HighSchoolPer}
                                                    mode='outlined'
                                                    value={HighSchoolPer}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}
                                                />
                                                {touched.HighSchoolPer && errors.HighSchoolPer ? <HelperText style={{ color: 'red' }}>{errors.HighSchoolPer}</HelperText> : null}
                                            </View>
                                        </View> : null
                                    }
                                    {education == '12' ?
                                        <View>
                                            <View>
                                                <TextInput
                                                    label={'School name *'}
                                                    onChangeText={handleChange('IntermediateInstitution')}
                                                    onBlur={handleBlur('IntermediateInstitution')}
                                                    left={<TextInput.Icon icon={'domain'} />}
                                                    error={touched.IntermediateInstitution && errors.IntermediateInstitution}
                                                    mode='outlined'
                                                    value={IntermediateInstitution}
                                                />
                                                {touched.IntermediateInstitution && errors.IntermediateInstitution ? <HelperText style={{ color: 'red' }}>{errors.IntermediateInstitution}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Intermediate Board * '}
                                                    onChangeText={handleChange('IntermediateBoard')}
                                                    onBlur={handleBlur('IntermediateBoard')}
                                                    left={<TextInput.Icon icon={'book'} />}
                                                    error={touched.IntermediateBoard && errors.IntermediateBoard}
                                                    mode='outlined'
                                                    value={IntermediateBoard}
                                                />
                                                {touched.IntermediateBoard && errors.IntermediateBoard ? <HelperText style={{ color: 'red' }}>{errors.IntermediateBoard}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Passing Year * '}
                                                    onChangeText={handleChange('IntermediatePass')}
                                                    onBlur={handleBlur('IntermediatePass')}
                                                    left={<TextInput.Icon icon={'clipboard-text-clock'} />}
                                                    error={touched.IntermediatePass && errors.IntermediatePass}
                                                    mode='outlined'
                                                    value={IntermediatePass}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}

                                                />
                                                {touched.IntermediatePass && errors.IntermediatePass ? <HelperText style={{ color: 'red' }}>{errors.IntermediatePass}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Percentage * '}
                                                    onChangeText={handleChange('IntermediatePer')}
                                                    onBlur={handleBlur('IntermediatePer')}
                                                    left={<TextInput.Icon icon={'percent'} />}
                                                    error={touched.IntermediatePer && errors.IntermediatePer}
                                                    mode='outlined'
                                                    value={IntermediatePer}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}
                                                />
                                                {touched.IntermediatePer && errors.IntermediatePer ? <HelperText style={{ color: 'red' }}>{errors.IntermediatePer}</HelperText> : null}
                                            </View>
                                        </View> : null
                                    }
                                    {education == 'diploma' ?
                                        <View>
                                            <View>
                                                <TextInput
                                                    label={'College name *'}
                                                    onChangeText={handleChange('DiplomaClgName')}
                                                    onBlur={handleBlur('DiplomaClgName')}
                                                    left={<TextInput.Icon icon={'domain'} />}
                                                    error={touched.DiplomaClgName && errors.DiplomaClgName}
                                                    mode='outlined'
                                                    value={DiplomaClgName}
                                                />
                                                {touched.DiplomaClgName && errors.DiplomaClgName ? <HelperText style={{ color: 'red' }}>{errors.DiplomaClgName}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'High School Board * '}
                                                    onChangeText={handleChange('DiplomaCourse')}
                                                    onBlur={handleBlur('DiplomaCourse')}
                                                    left={<TextInput.Icon icon={'book'} />}
                                                    error={touched.DiplomaCourse && errors.DiplomaCourse}
                                                    mode='outlined'
                                                    value={DiplomaCourse}
                                                />
                                                {touched.DiplomaCourse && errors.DiplomaCourse ? <HelperText style={{ color: 'red' }}>{errors.DiplomaCourse}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Passing Year * '}
                                                    onChangeText={handleChange('DiplomaPass')}
                                                    onBlur={handleBlur('DiplomaPass')}
                                                    left={<TextInput.Icon icon={'clipboard-text-clock'} />}
                                                    error={touched.DiplomaPass && errors.DiplomaPass}
                                                    mode='outlined'
                                                    value={DiplomaPass}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}

                                                />
                                                {touched.DiplomaPass && errors.DiplomaPass ? <HelperText style={{ color: 'red' }}>{errors.DiplomaPass}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Percentage * '}
                                                    onChangeText={handleChange('DiplomaPer')}
                                                    onBlur={handleBlur('DiplomaPer')}
                                                    left={<TextInput.Icon icon={'percent'} />}
                                                    error={touched.DiplomaPer && errors.DiplomaPer}
                                                    mode='outlined'
                                                    value={DiplomaPer}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}
                                                />
                                                {touched.DiplomaPer && errors.DiplomaPer ? <HelperText style={{ color: 'red' }}>{errors.DiplomaPer}</HelperText> : null}
                                            </View>
                                        </View> : null
                                    }
                                    {education == 'graduated' ?
                                        <View>
                                            <View>
                                                <TextInput
                                                    label={'College name *'}
                                                    onChangeText={handleChange('UgClgName')}
                                                    onBlur={handleBlur('UgClgName')}
                                                    left={<TextInput.Icon icon={'domain'} />}
                                                    error={touched.UgClgName && errors.UgClgName}
                                                    mode='outlined'
                                                    value={UgClgName}
                                                />
                                                {touched.UgClgName && errors.UgClgName ? <HelperText style={{ color: 'red' }}>{errors.UgClgName}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'High School Board * '}
                                                    onChangeText={handleChange('UgCourse')}
                                                    onBlur={handleBlur('UgCourse')}
                                                    left={<TextInput.Icon icon={'book'} />}
                                                    error={touched.UgCourse && errors.UgCourse}
                                                    mode='outlined'
                                                    value={UgCourse}
                                                />
                                                {touched.UgCourse && errors.UgCourse ? <HelperText style={{ color: 'red' }}>{errors.UgCourse}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Passing Year * '}
                                                    onChangeText={handleChange('UgPass')}
                                                    onBlur={handleBlur('UgPass')}
                                                    left={<TextInput.Icon icon={'clipboard-text-clock'} />}
                                                    error={touched.UgPass && errors.UgPass}
                                                    mode='outlined'
                                                    value={UgPass}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}

                                                />
                                                {touched.UgPass && errors.UgPass ? <HelperText style={{ color: 'red' }}>{errors.UgPass}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Percentage * '}
                                                    onChangeText={handleChange('UgPer')}
                                                    onBlur={handleBlur('UgPer')}
                                                    left={<TextInput.Icon icon={'percent'} />}
                                                    error={touched.UgPer && errors.UgPer}
                                                    mode='outlined'
                                                    value={UgPer}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}
                                                />
                                                {touched.UgPer && errors.UgPer ? <HelperText style={{ color: 'red' }}>{errors.UgPer}</HelperText> : null}
                                            </View>
                                        </View> : null
                                    }
                                    {education == 'postGraduate' ?
                                        <View>
                                            <View>
                                                <TextInput
                                                    label={'University Name * '}
                                                    onChangeText={handleChange('PgClgName')}
                                                    onBlur={handleBlur('PgClgName')}
                                                    left={<TextInput.Icon icon={'domain'} />}
                                                    error={touched.PgClgName && errors.PgClgName}
                                                    mode='outlined'
                                                    value={PgClgName}
                                                />
                                                {touched.PgClgName && errors.PgClgName ? <HelperText style={{ color: 'red' }}>{errors.PgClgName}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Course Name * '}
                                                    onChangeText={handleChange('PgCourse')}
                                                    onBlur={handleBlur('PgCourse')}
                                                    left={<TextInput.Icon icon={'book'} />}
                                                    error={touched.PgCourse && errors.PgCourse}
                                                    mode='outlined'
                                                    value={PgCourse}
                                                />
                                                {touched.PgCourse && errors.PgCourse ? <HelperText style={{ color: 'red' }}>{errors.PgCourse}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Passing Year * '}
                                                    onChangeText={handleChange('PgPass')}
                                                    onBlur={handleBlur('PgPass')}
                                                    left={<TextInput.Icon icon={'clipboard-text-clock'} />}
                                                    error={touched.PgPass && errors.PgPass}
                                                    mode='outlined'
                                                    value={PgPass}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}

                                                />
                                                {touched.PgPass && errors.PgPass ? <HelperText style={{ color: 'red' }}>{errors.PgPass}</HelperText> : null}
                                            </View>
                                            <View>
                                                <TextInput
                                                    label={'Percentage * '}
                                                    onChangeText={handleChange('PgPer')}
                                                    onBlur={handleBlur('PgPer')}
                                                    left={<TextInput.Icon icon={'percent'} />}
                                                    error={touched.PgPer && errors.PgPer}
                                                    mode='outlined'
                                                    value={PgPer}
                                                    keyboardType={'decimal-pad'}
                                                    maxLength={4}
                                                />
                                                {touched.PgPer && errors.PgPer ? <HelperText style={{ color: 'red' }}>{errors.PgPer}</HelperText> : null}
                                            </View>
                                        </View> : null
                                    }

                                </View>
                            </ScrollView>
                            <View>
                                <Button
                                    icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                    onPress={() => { handleSubmit(); navigation.navigate('resume') }}
                                    style={styles.savebtn}
                                    labelStyle={{ fontSize: 16, }}
                                    textColor='white'
                                >Save & Exit</Button>
                                <View style={{ flexDirection: 'row', }}>
                                    <Button
                                        icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                        onPress={() => { setStep(2) }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16, }}
                                        textColor='white'
                                    >Back</Button>
                                    <Button
                                        onPress={() => { handleSubmit() }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16 }}
                                        textColor='white'
                                        icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                                    >Next</Button>
                                </View>
                            </View>
                        </View>
                    )
                }

                return (

                    <Formik
                        initialValues={initialValues3}
                        validationSchema={validationSchema3}
                        onSubmit={(values, actions) => {
                            // alert('workign')
                            const { Education, HighSchoolName, HighSchoolPer, HighSchoolBoard, HighSchoolPass, IntermediateInstitution, IntermediateBoard, IntermediatePer, IntermediatePass, DiplomaClgName, DiplomaCourse, DiplomaPer, DiplomaPass, UgClgName, UgCourse, UgPer, UgPass, PgClgName, PgCourse, PgPer, PgPass, } = values

                            // navigation.navigate('interestedIn', { Name, Designation, CurrentCompany, selectedDate, gender })
                            setUser({
                                ...user,
                                high_school_name: values.HighSchoolName,
                                high_school_percentage: values.HighSchoolPer,
                                high_school_board: values.HighSchoolBoard,
                                high_school_yr_of_pass: values.HighSchoolPass,

                                intermediate_institution: values.IntermediateInstitution,
                                intermediate_board: values.IntermediateBoard,
                                intermediate_percentage: values.IntermediatePer,
                                intermediate_yr_of_pass: values.IntermediatePass,

                                diploma_clg_name: values.DiplomaClgName,
                                diploma_course: values.DiplomaCourse,
                                diploma_percentage: values.DiplomaPer,
                                diploma_yr_of_pass: values.DiplomaPass,

                                ug_clg_name: values.UgClgName,
                                ug_course: values.UgCourse,
                                ug_percentage: values.UgPer,
                                ug_yr_of_pass: values.UgPass,

                                pg_clg_name: values.PgClgName,
                                pg_course: values.PgCourse,
                                pg_percentage: values.PgPer,
                                pg_yr_of_pass: values.PgPass,

                            })
                            setUserToServer({
                                ...user,
                                high_school_name: values.HighSchoolName,
                                high_school_percentage: values.HighSchoolPer,
                                high_school_board: values.HighSchoolBoard,
                                high_school_yr_of_pass: values.HighSchoolPass,

                                intermediate_institution: values.IntermediateInstitution,
                                intermediate_board: values.IntermediateBoard,
                                intermediate_percentage: values.IntermediatePer,
                                intermediate_yr_of_pass: values.IntermediatePass,

                                diploma_clg_name: values.DiplomaClgName,
                                diploma_course: values.DiplomaCourse,
                                diploma_percentage: values.DiplomaPer,
                                diploma_yr_of_pass: values.DiplomaPass,

                                ug_clg_name: values.UgClgName,
                                ug_course: values.UgCourse,
                                ug_percentage: values.UgPer,
                                ug_yr_of_pass: values.UgPass,

                                pg_clg_name: values.PgClgName,
                                pg_course: values.PgCourse,
                                pg_percentage: values.PgPer,
                                pg_yr_of_pass: PgPass,

                            })
                            console.log('step3 data', values)
                            setStep(4)
                        }}
                    >
                        {Myform3}
                    </Formik>
                )

            case 4:
                const initialValues4 = {
                    Address: user.address,
                    City: user.city,
                    State: user.state,
                    Zip: user.zip
                }
                const validationSchema4 = Yup.object({
                    Address: Yup.string().trim().required("Address cant't be empty"),
                    City: Yup.string().trim().required("City cant't be empty"),
                    State: Yup.string().trim().required("State cant't be empty"),
                    Zip: Yup.string().trim().required("Zip cant't be empty"),
                })
                const Myform4 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {

                    const { Address, City, State, Zip } = values

                    return (
                        <View style={styles.frameContainer}>
                            <Text style={styles.title}>{'Step 4: Personal Details'}</Text>
                            <ScrollView style={{ margin: 10, height: Dimensions.get('window').height.toFixed(0) - 300 }}>

                                <View style={styles.input}>
                                    <TextInput
                                        label={'Address'}
                                        onChangeText={handleChange('Address')}
                                        onBlur={handleBlur('Address')}
                                        left={<TextInput.Icon icon={'pin'} />}
                                        error={touched.Address && errors.Address}
                                        mode='outlined'
                                        value={Address}
                                    />
                                    {touched.Address && errors.Address ? <HelperText style={{ color: 'red' }}>{errors.Address}</HelperText> : null}
                                </View>
                                <View style={styles.input}>
                                    <TextInput
                                        label={'City'}
                                        onChangeText={handleChange('City')}
                                        onBlur={handleBlur('City')}
                                        left={<TextInput.Icon icon={'city'} />}
                                        error={touched.City && errors.City}
                                        mode='outlined'
                                        value={City}
                                    />
                                    {touched.City && errors.City ? <HelperText style={{ color: 'red' }}>{errors.City}</HelperText> : null}
                                </View>
                                <View style={styles.input}>
                                    <TextInput
                                        label={'State'}
                                        onChangeText={handleChange('State')}
                                        onBlur={handleBlur('State')}
                                        left={<TextInput.Icon icon={'map'} />}
                                        error={touched.State && errors.State}
                                        mode='outlined'
                                        value={State}
                                    />
                                    {touched.State && errors.State ? <HelperText style={{ color: 'red' }}>{errors.State}</HelperText> : null}
                                </View>
                                <View style={styles.input}>
                                    <TextInput
                                        label={'Zip'}
                                        onChangeText={handleChange('Zip')}
                                        onBlur={handleBlur('Zip')}
                                        left={<TextInput.Icon icon={'map-marker-account'} />}
                                        error={touched.Zip && errors.Zip}
                                        mode='outlined'
                                        value={Zip}
                                        keyboardType='decimal-pad'
                                        maxLength={6}
                                    />
                                    {touched.Zip && errors.Zip ? <HelperText style={{ color: 'red' }}>{errors.Zip}</HelperText> : null}
                                </View>
                            </ScrollView>
                            <View>

                                <View style={{ flexDirection: 'row', }}>
                                    <Button
                                        icon={() => <Ionicon name='arrow-back' color='white' size={16} />}
                                        onPress={() => { setStep(3) }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16, }}
                                        textColor='white'
                                    >Back</Button>
                                    <Button
                                        onPress={() => { handleSubmit(); }}
                                        style={styles.btn}
                                        labelStyle={{ fontSize: 16 }}
                                        textColor='white'
                                        icon={() => <Ionicon name='arrow-forward' color='white' size={16} />}
                                    >Save & Exit</Button>
                                </View>
                            </View>
                        </View>
                    )
                }

                return (

                    <Formik
                        initialValues={initialValues4}
                        validationSchema={validationSchema4}
                        onSubmit={(values, actions) => {
                            // alert('workign')
                            const { Address, City, State, Zip } = values
                            setUser({ ...user, address: Address, city: City, state: State, zip: Zip })
                            setUserToServer({ ...user, address: Address, city: City, state: State, zip: Zip })
                            // navigation.navigate('interestedIn', { Name, Designation, CurrentCompany, selectedDate, gender })
                            console.log('step4 data', Address + City + State + Zip)
                            navigation.navigate('resume')
                        }}
                    >
                        {Myform4}
                    </Formik>
                )

            default: return (<Text>default2</Text>)
        }
    }
    return (
        <View style={styles.mainContainer}>
            {/* {resumeSteps[step].component} */}
            <FormSteps />
        </View>
    )
}

export default CreateResume

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
    savebtn: {
        backgroundColor: Colors.green,
        margin: 14,

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
    },
    input: {
        marginBottom: 10
    }
})