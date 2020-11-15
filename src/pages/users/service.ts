import request, { extend } from 'umi-request'
import { message } from 'antd'

const errorHandler = function(error) {
    if (error.response) {
        if (error.response.status > 400) {
            message.error(error.data.message ? error.data.message : error.data)
        }
    } else {
        // 请求初始化时出错或者没有响应返回的异常
        message.error('Network Error.')
    }
    throw error // 如果throw. 错误将继续抛出.

    // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
    // return {some: 'data'};
}

const extendRequest = extend({ errorHandler })

// 获取用户列表
export const getRemoteList = async () => {
    return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get'
    }).then(res => {
        return res
    }).catch(err => {
        return false
    })
}

// 用户新增
export const addRecord = async ({ values }) => {
    return extendRequest('http://public-api-v1.aspirantzhang.com/users/', {
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
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
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
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'delete'
    }).then(res => {
        return true
    }).catch(err => {
        return false
    })
}