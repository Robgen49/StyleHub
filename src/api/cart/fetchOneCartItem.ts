export default function fetchOneCartItem(token: string, productId: number) {
    const response = fetch('http://localhost:5000/cart-item/' + productId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    })
    return response
}