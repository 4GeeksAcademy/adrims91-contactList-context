import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from "./components/ContactsList";
import { ContactsProvider } from "./context/ContactsContext.jsx";
import Home from "../views/home.jsx";
const Layout = () => {
    return (
        <ContactsProvider>
            <Router>
                <Routes>
                    <Route path='/contacts' element={<ContactList/>}></Route>
                    <Route path="/" element={<Home/>}></Route>
                </Routes>
            </Router>
        </ContactsProvider>
            
        
    )
}

export default Layout;