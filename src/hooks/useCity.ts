import { useState } from "react";
import useLocation from "./useLocation";
import getLocation from "../utils/getLocation";

export default function useCity(): string {
    const location = useLocation();
    const [city, setCity] = useState("Москва");
    if (location.coordinates)
        getLocation(location.coordinates?.latitude, location.coordinates?.longtitude).then((address: string) => setCity(address))
    return city
}