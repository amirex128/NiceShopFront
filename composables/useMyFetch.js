
export const useMyFetch = (request, opts) => {
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
            console.log("ssssssssssssssssssssssssss")
        }
    })
}