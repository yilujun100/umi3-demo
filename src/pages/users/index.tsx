import React, { FC, useState, useRef } from 'react'
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd'
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table'
import { connect, Dispatch, Loading, UserState } from 'umi'
import UserModal from './components/UserModal'
import {
    addRecord,
    editRecord,
    getRemoteList
} from './service'
import { SingleUserType, FormValues } from './data.d'

interface UserPageProps {
    users: UserState;
    dispatch: Dispatch;
    userListLoading: boolean;
}

interface ActionType {
    reload: () => void;
    fetchMore: () => void;
    reset: () => void;
}

const UserListPage: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [record, setRecord] = useState<SingleUserType | undefined>(undefined)
    const ref = useRef<ActionType>()
    const handleClose = () => {
        setModalVisible(false)
    }
    const columns: ProColumns<SingleUserType>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: SingleUserType) => (
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
    const handleFinish = async (values: FormValues) => {
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

    const requestHandler = async ({ pageSize, current }) => {
        const users = await getRemoteList({ page: current, per_page: pageSize })
        return {
            data: users.data,
            success: true
        }
    }

    const handleReload = () => {
        ref.current.reload()
    }

    return (
        <div className="list-table">
            <Space style={{marginBottom: 10}}>
                <Button type="primary" onClick={handleAdd}>Add</Button>
                <Button onClick={handleReload} style={{marginLeft: 10}}>Reload</Button>
            </Space>
            <ProTable
                columns={columns}
                dataSource={users.data}
                rowKey="id"
                loading={userListLoading}
                request={requestHandler}
                search={false}
                actionRef={ref}
            />
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