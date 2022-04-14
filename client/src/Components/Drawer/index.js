import React, { useEffect } from "react";
import CollectionRestaurantCard from "../CollectionRestaurantCard";
import axios from "axios";
import { BASEURL } from '../../constants/ServerData';
var _=require('lodash');

export default function Drawer({ isOpen, setIsOpen, collection }) {
    return (
        <main className={" fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
            (isOpen? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")
        }>
        <section className={
            " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
        }>
            <CollectionRestaurantCard collection={collection}/>
        </section>
        <section className=" w-screen h-full cursor-pointer " onClick={() => { setIsOpen(false);}}></section>
    </main>
  );
}
