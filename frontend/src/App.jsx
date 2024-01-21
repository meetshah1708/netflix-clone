import Home from "./pages/home/Home"
import Login from './pages/login/Login'
import Register from "./pages/register/Register"
import Watch from "./pages/watch/Watch"
import {
    Route,
    BrowserRouter,
    Routes
} from 'react-router-dom'


function App() {
const user = false

    return (
        <>  
            
            {/* <Home/>   cannot declare a 
            component above browserRouter that uses Navlink which should be inside Router  */}
            <BrowserRouter>
                <Routes>
              
                   <Route exact path="/" element={user ? <Home/> : <Register/>}></Route> 
                    <Route path="/register" element={ !user ?<Register/> :<Home/>}></Route>
                    <Route path="/login" element={!user ?<Login/> : <Home/>}></Route>
                    
                    {user &&
                        <>
                            <Route path="/series" element={<Home type="series" />}></Route>
                            <Route path="/watch" element={<Watch />}></Route>
                            <Route path="/movies" element={<Home type="movies" />}></Route>
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
