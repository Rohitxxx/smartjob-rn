import { StyleSheet, Text, View, ActivityIndicator, FlatList, } from 'react-native'
import React, { useState, useEffect } from 'react'
import AxiosObj from '../AxiosObj/AxiosObj'
import Job from '../components/Job'
import Header from '../components/Header'
import { IconButton, Searchbar } from 'react-native-paper'

const SearchedJob = ({ navigation, route }) => {
    const name = route.params.name;
    const location = route.params.location
    const fetchJob = async () => {
        const response = await AxiosObj.get("recommended_job_list.php", { params: { "page": page, name: name } });
    }
    const JobList = () => {
        const [jobList, setJobList] = useState([])
        const [isMoreData, setIsMoreData] = useState(true);
        const [page, setPage] = useState(1);
        const [loader, setLoader] = useState(true);
        const fetchJobs = async () => {
            setLoader(true)
            try {
                console.log('page', page)
                console.log('name', name)
                const response = await AxiosObj.get("recommended_job_list.php", { params: { "page": page, name: name } });
                if (response.data.error == false) {
                    console.log('inside data error falsse')
                    setJobList([...jobList, ...response.data.data])
                    console.log('joblist from server', jobList)
                } else {
                    setIsMoreData(false)
                }
                console.log('data from web', response.data);
                console.log('data in jobList', jobList);
            } catch (e) {
                console.log(e)
            } finally {
                setLoader(false)
            }

        }
        const fetchMoreData = () => {
            if (isMoreData) {
                console.log('running fetchmodedata')
                setPage(page + 1)
                console.log(page);
            }
        }
        useEffect(() => { fetchJobs() }, [page])
        const NoDataHandler = () => {
            if (!isMoreData && jobList.length == 0)
                return <Text style={{ textAlign: 'center', fontSize: 22, }}>No Job found 😕</Text>
            else
                return null
        }
        return (
            <View style={{ marginHorizontal: 8, paddingBottom: 100 }}>
                <FlatList
                    data={jobList}
                    renderItem={(dataItem) => <Job data={dataItem.item} navigation={navigation} />}
                    keyExtractor={(item) => item.job_id}
                    onEndReachedThreshold={0.5}
                    onEndReached={fetchMoreData}
                />
                {loader ? <View style={{ marginBottom: 250 }}><ActivityIndicator /></View> : null}
                <NoDataHandler />
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation}
                component={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon='arrow-left' onPress={navigation.goBack} iconColor='white' size={22} />
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{name.length > 15 ? name.substring(0, 12) + '..' : name}</Text></View>} />
            <JobList navigation={navigation} />
        </View>
    )
}

export default SearchedJob

const styles = StyleSheet.create({})