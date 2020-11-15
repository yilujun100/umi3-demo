import React, { useState } from 'react'
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd'
import { connect } from 'umi'
import UserModal from './components/UserModal'
import {
    addRecord,
    editRecord
} from './service'

const UserListPage = ({ users, dispatch, userListLoading }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [record, setRecord] = useState(null)
    const handleClose = () => {
        setModalVisible(false)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <Popconfirm
                        title="Are you sure delete this user?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleDelete(record.id)
                        }}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const handleEdit = record => {
        setModalVisible(true)
        setRecord(record)
    }
    const handleDelete = id => {
        dispatch({
            type: 'users/delete',
            payload: {
                id
            }
        })
    }
    const handleFinish = async (values) => {
        let id = 0
        let serviceFun
        if (record) {
            id = record.id
        }
        if (id) {
            serviceFun = editRecord
        } else {
            serviceFun = addRecord
        }
        const result = await serviceFun({ id, values })
        if (result) {
            setModalVisible(false)
            message.success(`${id === 0 ? 'Add' : 'Edit'} Successfully.`)
            handleReset()
        } else {
            message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`)
        }
    }

    const handleReset = () => {
        dispatch({
            type: 'users/getRemote'
        })
    }

    const handleAdd = () => {
        setModalVisible(true)
        setRecord(undefined)
    }

    return (
        <div className="list-table">
            <Space style={{marginBottom: 10}}>
                <Button type="primary" onClick={handleAdd}>Add</Button>
            </Space>
            <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading} />
            <UserModal
                visible={modalVisible}
                record={record}
                closeHandler={handleClose}
                onFinish={handleFinish}
            />
        </div>
    )
}

// state里面除了users,还有router、loading
const mapStateToProps = ({ users, loading }) => ({
    users,
    userListLoading: loading.models.users
})

export default connect(mapStateToProps)(UserListPage)