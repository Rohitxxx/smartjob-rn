import AsyncStorage from '@react-native-async-storage/async-storage';
class MyStore {
    static storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            console.log('(store)data to saved ', value)
            await AsyncStorage.setItem('user', jsonValue)
            console.log('data saved')
        } catch (e) {
            // saving error
            console.log('data not saved')
        }
    }
    static getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user')
            return jsonValue;
            // console.log('jsonvalue', jsonValue);
            // return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            console.log('error while fetching data from local')
        }
    }
    static removeData = async () => {
        try {
            await AsyncStorage.removeItem('user');
            return true;
        }
        catch (exception) {
            return false;
        }
    }
}
export default MyStore