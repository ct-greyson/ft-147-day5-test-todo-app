import React, { useState } from 'react'
import axios from "axios";

const TodoForm = () => {
    const [todo, setTodo] = useState({
        title: "",
        body: "",
        userId: ""
    })

    const handleChange = (event) => {

        // destructure so we have easy access to name and value
        let { name, value } = event.target;
        // allows us to copy the properties of our object easily into another
        const newTodo = {...todo}

        // convert userId to a number
        if (name === "userId") {
            value = parseInt(value)
        }

        // update our newTodo object
        // going through each individual key and setting it to the matching name value
        // for(let key of Object.keys(newTodo)) {
        //     if(key === name){
        //         newTodo[key] = value;
        //     }
        // }

        // REFACTOR!
        newTodo[name] = value;

        setTodo(newTodo)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const response = axios.post("https://jsonplaceholder.typicode.com/todos", todo, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log(response)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='title' placeholder='title' onChange={handleChange}/>
            <input type="text" name='body' placeholder='body' onChange={handleChange}/>
            <input type="text" name='userId' placeholder='userId' onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default TodoForm