import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";
// import axios from 'axios'

const Home = ({ type }) => {
    const [ lists, setLists ] = useState([])
    const [ genre, setGenre ] = useState(null)
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const typeParam = type ? "?type=" + type : "";
                const genreParam = genre ? (type ? "&genre=" : "?genre=") + genre : "";
                const response = await fetch(`/api/lists${typeParam}${genreParam}`);
                const data = await response.json();
                console.log(data);
                setLists(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        return () => getRandomLists()
    }, [ type, genre ])
    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list ) => (

                <List list={list} key={list.id}  />
            ))}

        </div>
    );
};


export default Home;
Home.propTypes = {
    type: PropTypes.any
}