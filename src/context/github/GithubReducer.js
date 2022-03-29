

const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }

    case 'GET_USER': //single user data
      return {
        ...state,
        user: action.payload, //user, not users
        loading: false
      }

    case 'GET_REPOS': //single user repo data
      return {
        ...state,
        repos: action.payload, 
        loading: false
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }

    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        loading: false
      }  

    default:
      return state
  }
}

export default githubReducer