import { useState,useEffect,useRef } from "react";
import slide1 from '../../../images/slideImages/slide1.jpg'
import slide2 from '../../../images/slideImages/slide2.jpg'
import slide3 from '../../../images/slideImages/slide3.jpg'

const slideImages = [slide1, slide2, slide3];
const delay = 5000;

const Slideshow = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    }
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1),delay);

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="w-8/12 overflow-hidden mx-0 my-auto">
            <div className="w-full whitespace-nowrap duration-300" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {slideImages.map((image, index) => (
                <div className={`w-full inline-block`} key={index}>
                    <img className="h-full" src={image} alt="" />
                </div>
                ))} 
            </div>
        </div>
    )
}

export default Slideshow

