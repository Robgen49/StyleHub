export default function fetchProductInfo(id: number) {
    const response = fetch('http://localhost:5000/product/' + id, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    return response
}