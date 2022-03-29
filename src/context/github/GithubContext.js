import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},  //object inside items array
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async(text) => {
    setLoading()  //calls loading spinner

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`) // Make a request

    const {items} = await response.json()
    //instead of data, we want the {items} array inside.  
    //{items} array contains profiles of search results

    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  //single user data
  const getUser = async(login) => {
    setLoading()  //calls loading spinner

    const response = await fetch(`${GITHUB_URL}/users/${login}`) // Make a request

    if(response.status ===404) { 
      window.location='/notfound'
    } else {

      const data = await response.json()
      //no {items} array, we just need data of single user
  
      dispatch({
        type: 'GET_USER',
        payload: data 
      })
    }

    
  }

  const setLoading = () => 
    dispatch({
      type: 'SET_LOADING'
    })

  const clearUsers = () => 
    dispatch({
      type: 'CLEAR_USERS',
    })

  return <GithubContext.Provider value={{    //listed values are available to jsx components
    users: state.users,
    user: state.user,
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext