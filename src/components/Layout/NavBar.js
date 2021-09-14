import React, {useState} from 'react'
import {Link} from "react-router-dom"
import EditorBar from './EditorBar'
import style from "./Header.module.css"
import logo from "../../images/logo.png"
import logo2 from "../../images/xeanco2.png"


function NavBar() {

        const [colorChange, setColorchange] = useState(false);
        const changeNavbarColor = () =>{
           if(window.scrollY >= 80){
             setColorchange(true);
           }
           else{
             setColorchange(false);
           }
        };
        window.addEventListener('scroll', changeNavbarColor);

        

    return (
    <nav className='navbar navbar-expand-lg navbar-dark' id = {colorChange ? style.navbar_active : style.navbar}>
    <div className="container">
    <Link to="/"><img src={logo} style={{width: "100px"}} alt="..."/></Link>
    <div>
      <ul className={style.nav_elements}>
      <Link className={style.nav_link} aria-current="page" to="/">
        <li className={style.nav_item}>
         Home
        </li></Link>
        <Link className={style.nav_link} aria-current="page" to="/service">
        <li className={style.nav_item}>
          Service
        </li>
        </Link>
        <Link className={style.nav_link} aria-current="page" to="/about"><li className={style.nav_item}>
          About
        </li></Link>
   
        <Link className={style.nav_link} aria-current="page" to="/contact"><li className={style.nav_item}>
          Contact
        </li></Link>
      </ul>
    </div>
  </div>
  <EditorBar />
</nav>
    )
}


export default NavBar