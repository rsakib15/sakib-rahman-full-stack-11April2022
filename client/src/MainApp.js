import Navbar from 'Components/Navbar';
import Collections from 'Containers/Collections';
import { BrowserRouter,Routes, Route, HashRouter } from 'react-router-dom';
import App from './Containers/App';
import Login from './Containers/Login';
import Registration from './Containers/Registration';


const MainApp = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default MainApp;
