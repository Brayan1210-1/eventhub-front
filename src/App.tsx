
import { RegisterForm } from '@/design/molecules/register'
import './index.css'
import { Navbar } from './design/molecules/navbar'


function App() {
  return (
   
    <div>
    
    <div>
      <Navbar></Navbar>
    </div>
   
     <div className="m-8">
      <RegisterForm></RegisterForm>
    </div>
    
   </div>
  )
}

export default App
