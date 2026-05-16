import { RouterProvider } from 'react-router-dom'
import FaceExpression from './features/expression/components/FaceExpression'
import {router} from './app.routes.jsx'
import "./features/shared/styles/global.scss"

function App() {
 

  return (
    <RouterProvider router={router} />
  )
}

export default App
