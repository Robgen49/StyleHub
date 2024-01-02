export default function fetchSum(token: string) {
    const response = fetch('http://localhost:5000/cart-item/sum', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    })
    return response
}