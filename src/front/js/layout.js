import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Characters } from "./pages/characters.jsx";
// import { CharacterDetails } from "./pages/characterDetails.jsx";
import { Planets } from "./pages/planets.jsx";
// import { PlanetDetails } from "./pages/planetDetails.jsx";
import { Ships } from "./pages/ships.jsx";
// import { ShipDetails } from "./pages/shipDetails.jsx";

// import { Contacts } from "./views/contacts.jsx";



import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

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
                    {/* <div>
					<Characters /></div> */}
					{/* <div><CharacterDetails /></div> */}
					{/* <div>
					<Planets /></div>
					<div>
					<Ships /></div> */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} />
						<Route path="/characters" element={<Characters />} />
						{/* <Route path="/detail-characters" element={<CharacterDetails />} /> */}
						<Route path="/planets" element={<Planets />} />
						{/* <Route path="/detail-planets/:id" element={<PlanetDetails />} /> */}
						<Route path="/ships" element={<Ships />} />
						{/* <Route path="/detail-ships/:id" element={<ShipDetails />} /> */}
						{/* <Route path="/contacts" element={<Contacts />} /> */}
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
