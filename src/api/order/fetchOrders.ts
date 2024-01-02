export default function fetchGetOrders(token: string) {
    const response = fetch('http://localhost:5000/order/user', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    })
    return response
}