import React, { useState } from 'react'
import { Table, Tag, Space } from 'antd'
import { connect } from 'umi'
import UserModal from './components/UserModal'

const Users = ({ users }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [record, setRecord] = useState(null)
    const handleEdit = record => {
        setModalVisible(true)
        setRecord(record)
    }
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
                    <a>Delete</a>
                </Space>
            ),
        },
    ]

    return (
        <div className="list-table">
            <Table columns={columns} dataSource={users.data} />
            <UserModal visible={modalVisible} record={record} closeHandler={handleClose} />
        </div>
    )
}

// state里面除了users,还有router、loading
const mapStateToProps = ({ users }) => ({
    users
})

export default connect(mapStateToProps)(Users)