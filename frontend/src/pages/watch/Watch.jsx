import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
import { NavLink, useLocation } from "react-router-dom";


export default function Watch() {
    const location = useLocation()
    const { state } = location
    //console.log(state)
    return (
        <div className="watch">
            <NavLink to='/' className="link">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </NavLink>
            <video
                className="video"
                autoPlay
                // progress
                controls
                src={state.video}
            />
        </div>
    );
}

