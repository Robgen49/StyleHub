export default function fetchLogin(email: string, password: string) {
    const response = fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    return response
}