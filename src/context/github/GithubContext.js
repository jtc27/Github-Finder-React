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

  // Set Loading
  const setLoading = () => 
    dispatch({
      type: 'SET_LOADING'
    })


  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext