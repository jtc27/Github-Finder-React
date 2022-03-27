import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
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

  const setLoading = () => 
    dispatch({
      type: 'SET_LOADING'
    })

  const clearUsers = () => 
    dispatch({
      type: 'CLEAR_USERS',
      payload: []
    })

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers,
    clearUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext