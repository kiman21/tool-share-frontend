import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
        <h1>Navbar</h1>
        <hr/>
        <Routes>
            <Route path="/" element={<h1>Sign In</h1>}/>
            <Route path="/homepage/:id" element={<h1>User Profile</h1>}/>
            <Route path="/toolform" element={<h1>Submit a Tool</h1>}/>
            <Route path="/toolarrangement" element={<h1>Borrow a Tool</h1>}/>
            <Route path="*" element={<h1>404 page not found</h1>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App;
