import { useLocation } from "react-router-dom";

export const getCurrentPage = () => {
    const location = useLocation()
    return location.pathname.substring(1)
}