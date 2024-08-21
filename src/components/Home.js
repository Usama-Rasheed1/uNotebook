import Notes from './Notes';


const Home = (props) => {
  
  const {showAlert} = props

  return (
    <div className='container'>
      <h1 className='text-primary'><strong>Welcome To uNotebook</strong></h1>
      <h2 className='mb-1'>Store your Notes with <i className='text-muted'>uNotebook</i> on the cloud.</h2>
      <hr className='mb-4'/>
      
      <Notes showAlert={showAlert}/>

    </div>
  )
}

export default Home