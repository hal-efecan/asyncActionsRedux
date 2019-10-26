// Requirments
const redux = require('redux');
const createStore = redux.createStore; 
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');

// Initial state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// Type defined as a string literal
FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// Action setters
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// Reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

// define async action creator
const fetchUsers = () => {
    // Thunk allows an action creator to return a fn instead of an action object
    return function(dispatch) {
    // fn doesn't have to be pure - Allowed to have side affects such as async API calls 
    // can dispatch actions like before
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            // response.data is the user array
            const users = response.data.map(users => users.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            // error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

// Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// Subscribe
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())

