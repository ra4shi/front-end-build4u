import axios from "axios";
const client = axios.create({ baseURL: "https://buildforyou.site" })
export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error  
    }

    return client(options).then(onSuccess).catch(onError)
}


const local = axios.create({ baseURL: "https://buildforyou.site" })
export const localRequest = ({ ...options }) => {
    local.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('localtoken')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return local(options).then(onSuccess).catch(onError)
}

const admin = axios.create({ baseURL: "https://buildforyou.site" })
export const adminRequest = ({ ...options }) => {
    admin.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('admin_Secret')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return admin(options).then(onSuccess).catch(onError)
}   