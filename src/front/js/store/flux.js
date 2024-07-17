const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			characters: [],
			character: '',
			currentCharacter: '',
			planets: [],
			planet: '',
			currentPlanet: '',
			vehicles: [],
			vehicle: '',
			currentVehicle: '',
			apiContact: "https://playground.4geeks.com/contact/",
			agenda: "porduna",
			contacts: null,
			favorites: [],
			currentUser:'',
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
				const response = await fetch("https://www.swapi.tech/api/people/");
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ characters: data.results });
			},

			settingCharacter: (character) => { setStore({ currentCharacter: character }); },

			getCurrentCharacter: async () => {
				const uri = getStore().currentCharacter;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ currentCharacter: data.result });
			},


			// Lógica para Planets
			getPlanets: async () => {
				const response = await fetch('https://swapi.dev/api/planets')
				if (!response.ok) {
					console.log('Error ');
					return;
				};
				const data = await response.json()
				console.log(data);
				setStore({ planets: data.results });
			},
			settingPlanet: (planet) => { setStore({ currentPlanet: planet }) },

			getCurrentPlanet: async () => {
				const uri = getStore().currentPlanet;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ currentPlanet: data.result });
			},

			// Lógica para Vehicles
			getVehicles: async () => {
				const response = await fetch('https://www.swapi.tech/api/starships')
				if (!response.ok) {
					console.log('Error ');
					return;
				};
				const data = await response.json()
				console.log(data);
				setStore({ vehicles: data.results })
			},
			settingVehicle: (vehicle) => { setStore({ currentVehicle: vehicle }) },

			getCurrentVehicle: async () => {
				const uri = getStore().currentVehicle;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ currentVehicle: data.result });
			},
			
			createAgenda: async () => {
				const store = getStore();
				const checkUri = "https://playground.4geeks.com/contact/agendas/porduna";

				try {
					const checkResponse = await fetch(checkUri, { method: 'GET' });
					if (checkResponse.status === 404) {
						console.log('Agenda "porduna" does not exist, creating...');

						const createUri = "https://playground.4geeks.com/contact/agendas/porduna";
						const options = {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(dataToSend)
						};

						const createResponse = await fetch(createUri, options);
						if (!createResponse.ok) {
							console.log('Add Agenda Error', createResponse.status, createResponse.statusText);
							return false;
						}

						console.log(`Agenda "porduna" created successfully`);
						return true;
					} else if (checkResponse.ok) {
						console.log('Agenda "porduna" already exists');
						return true;
					} else {
						console.log('Error checking agenda existence', checkResponse.status, checkResponse.statusText);
						return false;
					}
				} catch (error) {
					console.log('Network or other error', error);
					return false;
				}
			},


			// Logica para contacts
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

			// Lógica para añadir contactos
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

			setcurrentUser: (item) => {
				console.log("Setting current user:", item);
				setStore({ currentUser: item });
			},

			// Lógica para editar contactos
			updateContact: async (dataToSend) => {
				const { id, ...data } = dataToSend;
				const uri = `${getStore().apiContact}agendas/${getStore().agenda}/contacts/${id}`;
				const options = {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(data)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Update Contact Error', response.status, response.statusText);
					return;
				}
				getActions().getContacts();
			},

			//Lógica para eliminar contactos
			deleteContact: async (id) => {
				const store = getStore();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().agenda}/contacts/${id}`, {
					method: "DELETE"
				});
				if (response.ok) {
					setStore({ contacts: store.contacts.filter(contact => contact.id !== id) });
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

			setIsLogin: (login) => { setStore({ isLogin: login }) },

			profile: async () => {
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