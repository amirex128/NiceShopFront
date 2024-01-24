import moment from 'moment-jalaali'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            moment
        }
    }
})