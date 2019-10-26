An application to test Asynchronous API requests using redux

Using - Redux, Redux-Thunk & Axios

|| STATE ||

State = {
    loading: true,
    data: [],
    error: ''
}

loading - E.g - Displays a loading spinner in your component
data - This would be the list of users
error - Displays an error message to the user

|| ACTIONS ||

FETCH_USER_REQUEST = Fetch list of users
FETCH_USER_SUCCESS = Fetched successfully
FETCH_USER_FAILURE = Error fetching the data

|| REDUCERS ||

case: FETCH_USER_REQUEST
    loading: true

case: FETCH_USER_SUCCESS
    loading: false,
    users: data (from API)

case: FETCH_USER_FAILURE
    loading: false,
    error: error (from API)