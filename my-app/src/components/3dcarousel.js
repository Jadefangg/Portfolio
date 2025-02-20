import React, { useEffect, useRef } from 'react';
import './3dcarousel.css';

const Carousel3D = () => {
    const carouselRef = useRef(null);
    const rotationRef = useRef(0); // Add this to track rotation angle
    const projects = [
        {
            id: 1,
            title: 'Full stack App',
            description: 'A complete client side and server side integration using heroku/vercel and mongoDB as data storage and fetch points with user authentication - signup,login,favourites & profile updation.',
            tech: ['React', '-Node.js', '-MongoDB', '-Express', '-Heroku', '-Vercel'],
            githubLink: 'https://github.com/Jadefangg/mplixclient',
            liveLink: 'https://superflixknight.netlify.app/'
        },
        {
            id: 2,
            title: 'Firebase Chat App',
            image: '/images/firebase.svg',
            description: 'Real-time chat application with Firebase authentication with provisions for location sharing and image sharing.',
            tech: ['React', '-Firebase', '-CSS3', '-GeoLocation'],
            githubLink: 'https://github.com/Jadefangg/Chat-App-RN-'
        },
        {
            id: 3,
            title: 'Portfolio Website',
            image: '/images/star.svg',
            description: 'Personal portfolio showcasing GSAP and React components.',
            tech: ['React', '-GSAP', '-CSS3'],
            githubLink: 'https://github.com/yourusername/project3'
        },
        {
            id: 4,
            title: 'Meet App',
            description: 'Location based event finder app with serverless integration .Displaying events based on location and date with data visualisation.',
            tech: ['React', '-Serverless'],
            githubLink: 'https://github.com/Jadefangg/meet' ,
            liveLink: 'https://jadefangg.github.io/meet/'
        },
        {
            id: 5,
            title: 'Nutritionist AI (Being Built)',
            description: 'A pyhton based AI that uses the pubmed API to fetch nutrition research on the latest 100 articles which are fetched based on certain keywords relating to specific nutrition topics targetting the gut brain axis to use as data context for an AI chatbot to answer your queries. More specific than LLMs.',
            tech: ['Python', '-APIs', '-Pubmed.API'],
        }
      
    ];
    useEffect(() => {
        const carousel = carouselRef.current;
        let radius = 350; // Distance from center
        let autoRotate = true;
        let rotateSpeed = 60; // Negative for clockwise
        let rotationPerFrame = 1;
        let imgWidth = 400;
        let imgHeight = 300;

        // Size of carousel
        carousel.style.width = imgWidth + "px";
        carousel.style.height = imgHeight + "px";

        // Setup items
        let items = document.getElementsByClassName('carousel-item');
        let totalItems = items.length;
        let theta = 360 / totalItems;

        // Auto Rotate
        let rotationInterval;
        if(autoRotate) {
            rotationInterval = setInterval(() => {
                rotationRef.current -= rotationPerFrame;
                rotateCarousel(rotationRef.current);
            }, rotateSpeed);
        }
        // Mouse rotation
        let xPos = 0;
        window.onmousedown = dragStart;

        function dragStart(e) {
            e.preventDefault();
            clearInterval(rotationInterval);
            xPos = e.clientX;
            window.onmousemove = dragMove;
            window.onmouseup = dragEnd;
        }

        function dragMove(e) {
            e.preventDefault();
            let dx = e.clientX - xPos;
            xPos = e.clientX;
            rotationRef.current += dx * 4;
            rotateCarousel(dx);
        }

        function dragEnd() {
            window.onmousemove = null;
            window.onmouseup = null;
               // Restart auto-rotation after drag
               if(autoRotate) {
                rotationInterval = setInterval(() => {
                    rotationRef.current -= rotationPerFrame;
                    rotateCarousel(rotationRef.current);
                }, rotateSpeed);
            }
        }
        

        function rotateCarousel(angleInDegrees) {
            carousel.style.transform = `rotateY(${angleInDegrees}deg)`;
        }

        // Initial position of items
        Array.from(items).forEach((item, i) => {
            item.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
        }); return () => {
            clearInterval(rotationInterval);
            window.onmousedown = null;
            window.onmousemove = null;
            window.onmouseup = null;
        };
    }, []);

//below is where the carousel is rendered
    return (
        <div><h1 id='workheading'>Some of my work</h1>
        <div className="carousel-wrapper">
        <div ref={carouselRef} className="carousel">
            {projects.map((project) => (
                <div key={project.id} className="carousel-item">
                    {project.image && ( //render image only if it exists
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className={
                                project.id === 2 ? 'firebase-image': 
                                project.id === 3 ? 'portfolio-image' : ''
                            } 
                        /> )}
                        <div className="project-info">
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                                    <svg className="github-icon" viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" fill="currentColor"/>
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                                    <svg className="live-icon" viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" fill="currentColor"/>
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                        </div>                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Carousel3D;