import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import TodoForm from "../components/TodoForm"

jest.mock("axios");

/* INTEGRATION/SERVICE TEST */
// test that combines multiple steps
describe("TodoForm Component Test", () => {
    test('submitting todo input from form to API', async () => { 
        const mockResponse = { data: [
            { id: 100, title: "Clean kitchen", body: "wash dishes, mop floor, organize shelves, clean our freezer", userId: 1}
        ]}
        axios.post.mockResolvedValue(mockResponse);

        // use getByText to find submit button
        // use getByPlaceholderText to find inputs in our form
        // 1 input for title, 1 input for body
        const { getByText, getByPlaceholderText } = render(<TodoForm />)

        // fill out our form inputs with matching placeholder text with their corresponding values
        fireEvent.change(getByPlaceholderText("title"), {
            target: { name: "title", value: "Clean kitchen" }
        })

        fireEvent.change(getByPlaceholderText("body"), {
            target: { name: "body", value: "wash dishes, mop floor, organize shelves, clean our freezer" }
        })

        fireEvent.change(getByPlaceholderText("userId"), {
            target: { name: "userId", value: "1" }
        })

        //Submit
        // searches for submit button and clicks it
        fireEvent.click(getByText("Submit"))

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', 
                {
                    title: "Clean kitchen",
                    body: "wash dishes, mop floor, organize shelves, clean our freezer",
                    userId: 1
                },
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )
        })
    })
})