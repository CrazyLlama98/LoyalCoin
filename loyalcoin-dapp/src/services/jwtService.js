import {
    TOKEN_STORAGE_KEY
} from "../utils/constants"

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const saveToken = (token) => localStorage.setItem(TOKEN_STORAGE_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

export default {
    getToken,
    saveToken,
    removeToken
}