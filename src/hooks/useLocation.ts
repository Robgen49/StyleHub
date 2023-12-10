import { useState, useEffect } from "react";

export interface ILocation {
    loaded: boolean,
    coordinates?: Coordinates
    error?: Error
}

export interface Coordinates {
    latitude: number,
    longtitude: number
}

export interface Error {
    code: number,
    message: string
}

const useLocation = () => {

    const [location, setLocation] = useState<ILocation>({
        loaded: false
    })

    const onSucess = (location: GeolocationPosition) => {
        setLocation({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longtitude: location.coords.longitude,
            }
        })
    }

    const onError = (error: Error) => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {

            onError({
                code: 0,
                message: "Geolocation is not supported"
            })

        }

        navigator.geolocation.getCurrentPosition(onSucess, onError)

    }, [])

    return location
}

export default useLocation