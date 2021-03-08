<<<<<<< HEAD
export const HelloWorld = () => {
=======
import { useHistory } from "react-router-dom"

export const HelloWorld = () => {
    let history = useHistory()
    const handleDeleteCookie = () => {
        document.cookie = `token=; max-age=-1; path=/`;
        history.push('/login')
    }
>>>>>>> ADD/authentication
    return (
        <div>
            <h1>Hello World 1</h1>
            <h2>Hello World 2</h2>
<<<<<<< HEAD
=======
            <button onClick={handleDeleteCookie}>Clear Cookie</button>
>>>>>>> ADD/authentication
        </div>
    )
}