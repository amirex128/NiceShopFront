export const useToast = defineStore('toastStore', () => {
        const active = ref(false)
        const text = ref('')
        const color = ref('')

        function showError(message) {
            active.value = true
            text.value = message
            color.value = 'error'
        }

        function showSuccess(message) {
            active.value = true
            text.value = message
            color.value = 'success'
        }

        function showWarning(message) {
            active.value = true
            text.value = message
            color.value = 'warning'
        }

        return {
            active,
            text,
            color,
            showError,
            showSuccess,
            showWarning,
        }
    }
)
