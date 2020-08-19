GitHub Issues Explorer is a simple web application that allows a user view and manage his repositories and issues. <br />
It was created using [Create React App](https://github.com/facebook/create-react-app).

## Application Requirements
This application requires a GitHub personal access token for full functionality. Please get one [here](https://github.com/settings/tokens).<br/>



## Design && Implementation Details

### User-Facing Features Implemented
- Mobile-first user interface.
- Drag and drop functionality for sorting issues.
- Client-side persistence of issues sort order using sessionStorage.
- Basic error handling for case where invalid token is provided.

### Tools/Libraries
- DateTime manipulation: [date-fns](https://date-fns.org/) over [moment](https://momentjs.com/) because the former has a reduced size and supports tree-shaking. See more details [here](https://github.com/you-dont-need/You-Dont-Need-Momentjs).

- Drag and drop sorting: [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd).

- State Management: [redux](https://redux.js.org/) and [redux-logic](https://github.com/jeffbski/redux-logic).<br />



## Running the Project
The following are steps to run the project:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`
Builds the app for production to the `build` folder.<br />
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.<br />



## Future Work

### Possible Features
- Improved form validation and stricter client-side checks for user tokens.
- Option to save access token so user doesn't have to enter it every time they visit the page.
- Option for user to specify number of items to be fetched per API call.
- Toggle option to allow user switch between original issues order and personalized issues sort order.
- Better robust error-handling with more user-friendly error messages.
- Improved support for more breakpoints.

### Other Improvements
- Increase test coverage for the modules and components. Test coverage is currently less than 10%.
- Add linter and prettier for better code formatting.
