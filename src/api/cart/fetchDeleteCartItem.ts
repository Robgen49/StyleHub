export default function fetchDeleteCartItem(productId: number, token: string) {
    const response = fetch('http://localhost:5000/cart-item/' + productId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    })
    return response
}