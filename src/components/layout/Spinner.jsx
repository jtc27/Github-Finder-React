import spinner from './assets/loading.gif'

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img src={spinner} alt='loading...' width={180} className='text-center mx-auto'></img>
    </div>
  )
}

export default Spinner