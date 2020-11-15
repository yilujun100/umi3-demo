import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'

const UserModal = props => {
    const { visible, record, closeHandler, onFinish } = props
    const [form] = Form.useForm()
    useEffect(() => {
        if (record === undefined) {
            form.resetFields()
        } else {
            form.setFieldsValue(record)
        }
    }, [visible])
    const onOk = () => {
        form.submit()
    }
    return (
        <div>
            <Modal
                title="User Modal"
                visible={visible}
                onOk={onOk}
                onCancel={closeHandler}
                forceRender
            >
                <Form
                    form={form}
                    name="userForm"
                    onFinish={onFinish}
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserModal
