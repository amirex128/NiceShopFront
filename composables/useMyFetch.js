import {showSuccess} from "~/utils/toast.js";

export const useMyFetch = (request, opts = {}) => {
    const config = useRuntimeConfig()
    const authcookie = useCookie('auth:token');
    return useFetch(request, {
        baseURL: config.public.baseURL,
        ...opts,
        headers: {
            ...opts.headers,
            'Authorization': `Bearer ${authcookie.value}`
        },
        onResponseError: (error) => {

            if (error.response._data.errorMessages) {
                error.response._data.errorMessages.forEach((errorMessage) => {
                    showError(errorMessage)
                })
            }
            if (error.response._data) {
                for (let key in error.response._data.errors) {
                    if (error.response._data.errors.hasOwnProperty(key)) {
                        error.response._data.errors[key].forEach((errorMessage) => {
                            showError(errorMessage);
                        });
                    }
                }
            }

        },
        onResponse: (response) => {
            if (response.response.status === 401) {
                showError('You are not authorized to view this page')
                router.push('/auth/login')
            }
            if (response.response.status === 403) {
                showError('You are not authorized to view this page')
                router.push('/auth/login')
            }
            if (response.response.status === 404) {
                showError('Page not found')
                router.push('/auth/login')
            }
            if (response.response.status === 200) {

                if (response.response._data.successMessages) {
                    response.response._data.successMessages.forEach((successMessage) => {
                        showSuccess(successMessage)
                    })
                }
            }
        }
    })
}