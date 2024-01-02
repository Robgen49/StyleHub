export default function setToken(token: string):void {
    document.cookie = `token=${token};`
}