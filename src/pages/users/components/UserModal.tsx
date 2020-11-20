import React, { FC, useEffect } from 'react'
import { Modal, Form, Input, message, DatePicker, Switch } from 'antd'
import { SingleUserType, FormValues } from '../data.d'
import moment from 'moment'

interface UserModalProps {
    visible: boolean;
    record: SingleUserType | undefined;
    closeHandler: () => void;
    onFinish: (values: FormValues) => void;
    confirmLoading: boolean;
}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const UserModal: FC<UserModalProps> = props => {
    const { visible, record, closeHandler, onFinish, confirmLoading } = props
    const [form] = Form.useForm()
    useEffect(() => {
        if (record === undefined) {
            form.resetFields()
        } else {
            form.setFieldsValue({
                ...record,
                create_time: moment(record.create_time),
                status: Boolean(record.status)
            })
        }
    }, [visible])
    const onOk = () => {
        form.submit()
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo.errorFields[0].errors[0])
    }
    return (
        <div>
            <Modal
                title={record ? 'Edit ID: ' + record.id : 'Add'}
                visible={visible}
                onOk={onOk}
                onCancel={closeHandler}
                forceRender
                confirmLoading={confirmLoading}
            >
                <Form
                    {...layout}
                    form={form}
                    name="userForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        status: true
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Create Time"
                        name="create_time"
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserModal
