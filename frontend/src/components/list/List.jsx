import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";
import PropTypes from 'prop-types'

export default function List({ list }) {
    const [ isMoved, setIsMoved ] = useState(false);
    const [ slideNumber, setSlideNumber ] = useState(0);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };
    const {content} = list
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                {console.log(list)}
                <div className="container" ref={listRef}>
                    {content.length > 0 && content.map((item, i) => (
                        <ListItem index={i*0.9} item={item} key={item.id} />   /*index is used to  align popup around it it gives number of movie  */
                    ))}

                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}
List.propTypes = {
    list: PropTypes.any
}



/*

- `handleClick` is a function that takes one argument, `direction`, which is expected to be either `"left"` or `"right"`.
- `setIsMoved(true);` is setting the state of `isMoved` to `true`. This could be used to trigger some other effect, like a CSS transition.
- `let distance = listRef.current.getBoundingClientRect().x - 50;` is getting the current position (`x` coordinate) of the `listRef` element (which is likely a reference to a DOM element), and subtracting `50` from it. This `distance` is then used to calculate the new position of the `listRef` element.
- The `if` statements check the `direction` and the current `slideNumber`:
    - If the `direction` is `"left"` and `slideNumber` is greater than `0`, it decreases the `slideNumber` by `1` and moves the `listRef` element to the right by `230` pixels plus the current `distance`.
    - If the `direction` is `"right"` and `slideNumber` is less than `5`, it increases the `slideNumber` by `1` and moves the `listRef` element to the left by `230` pixels plus the current `distance`.
- `listRef.current.style.transform = `translateX(${230 + distance}px)`;` and `listRef.current.style.transform = `translateX(${-230 + distance}px)`;` are using the CSS `transform` property to move the `listRef` element horizontally on the page.

In summary, this function is used to move a slider or carousel component left or right when it's clicked, based on the `direction` argument. It also keeps track of the current slide number and whether the component has been moved. 😊 */