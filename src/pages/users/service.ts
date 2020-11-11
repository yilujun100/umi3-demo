import { request } from 'umi'

export const getRemoteList = async () => {
    return request('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get'
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}