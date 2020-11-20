import React, { FC, useState, useRef } from 'react'
import { Table, Tag, Space, Popconfirm, message, Button, Pagination } from 'antd'
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table'
import { connect, Dispatch, Loading, UserState } from 'umi'
import UserModal from './components/UserModal'
import {
    addRecord,
    editRecord
} from './service'
import { SingleUserType, FormValues } from './data.d'

interface UserPageProps {
    users: UserState;
    dispatch: Dispatch;
    userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [record, setRecord] = useState<SingleUserType | undefined>(undefined)
    const columns: ProColumns<SingleUserType>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            valueType: 'digit',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            valueType: 'text',
            render: (text: any) => <a>{text}</a>
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            valueType: 'dateTime',
            key: 'create_time'
        },
        {
            title: 'Action',
            key: 'action',
            valueType: 'option',
            render: (text: any, record: SingleUserType) => [
                <a onClick={() => handleEdit(record)}>Edit</a>,
                <Popconfirm
                    title="Are you sure delete this user?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(record.id)}
                >
                    <a>Delete</a>
                </Popconfirm>
            ]
        },
    ]
    const handleEdit = (record: SingleUserType) => {
        setModalVisible(true)
        setRecord(record)
    }
    const handleDelete = (id: number) => {
        dispatch({
            type: 'users/delete',
            payload: {
                id
            }
        })
    }
    const handleClose = () => {
        setModalVisible(false)
    }
    const handleFinish = async (values: FormValues) => {
        setConfirmLoading(true)
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
            setConfirmLoading(false)
        } else {
            setConfirmLoading(false)
            message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`)
        }
    }

    const handleReset = () => {
        dispatch({
            type: 'users/getRemote',
            payload: {
                page: users.meta.page,
                per_page: users.meta.per_page
            }
        })
    }

    const handleAdd = () => {
        setModalVisible(true)
        setRecord(undefined)
    }

    const handleReload = () => {
        dispatch({
            type: 'users/getRemote',
            payload: {
                page: users.meta.page,
                per_page: users.meta.per_page
            }
        })
    }

    const paginationHandler = (page: number, pageSize?: number) => {
        dispatch({
            type: 'users/getRemote',
            payload: {
                page,
                per_page: pageSize ? pageSize : users.meta.per_page
            }
        })
    }

    const pageSizeHandler = (current: number, size: number) => {
        dispatch({
            type: 'users/getRemote',
            payload: {
                page: current,
                per_page: size
            }
        })
    }

    return (
        <div className="list-table">
            <ProTable
                columns={columns}
                dataSource={users.data}
                rowKey="id"
                loading={userListLoading}
                search={false}
                pagination={false}
                options={{
                    density: true,
                    fullScreen: true,
                    reload: () => {
                        handleReload()
                    },
                    setting: true
                }}
                headerTitle="User List"
                toolBarRender={() => [
                    <Button type="primary" onClick={handleAdd}>Add</Button>,
                    <Button onClick={handleReload}>Reload</Button>
                ]}
            />
            <Pagination
                className="list-page"
                total={users.meta.total}
                onChange={paginationHandler}
                onShowSizeChange={pageSizeHandler}
                current={users.meta.page}
                pageSize={users.meta.per_page}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
            />
            <UserModal
                visible={modalVisible}
                record={record}
                closeHandler={handleClose}
                onFinish={handleFinish}
                confirmLoading={confirmLoading}
            />
        </div>
    )
}

// state里面除了users,还有router、loading
const mapStateToProps = ({
    users,
    loading
}: {
    users: UserState;
    loading: Loading;
}) => ({
    users,
    userListLoading: loading.models.users
})

export default connect(mapStateToProps)(UserListPage)