import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";

export default function Featured({ type , setGenre }) {
    const [ content, setContent ] = useState({})
    
    useEffect(() => {
        const getRandom = async () => {
            try {
                const res = await fetch(`/api/movies/random`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTNhNDcwN2JjN2UwMjU4OTQ3NTZmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTc0NDEzMSwiZXhwIjoxNzA2MTc2MTMxfQ.Z2fAxyO7k4PlxMwz3rXUbIY-FJKhu-9JMEcpMn41R6M"
                    }
                }
                )
                const data = await res.json()
                console.log(data)
                setContent(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        return () => getRandom()
    },[])
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={(e)=> setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img
                src={content.img}
                alt=""
            />
            <div className="info">
                {/* <img
                    src={content.imgTitle}
                    alt=""
                /> */}
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

Featured.propTypes = {
    type: PropTypes.any,
    setGenre: PropTypes.any
}