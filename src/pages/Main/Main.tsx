// import cls from './Main.module.scss'
import Header from "../../components/Header/Header"
import AppBar from "../../components/AppBar/AppBar";
// import useCity from "../../hooks/useCity"

const Main = () => {

    // const city = useCity()
    const city = "Москва";

    return (
        <>
            <Header city={city}></Header>
            <AppBar></AppBar>
        </>
    )
}
export default Main