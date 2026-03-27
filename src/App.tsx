import { Button } from './design/atoms/button'
import { Card } from './design/atoms/card'
import { Input } from './design/atoms/input'
import './index.css'
import Navbar from './components/organisms/navbar/Navbar'

function App() {
  return (
    <div className="typography">
      <Navbar />
      <Card>
        <h1>Iniciar sesion</h1>
        <Input label='Correo'></Input>
        <Input label='contraseña'></Input>
        <Button children="hola mundo"></Button>
      </Card>
    </div>
  )
}

export default App