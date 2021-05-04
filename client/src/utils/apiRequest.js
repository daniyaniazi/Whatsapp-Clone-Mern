import axios from 'axios'

export const postRequest = async (url, payload = {}) => {

    const data = await axios.post(url, payload).then(response => response.data)
        .catch(err => {

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
    const data = await axios.get(url).then(response => {
        return response.data
    })
        .catch(err => {
            return ({ error: err.msg })
        })

    return data
}