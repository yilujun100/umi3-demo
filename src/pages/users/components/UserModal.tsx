import React from 'react'
import { Modal } from 'antd'

const UserModal = props => {
    const { visible, record, closeHandler } = props
    return (
        <div>
            <Modal
                title="User Modal"
                visible={visible}
                onOk={closeHandler}
                onCancel={closeHandler}
            >
                {JSON.stringify(record)}
            </Modal>
        </div>
    )
}

export default UserModal
