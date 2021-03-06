import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

function UserSearch() {
  const [text, setText] = useState('')

  const {users, searchUsers, clearUsers} = useContext(GithubContext)
  // pulls the values from Context Provider that we want to use in this component

  const {setAlert} = useContext(AlertContext)
  // pulls the values from Context Provider that we want to use in this component

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text ==='') {
      setAlert('Field is empty', 'error')
    } else {
      searchUsers(text)

      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input type="text" 
              className="w-full pr-40 gb-white-200 input input-lg text-black" 
              placeholder='search'
              value={text}
              onChange={handleChange}
              />
              <button
              type ='submit'
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
              Go
              </button>
            </div>
          </div>
        </form>

      </div>
      <div>

      {users.length >0 && (<button
            onClick={clearUsers}
            className='btn btn-ghost btn-lg'>
          Clear 
         </button>)} {/*shows clear button only if users in the state */}

      </div>
    </div>
  )
}

export default UserSearch