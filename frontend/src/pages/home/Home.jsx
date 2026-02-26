import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { buildListQuery } from "./homeQuery";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const getRandomLists = async () => {
            setIsLoading(true);
            setError("");

            try {
                const query = buildListQuery(type, genre);
                const response = await fetch(`/api/lists${query}`);

                if (!response.ok) {
                    throw new Error(`Failed to load lists (${response.status})`);
                }

                const data = await response.json();
                setLists(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Unable to load lists right now.");
            } finally {
                setIsLoading(false);
            }
        };

        getRandomLists();
    }, [type, genre, reloadCount]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />

            {isLoading && <p className="statusMessage">Loading titles...</p>}

            {!isLoading && error && (
                <div className="statusMessage errorMessage">
                    <p>{error}</p>
                    <button type="button" onClick={() => setReloadCount((prev) => prev + 1)}>
                        Retry
                    </button>
                </div>
            )}

            {!isLoading && !error &&
                lists.map((list) => <List list={list} key={list._id || list.id} />)}
        </div>
    );
};

export default Home;
Home.propTypes = {
    type: PropTypes.any,
};
