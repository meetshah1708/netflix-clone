import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { useState } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [ isScrolled, setIsScrolled ] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <NavLink to="/">
                        <span>Homepage</span>
                    </NavLink>
                    <NavLink to="/series"> <span>Series</span></NavLink>
                    <NavLink to="/movies"><span>Movies</span></NavLink>
                    <NavLink><span>New and Popular</span></NavLink>
                    <NavLink to='/list'><span>My List</span></NavLink>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>KID</span>
                    <Notifications className="icon" />
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
