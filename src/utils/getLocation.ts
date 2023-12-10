export default function getLocation(lat: number, lon: number): Promise<string> {
    const url = "#https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    const token = "#e61fdeeefd83e68eb39f48efe488b07072fad28d";
    const query = { lat: lat, lon: lon };

    const options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    }

    return fetch(url, options)
        .catch(error => error)
        .then(response => response.text())
        .then(result => JSON.parse(result)["suggestions"][0]["data"]["city"])
}