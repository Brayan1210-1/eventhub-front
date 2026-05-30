
import { AppRouter } from './AppRoutes'
import { AuthInitializer } from '@/core/store/auth.initializer'
import './index.css'
import { BrowserRouter } from 'react-router-dom'



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthInitializer >
          <AppRouter />
        </AuthInitializer>
      </BrowserRouter>
    </>
  )
}

export default App
