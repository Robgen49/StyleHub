export default function fetchCartItems(token: string) {
    const response = fetch('http://localhost:5000/cart-item', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    })
    return response
}