export default function fetchCompleteOrder(token: string, orderId: number) {
    const response = fetch('http://localhost:5000/order/' + orderId, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        }
    })
    return response
}