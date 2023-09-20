import Background from '../assets/library.jpeg'

function Home() {
  return (
    <div 
      style={{ backgroundImage: `url(${ Background })`}} 
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex place-items-center h-screen'>
          <h3 className='text-2xl p-5 bg-black bg-opacity-80 text-white rounded'>Welcome To the Library</h3>
        </div>
    </div>
  )
}

export default Home