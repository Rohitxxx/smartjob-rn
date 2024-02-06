import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header'
import FilterBox from '../../components/FilterBox'
import FilterList from '../../components/FilterList'
import SortList from '../../components/SortList'
import { Chip, } from 'react-native-paper'
import Colors from '../../constants/Colors'
import AxiosObj from '../../AxiosObj/AxiosObj'
import { ActivityIndicator } from 'react-native-paper';
import Job from '../../components/Job'
import { UserContext } from '../../Context/Contex'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [selectedFilter, setselectedFilter] = useState('')
    const [selectedSort, setSelectedSort] = useState('created_at DESC')
    const { user } = useContext(UserContext);

    const domainChipList = [
        'All', 'Software/Web Developer', 'Engineers(Civil, Mechanical etc)', 'Tele-Calling/BPO', 'Medical(Doctor/Nurse/Compounder)', 'Marketing', 'Technician(ITI)', 'Back Office', 'Delivery', 'Business Development', 'Driver', 'Human Resource', 'Hospitality/Host/Hostess', 'Store/stock Management'
    ];
    const [domain, setDomain] = useState(user != null ? domainChipList[parseInt(user.domain)] : 'All');
    const JobList = () => {
        const [jobList, setJobList] = useState([])
        const [isMoreData, setIsMoreData] = useState(true);
        const [page, setPage] = useState(1);
        const [loader, setLoader] = useState(true);
        const fetchJobs = async () => {
            setLoader(true)
            console.log(domain)
            console.log(domainChipList.indexOf(domain))
            try {
                let data = { params: { "domain": domainChipList.indexOf(domain) != 0 ? domainChipList.indexOf(domain) : '', "page": page, "filter": selectedFilter, "sort": selectedSort } }
                const response = await AxiosObj.get("recommended_job_list2.php", data);
                console.log('check', data)
                if (response.data.error == false) {
                    console.log('inside data error false')
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
        useEffect(() => { fetchJobs(); console.log('user in home', domain) }, [page])
        useEffect(() => {
            console.log('filter ', selectedFilter)
        }, [selectedFilter])
        const NoDataHandler = () => {
            if (!isMoreData && jobList.length == 0)
                return <Text style={{ textAlign: 'center', fontSize: 22, }}>No Job found 😕</Text>
            else
                return null
        }

        return (
            <View style={{ marginHorizontal: 8, paddingBottom: loader ? 190 : 160 }}>
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

    const searchClick = () => {
        navigation.navigate('search')
    }
    const filterClick = () => {
        setModalVisible(true);

    }
    const sortClick = () => {
        setSortModalVisible(true)
    }

    const FilterModal =
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <ScrollView style={styles.modalView}>
                        <Text style={styles.modalText}>
                            <Ionicon name='funnel-outline' size={22} color={Colors.primary700} />
                            {' '}Filter
                        </Text>

                        <FilterList getSelectedfilter={(item) => { setselectedFilter(item.location.label + ' ' + item.salary.value) }} />
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle2}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => { setModalVisible(!modalVisible); setselectedFilter('') }}
                            >
                                <Text style={styles.textStyle}>Clear Filter</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonOpen, { marginTop: 20 }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Apply Filter</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    const SortModal =
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={sortModalVisible}
                onRequestClose={() => {
                    // alert("Modal has been closed.");
                    setModalVisible(!sortModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            <Ionicon name='filter' size={22} color={Colors.primary700} />
                            {' '}Sort Jobs</Text>
                        <SortList getSelectedRadio={(item) => { setSelectedSort(item.value) }} />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setSortModalVisible(!sortModalVisible)}
                            >
                                <Text style={styles.textStyle2}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setSortModalVisible(!sortModalVisible)}
                            >
                                <Text style={styles.textStyle}>Sort </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    const toggleChip = (item) => {
        setDomain(item)
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Header navigation={navigation} component={<Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Home</Text>} />
            <FilterBox searchClick={searchClick} filterClick={filterClick} sortClick={sortClick} />
            <View style={{ paddingVertical: 3, }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={domainChipList}
                    renderItem={(itemdata) => {
                        return (
                            <Chip onPress={toggleChip.bind(this, itemdata.item)} style={[styles.chipStyle, itemdata.item == domain ? styles.selectedChip : null]} selected={itemdata.item == domain ? true : false} ><Text style={{ color: itemdata.item == domain ? 'white' : 'black', }}>{itemdata.item}</Text></Chip>
                        )
                    }
                    }
                    keyExtractor={(item) => item} horizontal={true}

                />
            </View>

            <JobList navigation={navigation} domain={domainChipList.indexOf(domain)} />
            {modalVisible ? FilterModal : null}
            {sortModalVisible ? SortModal : null}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
    },
    button: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 3
    },
    buttonOpen: {
        backgroundColor: "#2196f3",
    },
    buttonClose: {
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: "#fff",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle2: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: 'bold'
    },
    chipStyle: {
        flex: 1,
        margin: 2,
        marginHorizontal: 3,
        backgroundColor: 'white',
        borderColor: 'black', borderWidth: 1
    },
    selectedChip: {
        backgroundColor: Colors.primary700,
        color: 'white',
        borderColor: 'black', borderWidth: 1
    }
});

