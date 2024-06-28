import React from 'react'
import axios from "axios";

const ButtonAPICall = () => {
    const fetchTodos = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")

        console.log(response)
    }

  return (
    <div>
        <h3>sneaky header hehehe</h3>
        <button onClick={fetchTodos}>Fetch Todos</button>
    </div>
  )
}

export default ButtonAPICall