import store from "../redux/store"

const admins = ['yumi', 'diego', 'lucas']

export default class Utils {
    public static isAdmin = () => {
        return admins.includes(store.getState().user.user.name)
    }
}