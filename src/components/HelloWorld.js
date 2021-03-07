import { useHistory } from "react-router-dom"

export const HelloWorld = () => {
    let history = useHistory()
    const handleDeleteCookie = () => {
        document.cookie = `token=; max-age=-1; path=/`;
        history.push('/login')
    }
    return (
        <div>
            <h1>Hello World 1</h1>
            <h2>Hello World 2</h2>
            <button onClick={handleDeleteCookie}>Clear Cookie</button>
        </div>
    )
}