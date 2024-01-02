export default function fetchAddCartItem(productId: number, token: string, count: number) {
    const response = fetch('http://localhost:5000/cart-item/' + productId, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            count: count
        })
    })
    return response
}