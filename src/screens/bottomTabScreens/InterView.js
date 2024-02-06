import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Header from '../../components/Header'
import AxiosObj from '../../AxiosObj/AxiosObj'
import { UserContext } from '../../Context/Contex'
import JobApplied from '../../components/JobApplied'
import Job from '../../components/Job'
const InterView = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    const [jobList, setJobList] = useState(null);
    const fetchAppliedJobs = async () => {
        setLoader(true)
        try {
            const response = await AxiosObj.get("applied_job_list.php", { params: { "user_id": user.user_id } });
            if (response.data.error == false) {
                setJobList(response.data.data)
                console.log('joblist from server', jobList)
            }
            console.log('data from web', response.data);
            console.log('data in jobList', jobList);
        } catch (e) {
            console.log(e)
        } finally {
            setLoader(false)
        }
    }
    const JobList = () => {
        return (
            <View style={{ marginHorizontal: 8, paddingBottom: loader ? 90 : 60 }}>
                {!loader && jobList != null ? <FlatList
                    // numColumns={2}
                    data={jobList}
                    renderItem={(dataItem) => <JobApplied data={dataItem.item} navigation={navigation}
                    />}
                    keyExtractor={(item) => item.job_id}
                // onEndReachedThreshold={0.5}
                // onEndReached={fetchMoreData}
                /> :
                    <View style={{ marginBottom: 250 }}><ActivityIndicator /></View>}
            </View>
        )
    }
    useEffect(() => { fetchAppliedJobs() }, [])
    return (
        <>
            <Header navigation={navigation} component={<Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Interview</Text>} />
            {!loader && (jobList == null) ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, color: 'black' }} >No Interview Yet 😢</Text>
            </View>
                : <JobList />}
        </>
    )
}

export default InterView

const styles = StyleSheet.create({})