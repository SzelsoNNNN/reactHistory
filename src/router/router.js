import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './../pages/Home/index.js'

const Routing = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default Routing