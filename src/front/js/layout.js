import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Characters } from "./pages/characters.jsx";
import { CharacterDetails } from "./component/detail-page/characterDetails.jsx";
import { Planets } from "./pages/planets.jsx";
import { PlanetDetails } from "./component/detail-page/planetDetails.jsx";
import { Ships } from "./pages/ships.jsx";
import { ShipDetails } from "./component/detail-page/shipDetails.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";


import { Contacts } from "./pages/Contacts.jsx";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

import { Login } from "./component/users/login.jsx";
import { SignUp } from "./component/users/signup.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/characters" element={<Characters />} />
						<Route path="/detail-characters/:id" element={<CharacterDetails />} />
						<Route path="/ships" element={<Ships />} />
						<Route path="/planets" element={<Planets />} />
						<Route path="/detail-planets/:planetid" element={<PlanetDetails />} />
						<Route path="/ships" element={<Ships />} />
						<Route path="/detail-vehicles/:id" element={<ShipDetails />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
