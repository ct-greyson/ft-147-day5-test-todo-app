import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonAPICall from "../components/ButtonAPICall";
import axios from "axios";

// create a mock of our axios call so we don't make actual API calls
jest.mock("axios");


// describe block allows us to give a general name to what we'll be testing for and keep those tests together
describe("ButtonAPICall Component Test", () => {
  /* UNIT TEST */  
  // takes in a description of the test, and then the function to test the test itself
  // the description should be specific and concise
  test("fetches data from API call made with button click", async () => {
    /* SET UP RESPONSE */

    // make a mock data variable that will be treated as a fake API response
    // this is the data we know we need back but because we are not actually making an API call, we have to mock it ourselves
    const mockResponse = { data: [{ id: 1, title: "Walk dog" }] };
    // when we make a get request with axios, this is the value we should receive as our response
    axios.get.mockResolvedValue(mockResponse);

    /* RENDER OUR FAKE COMPONENT/CLICK OUR BUTTON */
    // this render is faking what will be on our dom
    const { getByText } = render(<ButtonAPICall />);
    // searches for element with text "Fetch Todos" and if found, click that element
    fireEvent.click(getByText("Fetch Todos"));

    /* WHAT WE EXPECT TO HAPPEN AFTER OUR EVENT HAS OCCURRED */
    // after our button is clicked, this axios event should be triggered with this specific URL
    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos")
    })

  });

  /* SNAPSHOT/UI TEST */
  test('button matches snapshot', () => {
    // DOM fragment of what we are trying to render
    // this code takes the snapshot of our button
    const { asFragment } = render(<ButtonAPICall />)
    // checks if button looks the same as what it did when we first captured our snapshot
    expect(asFragment()).toMatchSnapshot();
  })
});
