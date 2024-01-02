export default function fetchCreateOrder(token: string) {
    const response = fetch('http://localhost:5000/order', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        }
    })
    return response
}