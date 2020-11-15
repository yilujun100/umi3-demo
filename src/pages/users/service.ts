import { request } from 'umi'

// 获取用户列表
export const getRemoteList = async () => {
    return request('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get'
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}

// 用户新增
export const addRecord = async ({ values }) => {
    return request('http://public-api-v1.aspirantzhang.com/users/', {
        method: 'post',
        data: values
    }).then(res => {
        return true
    }).catch(err => {
        return false
    })
}

// 用户编辑
export const editRecord = async ({
    id,
    values
}) => {
    return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'put',
        data: values
    }).then(res => {
        return true
    }).catch(err => {
        return false
    })
}

// 用户删除
export const deleteRecord = async ({ id }) => {
    return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'delete'
    }).then(res => {
        return true
    }).catch(err => {
        return false
    })
}