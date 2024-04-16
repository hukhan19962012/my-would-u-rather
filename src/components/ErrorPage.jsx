import { Link } from "react-router-dom"

export const ErrorPage = () => {
    return(
        <div>
          <h1 className='text-center'>404</h1>
          <h3 className='text-center'>Your Page can't not found</h3>
          <div className='row'>
            <Link to='/' className='mx-auto'><button type='button' className='btn btn-lg btn-outline-success'>Go back to Home</button></Link>
          </div>
        </div>
      )
}