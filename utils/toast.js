

export const showError = (message) => {
    const toast = useToast();
    toast.showError(message)
}

export const showSuccess = (message) => {
    const toast = useToast();

    toast.showSuccess(message)
}

export const showWarning = (message) => {
    const toast = useToast();
    
    toast.showWarning(message)
}