export const useToast = () => {
    const toastSuccess = (msg: string) => {
        ElMessage({
            message: h('p', null, [
                h('span', null, msg),
            ]),
            type: 'success'
        })
    }
    const toastError = (msg: string) => {
        ElMessage({
            message: h('p', null, [
                h('span', null, msg),
            ]),
            type: 'warning'
        })
    }
    return {
        toastSuccess,
        toastError
    }
}
