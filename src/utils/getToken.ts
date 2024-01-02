export default function getToken(): string {
    let token = ""
    document.cookie.split(';').some((element: string) => {
        if (element.split('=')[0] === 'token') {
            token = element.split('=')[1]
            return true
        }
    })
    return token
}