import { FlatList, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Job from './Job'
import AxiosObj from '../AxiosObj/AxiosObj';
import { ActivityIndicator } from 'react-native-paper';

const JobList = ({ navigation, domain }) => {
    // const JOBLIST = [
    //     {
    //         "id": 1,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 2,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 3,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 4,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 5,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 6,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     }, {
    //         "id": 7,
    //         "title": "Android Developer",
    //         "sarary": '19k / month',

    //     },
    // ];
    const [jobList, setJobList] = useState([])
    const [isMoreData, setIsMoreData] = useState(true);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [domainSelected, setDomainSelected] = useState(domain++)
    const fetchJobs = async () => {
        setLoader(true)
        console.log(domain)
        try {
            const response = await AxiosObj.get("recommended_job_list.php", { params: { "domain": domainSelected, "page": page } });
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
        <View style={{ marginHorizontal: 8, paddingBottom: 150 }}>
            <FlatList
                data={jobList}
                renderItem={(dataItem) => <Job data={dataItem.item} navigation={navigation} />}
                keyExtractor={(item) => item.job_id}
                onEndReachedThreshold={0.5}
                onEndReached={fetchMoreData}
            />
            <NoDataHandler />
            {loader ? <View style={{ marginBottom: 250 }}><ActivityIndicator /></View> : null}
        </View>
    )
}

export default JobList

