import logo from './logo.svg';
import './App.css';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

function App() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <Menu as="ul" className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={logo} className="h-8 w-8" alt="logo" />
          <span className="ml-2 text-white font-semibold text-lg">
            Restaurants
          </span>
        </div>
        <div className="flex items-center">
          <button className="text-white focus:outline-none">
            <LogoutIcon className="h-6 w-6" />
          </button>

          </div>
      </Menu>
    </Disclosure>
    
  );
}

export default App;
