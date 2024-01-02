export default function fetchRegistration(email: string, password: string) {
    const response = fetch('http://localhost:5000/auth/registration', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    return response
}