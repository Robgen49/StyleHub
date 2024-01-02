import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import getLocation from "../utils/getLocation";

export default function useCity(): string {
    const [city, setCity] = useState("Rostov-on-Don");
    const location = useLocation();

    useEffect(() => {
        if (location.coordinates)
            getLocation(location.coordinates?.latitude, location.coordinates?.longtitude).then((address: string) => setCity(address))
    }, [])

    return city
}