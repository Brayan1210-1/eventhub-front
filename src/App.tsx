

import { LoginForm } from './design/molecules/login'
import { RegisterForm } from '@/design/molecules/register' 
import { Navbar } from './design/molecules/navbar'
import './index.css'



function App() {
  return (
   
    <div >
     
   <Navbar></Navbar>
   
   <div className='absolute left-5'>  <RegisterForm /></div>
  
    <div className= "absolute right-0">
    <LoginForm />
    </div>
   </div>
  )
}

export default App
