import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import ChatRoom from './pages/ChatRoom.tsx';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/chat" element={<ChatRoom/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App
