//Navbar
//Note: When in mobile view, menu automatically "hamburgers".
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import Auth from '../utils/auth'

import { useStateContext } from "../utils/GlobalState";
import { useState, useEffect } from "react";
const navigation = [


  {name: "Create Event", href:"/EventForm", current:false},
  { name: "Home", to: "/", href: "/",  current: true },
  { name: "Find Opportunities", href: "/discover", current: false },
  { name: "Find Volunteers", href: "/LoginCharity", current: false },
  { name: "Profile", href: "/profile", current: false },
  // { name: "Login As Volunteer", href: "/LoginVolunteer", current: false },
  // { name: "Login As Charity", href: "/LoginCharity", current: false },
  { name: "Login", href: "/LoginVolunteer", current: false },
  { name: "Sign Up", href: "/Signup", current: false }

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const state = useStateContext();
  const [userData, setUserData] = useState(null);
// if user isnt signed up, userData will store to localstorage and update state
  useEffect(()=>{
    if(Auth.loggedIn()){
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  },[localStorage])
useEffect(()=>{
  console.log(state.googleInfo);
},[])
  return (
    <Disclosure as="nav" className="bg-gray-700 sticky top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                       {/* <Link to={item.to}>  */}
                       {item.name}
                       {/* </Link>  */}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

{/* Profile dropdown - CONDITIONAL RENDERING - only when user is logged in*/}
                <Menu as="div" className="relative ml-3">
                  <div 
                    className="flex"
                  >
                    {userData?.name && 
                    <span
                      className="mr-2"
                    >{userData?.name}</span>}
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userData?.picture}
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to ="/profile"
                            //href=""
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                  
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          // we still need to make a signout route?
                            to="/signout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

{/* Navbar View in Desktop Mode. Navigation items are mapped over and buttons are generated */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  //To view in development mode, comment href back in
                  href ={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >


{/* To view in development mode (client view), comment out the Link Element */}
                  {/* <Link to={item.to}>{item.name}</Link> */}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default Navbar;