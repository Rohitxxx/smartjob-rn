import { StyleSheet, Text, View, ScrollView, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, IconButton } from 'react-native-paper'
import Header from '../components/Header'
import Colors from '../constants/Colors'
import JobDetailComponent from '../components/JobDetailComponent'
import AxiosObj from '../AxiosObj/AxiosObj'
import Domain from '../Models/Domain'
import { UserContext } from '../Context/Contex'
const JobDetails = ({ navigation, route }) => {
    const [job, setJob] = useState(null)
    const [loader, setLoader] = useState(true)
    const { job_id } = route.params;
    const { user } = useContext(UserContext)
    const [applied, setApplied] = useState(0)
    const [applyLoader, setApplyLoader] = useState(false)
    const getJobDetails = async () => {
        setLoader(true)
        try {
            const response = await AxiosObj.get("job_detail.php", { params: { "job_id": job_id } });
            if (response.data.error == false)
                setJob(response.data.job_detail)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoader(false)
            console.log('job details', job)
            // console.log('job details', response.data.data)
        }
    }
    const applyJob = async () => {
        console.log('user in jobdetial', user)
        if (user.resume.trim() == '') {
            ToastAndroid.show('Please complete and upload your resume', ToastAndroid.LONG);
            navigation.navigate('resume')
        } else {
            if (applied == 1) {
                ToastAndroid.show('Already applied!', ToastAndroid.BOTTOM)
            } else {
                setApplyLoader(true)
                try {
                    let formdata = new FormData()

                    const config = {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Accept: "application/json",
                        }
                    };
                    formdata.append('user_id', user.user_id)
                    formdata.append('job_id', job_id)

                    const response = await AxiosObj.post("apply_job.php", formdata, config);
                    if (response.data.error == false)
                        setApplied(response.data.data)
                    console.log(response.data)
                } catch (e) {
                    console.log(e)
                } finally {
                    setApplyLoader(false)
                    console.log('job details', applied)
                    // console.log('job details', response.data.data)
                }
            }
        }

    }
    useEffect(() => { getJobDetails() }, [])
    const resolvePackage = () => {
        if (job.package == '')
            return 'Not disclosed'
        if (job.package)
            if (job.package.length <= 5 && job.package.length > 3)
                return "₹" + job.package.slice(0, job.package.length - 3) + "," + job.package.slice(job.package.length - 3, job.package.length) + ' /month'

    }
    return (
        <>
            <Header component={<IconButton icon='arrow-left' onPress={() => navigation.goBack()} size={25} iconColor='white' />} />
            {loader ? <ActivityIndicator /> :
                <><ScrollView style={styles.mainContainer} contentContainerStyle={{ justifyContent: 'flex-end' }}>
                    <View style={styles.titleContainer}>
                        <Image source={Domain.find((x) => x.id == job.domain).bigImg} style={{ height: 60, width: 60, margin: 15 }} resizeMode='contain' />
                        <View>
                            <Text style={styles.title}>{job.title}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={{ fontSize: 18, color: 'black', fontWeight: '800', marginRight: 9 }}>{resolvePackage()}</Text>
                                <IconButton icon={'heart-outline'} size={20} onPress={() => console.log('fav pressed')} style={{}} />
                            </View>
                        </View>
                    </View>
                    <View>
                        {job.name.trim() != '' ? <JobDetailComponent source={require('../assets/company.png')} title={job.name} description='' /> : null}
                        <JobDetailComponent source={require('../assets/job_type.png')} title='Job Type' description={job.job_type} />
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <JobDetailComponent source={require('../assets/location.png')} title='Location' description={job.location} />
                            <JobDetailComponent source={require('../assets/experience.png')} title='Experience' description={job.required_experience} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <JobDetailComponent source={require('../assets/qualification.png')} title='Qualification' description={job.required_qualification} />
                            <JobDetailComponent source={require('../assets/shift.png')} title='Shift' description='Day-shift' />
                        </View>
                        <JobDetailComponent
                            source={require('../assets/job.png')}
                            title='Job Description'
                            description={job.description} />
                        <JobDetailComponent
                            source={require('../assets/job.png')}
                            title='Job timing'
                            description='9:30am - 6:30am' />
                        <JobDetailComponent
                            source={require('../assets/location.png')}
                            title='Job Address'
                            description={job.location} />
                    </View>
                </ScrollView>
                    <Button style={{ backgroundColor: Colors.green, marginHorizontal: 10, marginBottom: 5 }} textColor='white' onPress={applyJob} >{applyLoader ? <ActivityIndicator /> : null}{applied == 1 ? 'Applied' : 'Apply'}</Button>
                </>
            }
        </>
    )
}

export default JobDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary700
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    opening: {
        borderRadius: 19,
        padding: 3,
        alignItems: 'center',
        marginHorizontal: 9,
        color: 'white',
        fontSize: 11
    }
})