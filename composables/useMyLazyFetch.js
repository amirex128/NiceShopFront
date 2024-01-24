export const useMyLazyFetch = (request, opts) => {
    const config = useRuntimeConfig()
    const authcookie = useCookie('auth:token');

    return useLazyFetch(request, {
        baseURL: config.public.baseURL,
        ...opts,
        headers: {
            ...opts.headers,
            'Authorization': `Bearer ${authcookie.value}`
        }
    })
}