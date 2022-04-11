import { BrowserRouter,Routes, Route } from 'react-router-dom';
import App from './Containers/App';
import Login from './Containers/Login';
import Registration from './Containers/Registration';

const MainApp = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default MainApp;
