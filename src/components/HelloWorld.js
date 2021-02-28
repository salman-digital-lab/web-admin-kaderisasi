import { useHistory } from "react-router-dom"

export const HelloWorld = () => {
    let history = useHistory()
    return (
        <div>
            <h1>Hello World 1</h1>
            <h2>Hello World 2</h2>
            <button onClick={()=> {localStorage.removeItem("token");history.push("/login")}}>Clear LocalStorage</button>
        </div>
    )
}