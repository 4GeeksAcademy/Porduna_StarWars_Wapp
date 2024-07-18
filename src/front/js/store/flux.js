const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			Characters: [],
			Planets: [],
			Vehicles: [],

			favorites: [],

			apiContact: "https://playground.4geeks.com/contact/",
			agenda: "porduna",
			contacts: [],
			currentUser: null,
			isLogin: false
		},

		actions: {
			//increment: () => {setStore({counter: getStore().counter + 1})},
			// decrease: () => {setStore({counter: getStore().counter - 1})},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.text()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});


				//reset the global store
				setStore({ demo: demo });
			},

			// Lógica para Characters
			getCharacters: async () => {
				const uri = "https://swapi.dev/api" + "/people"
				const response = await fetch(uri);
				if (!response.ok) {
					// Aquí manejamos el error que devolvió el request HTTP 
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				// De aquí en adelante es la lógica que está en flux
				setStore({ Characters: data.results });
			},

			// Lógica para Planets
			getPlanets: async () => {
				const uri = "https://swapi.dev/api" + "/planets"
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				setStore({ Planets: data.results });
			},

			// Lógica para Vehicles
			getVehicles: async () => {
				const uri = "https://swapi.dev/api" + "/starships"
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				setStore({ Vehicles: data.results });
			},
			
			
			//Logica para contacts
			getContacts: async () => {
				const uri = `${getStore().apiContact}agendas/${getStore().agenda}/contacts`
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return;
				}
				const data = await response.json();

				console.log(data.contacts)
				setStore({ contacts: data.contacts });
			},

			//Lógica para añadir contactos
			addContact: async (contact) => {
				const store = getStore();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().agenda}/contacts`, {
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					const newContact = await response.json();
					setStore({ contacts: [...store.contacts, newContact] });
				}
			},

			deleteContact: async (id) => {
				const store = getStore();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().agenda}/contacts/${id}`, {
					method: "DELETE"
				});
				if (response.ok) {
					setStore({ contacts: store.contacts.filter(contact => contact.id !== id) });
				}
			},

			// Lógica para editar contactos
			editContact: async (contact) => {
				const store = getStore();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda}/contacts/${contact.id}`, {
					method: "PUT",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					const updatedContact = await response.json();
					setStore({
						contacts: store.contacts.map(cont =>
							cont.id === updatedContact.id ? updatedContact : cont
						)
					});
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ isLogin: true, currentUser: data.results });
				} catch (error) {
					console.error("There has been a problem with your fetch operation:", error);
				}
			},

			signup: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ isLogin: true, currentUser: data.results });
				} catch (error) {
					console.error("There has been a problem with your fetch operation:", error);
				}
			},

			
			//Lógica para favoritos
			addFavorites: (favorite) => {
				const store = getStore();
				const existingFavorites = store.favorites;
				const isAlreadyFavorite = existingFavorites.some(item => item.name === favorite.name && item.type === favorite.type);
				if (!isAlreadyFavorite) {
					setStore({ favorites: [...existingFavorites, favorite] });
				}
			},

			// Función para borrar el favorito
			removeFavorite: (name) => {
				const existingFavorites = getStore().favorites;
				const updatedFavorites = existingFavorites.filter(item => item.name !== name);
				setStore({ favorites: updatedFavorites });
			}
		}
	};
};

export default getState;