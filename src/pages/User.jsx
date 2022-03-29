import { useEffect, useContext } from "react" 
import GithubContext from "../context/github/GithubContext"

import {useParams} from 'react-router-dom' //match not working in react router v.6

function User() {

  const {user, getUser} = useContext(GithubContext)
  //getUser function and user.state

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  return (
    <div>{user.login}</div>
  )
}

export default User