import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            name: '',
            email: '',
            token: '',
            isLogin: false
        }
    },

    actions: {
        setName(name) {
            this.name = name
        },

        setEmail(email) {
            this.email = email
        },

        setToken(token) {
            this.token = token
        },

        setIsLogin(isLogin) {
            this.isLogin = isLogin
        }
    },

    persist: true,
})