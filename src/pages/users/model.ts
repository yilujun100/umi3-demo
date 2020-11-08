/**
 * Model的结构和写法：
 * Model就是一个对象
 * reducers、effects、subscriptions里面是一个一个函数，注意：
 * 1.reducers里面的函数必须要有返回值，因为它是仓库返回给页面的最后异步，所以必须要有返回值
 * 2.effects里面的函数都是Generator,函数前面必须带星号，如果我们想在effect中找到reducer,可以通过put,但是这个时候对于Generator函数，没做一步都需要等一步，它是异步的，这个等就是yield
 *
 * ts配置除了能够约束代码规范以外，还能提示我们如何去写一些代码
 */
import { Reducer, Effect, Subscription } from 'umi'

interface IUserModel {
    namespace: 'users',
    state: {},
    reducers: {
        getList: Reducer
    },
    effects: {},
    subscriptions: {
        setup: Subscription
    }
}

const UserModel = {
    namespace: 'users', // model的唯一标识名
    state: {}, // 仓库初始值
    reducers: {
        getList(state, action) {
            // return newState;
            const data = [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ]
            return data
        }
    },
    effects: {
        // *functionName(action, effects) {
        //     yield put()
        // }
        *query({ payload }, { call, put }) {
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'getList',
                        // payload: {}
                    })
                }
            })
        }
    }
}

export default UserModel