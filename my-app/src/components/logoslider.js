import React from 'react';
import './logoslider.css';

const LogoSlider = () => {
    const logos = [
        { src: '/images/mongodb.svg', alt: 'MongoDB' },
        { src: '/images/express.svg', alt: 'Express.js' },
        { src: '/images/react.svg', alt: 'React' },
        { src: '/images/node-js.svg', alt: 'Node.js' },
        { src: '/images/typescript.svg', alt: 'TypeScript' },
        { src: '/images/firebase.svg', alt: 'firebase' }
    ];

    return (
        <div className="slider">
            <div className="slide-track">
                {/* Double the logos for seamless loop */}
                {[...logos, ...logos].map((logo, index) => (
                    <div className="slide" key={index}>
                        <img src={logo.src} alt={logo.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoSlider;