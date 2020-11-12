import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'

const UserModal = props => {
    const { visible, record, closeHandler } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(record)
    }, [visible])
    return (
        <div>
            <Modal
                title="User Modal"
                visible={visible}
                onOk={closeHandler}
                onCancel={closeHandler}
                forceRender
            >
                <Form
                    form={form}
                    name="userForm"
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
