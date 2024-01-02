export default function fetchCreateProduct(title: string, price: number, image: string, typeId: number, count: number, token: string) {
    const response = fetch('http://localhost:5000/product', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            count: count,
            typeId: typeId
        })

    })
    return response
}