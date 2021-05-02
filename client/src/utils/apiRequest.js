import axios from 'axios'

export const postRequest = async (url, payload = {}) => {
    console.log("POST REQ", url, payload)
    const data = await axios.post(url, payload).then(response => response.data)
        .catch(err => {
            console.log("error", err)
            return ({ error: err.response.data })
        })

    return data
}


export const putRequest = async (url, payload = {}) => {
    const data = await axios.put(url, payload).then(response => response.data)
        .catch(err => ({ error: err.response.data }))
    return data

}


export const getRequest = async (url) => {
    const data = await axios.put(url).then(response => response.data)
        .catch(err => ({ error: err.response.data }))

    return data
}