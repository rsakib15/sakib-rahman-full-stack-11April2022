import Navbar from 'Components/Navbar';
import Collections from 'Containers/Collections';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import App from './Containers/App';
import Login from './Containers/Login';
import Registration from './Containers/Registration';
import { useState, useEffect } from 'react';



const MainApp = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const loggedUser = localStorage.getItem('user');
		setLoggedIn(Boolean(loggedUser));
	}, []);

	const handleLoggedIn = (f) => {
		setLoggedIn(f);
	};

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar isLoggedIn={isLoggedIn} />
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/collections" element={<Collections />} />
					<Route path="/login" element={<Login handleLoggedIn={handleLoggedIn}/>} />
					<Route path="/registration" element={<Registration />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default (MainApp);
