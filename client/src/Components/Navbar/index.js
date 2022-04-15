import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from "./../../assets/logo.png";
import UserImage from "./../../assets/user.png";
import {  NavLink, Link  } from 'react-router-dom';

const navigation = [
	{ name: 'Dashboard', href: '/'},
	{ name: 'Collections', href: '/collections'},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const handleLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('name');
	window.location.reload();
}

export default function Navbar(props) {
  	return (
	  	<div className='bg-gray-800 w-full '>
        	<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
    			<div className="relative flex items-center justify-between h-16">
              		<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                		<div className="flex-shrink-0 flex items-center">
                  			<img className="lg:block h-8 w-auto" src={Logo} alt="Glints" />
                		</div>
						<div className="sm:block sm:ml-6">
							<div className="flex space-x-4">
								{
									navigation.map((item) => (
										<NavLink key={item.name} to={item.href}
											className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
											{item.name}
										</NavLink>
									))
								}
							</div>
                		</div>
              		</div>
					{
				  localStorage.getItem('token') ?
				  	<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<Menu as="div" className="ml-3 relative">
							<div>
								<Menu.Button className="bg-gray-800 flex text-sm rounded-full outline-none ring-2 ring-offset-2 ring-offset-gray-800 ring-white">
									<div className="flex justify-between items-center h-8">
										<div><img className="h-8 w-8 rounded-full" src={UserImage} alt=""/></div>
										<div className='text-white font-semibold px-3 text-center  mt-0 mb-1'>{localStorage.getItem('name')}</div>
									</div>
								</Menu.Button>
                  			</div>
                  		<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
                  		>
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (<div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')} onClick={()=>handleLogout()}>Logout</div>)}
							</Menu.Item>
							</Menu.Items>
						</Transition>
                	</Menu>
              	</div>:
				<div className='space-x-3'>
					<Link to="/login" className='bg-gray-900 text-white hover:bg-gray-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium'>Login</Link>
					<Link to="/registration" className="bg-gray-900 text-white hover:bg-gray-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium">Sign Up</Link>
				</div>
			}
              
            </div>
          </div>
	</div>
  )
}
