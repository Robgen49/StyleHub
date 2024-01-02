export default function fetchProducts() {
    const response = fetch('http://localhost:5000/product', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    return response
}