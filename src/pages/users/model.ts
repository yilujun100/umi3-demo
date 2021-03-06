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
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service'
import { message } from 'antd'
import { SingleUserType } from './data.d'

export interface UserState {
    data: SingleUserType[];
    meta: {
        total: number;
        per_page: number;
        page: number;
    };
}
interface UserModelType {
    namespace: 'users';
    state: UserState;
    reducers: {
        getList: Reducer<UserState>
    };
    effects: {
        getRemote: Effect;
        delete: Effect;
    };
    subscriptions: {
        setup: Subscription;
    };
}

const UserModel: UserModelType = {
    namespace: 'users', // model的唯一标识名
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 5,
            page: 1
        }
    }, // 仓库初始值
    reducers: {
        getList(state, { payload }) {
            // return newState;
            return payload
        }
    },
    effects: {
        // *functionName(action, effects) {
        //     yield put()
        // }
        *getRemote({ payload: { page, per_page } }, { put, call }) {
            const data = yield call(getRemoteList, { page, per_page })
            if (data) {
                yield put({
                    type: 'getList',
                    payload: data
                })
            }
        },
        *delete({ payload: {id} }, { put, call, select }) {
            const data = yield call(deleteRecord, { id })
            if (data) {
                message.success('Delete successfully.')
                const { page, per_page } = yield select((state: any) => state.users.meta.page)
                yield put({
                    type: 'getRemote',
                    payload: {
                        page,
                        per_page
                    }
                })
            } else {
                message.error('Delete failed.')
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'getRemote',
                        payload: {
                            page: 1,
                            per_page: 5
                        }
                    })
                }
            })
        }
    }
}

export default UserModel