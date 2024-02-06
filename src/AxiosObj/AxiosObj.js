import Axios from "axios"

const AxiosObj = Axios.create({ baseURL: 'https://www.smartjob.info/rest_api/' })

export default AxiosObj;