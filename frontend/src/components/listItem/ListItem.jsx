import "./listItem.scss";
import PropTypes from "prop-types"
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function ListItem({ index, item }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const [ movie, setMovie ] = useState([])  //put initial state to [] instead of null to avoid getting error of data fetching after refresh
    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await fetch("/api/movies/find/" + item)
                const data = await response.json()
                console.log(data)
                setMovie(data)
            }
            catch (err) {
                console.log(err)
            }

        }
        return () => getMovies()
    }, [ item ])
    return (
        <div
            className="listItem"
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >{console.log(movie)}
            <img
                src={movie.img}
                alt="movieimg"
            />
            {isHovered && (
                <>
                    <Link to='/watch' state={{ movie: movie }}> {/*use state to pass obj in link */}
                        <video src={movie.img} autoPlay={true} loop />
                    </Link>
                    <div className="itemInfo">
                        <div className="icons">
                            <NavLink to='/watch'> <PlayArrow className="icon" /></NavLink>
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>{movie.Runtime}</span>
                            <span className="limit">+{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>
                        <div className="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>
            )}
        </div>
    );
}
ListItem.propTypes = {
    index: PropTypes.any,
    item: PropTypes.any
}