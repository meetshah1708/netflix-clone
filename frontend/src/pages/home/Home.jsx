import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from "react";
import { filterListsByQuery } from "../../utils/listFilters";

const Home = ({ type }) => {
    const [ lists, setLists ] = useState([])
    const [ genre, setGenre ] = useState(null)
    const [ searchQuery, setSearchQuery ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState("")

    useEffect(() => {
        const getRandomLists = async () => {
            setIsLoading(true)
            setError("")

            try {
                const typeParam = type ? "?type=" + type : "";
                const genreParam = genre ? (type ? "&genre=" : "?genre=") + genre : "";
                const response = await fetch(`/api/lists${typeParam}${genreParam}`);

                if (!response.ok) {
                    throw new Error("Unable to load recommendations right now.")
                }

                const data = await response.json();
                setLists(data);
            } catch (err) {
                setError(err.message || "Something went wrong while loading recommendations.")
            } finally {
                setIsLoading(false)
            }
        };

        getRandomLists()
    }, [ type, genre ])

    const filteredLists = useMemo(() => filterListsByQuery(lists, searchQuery), [ lists, searchQuery ])

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />

            <div className="homeSearch">
                <input
                    type="search"
                    placeholder="Search rows like Trending, Action, Comedy..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </div>

            {isLoading && <p className="homeStatus">Loading recommendations...</p>}
            {error && <p className="homeStatus error">{error}</p>}
            {!isLoading && !error && filteredLists.length === 0 && (
                <p className="homeStatus">No rows found for that search.</p>
            )}

            {!isLoading && !error && filteredLists.map((list) => (
                <List list={list} key={list._id || list.id} />
            ))}

        </div>
    );
};


export default Home;
Home.propTypes = {
    type: PropTypes.any
}
