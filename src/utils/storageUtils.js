import store from 'store'
const USER_KEY = 'user_key'
export default {
    /*
    * 保存 user
    * 读取 user
    * 删除 user
    * */
    saveUser(user) {
        store.set(USER_KEY, user)
    },

    getUser() {
        return store.get(USER_KEY) || {}
    },

    removeUser() {
        store.remove(USER_KEY)
    }
}