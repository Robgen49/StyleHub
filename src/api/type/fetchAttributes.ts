export default function fetchAttributes(typeId: number) {
    const response = fetch('http://localhost:5000/type/' + typeId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
    })
    return response
}