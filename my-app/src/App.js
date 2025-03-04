import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import './App.css';
import Loading from './components/Loading';
import Nav from './components/Nav';
import Stars from './components/stars';
import LogoSlider from './components/logoslider';
import Carousel3D from "./components/3dcarousel";


function Parallax() {
    const [background, setBackground] = useState(20);
    const [loading, setLoading] = useState(true);

    const parallaxRef = useRef(null);
    const mountain3 = useRef(null);
    const mountain2 = useRef(null);
    const mountain1 = useRef(null);
    const sun = useRef(null);
    const copy = useRef(null);
    const btn = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => { //loading animation timeout function.
      setTimeout(() => {
          setLoading(false);
      }, 1500);

      if (!loading) { //runs animation only when loading is false
          let ctx = gsap.context(() => {
              gsap.registerPlugin(ScrollTrigger);//

              // Initial entrance animations
              const entranceTl = gsap.timeline({
                onComplete: () => {
                    // Start parallax only after entrance completes
                    initParallax();
                }
            });              
              entranceTl
              .from(mountain3.current, { opacity: 0, y: "+=50", duration: 0.5 })
              .from(mountain2.current, { opacity: 0, y: "+=20", duration: 0.5 }, "-=0.3")
              .from(mountain1.current, { opacity: 0, y: "-=30", duration: 0.5 }, "-=0.3")
              .from(sun.current, { opacity: 0, scale: 0, duration: 0.8, ease: "back.out" }, "-=0.5")
              .from(copy.current, { opacity: 0, y: "+=180", duration: 0.8 }, "-=0.3")
              .from(btn.current, { opacity: 0, y: "+=20", duration: 0.3 }, "-=0.2");
// Parallax timeline (delayed start)
        // Parallax timeline (delayed start)
        const initParallax = () => {
            const tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "100%",
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        setBackground(Math.ceil(self.progress * 100 + 20));
                    },
                },
            });

            tl.to(mountain3.current, { y: "-=70" }, 0)
              .to(mountain2.current, { y: "-=20" }, 0)
              .to(mountain1.current, { y: "+=30" }, 0)
              .to(sun.current, { y: "+=160" }, 0)
              .to(copy.current, { y: "-=365", opacity: 1 }, 0)
              .to(btn.current, { opacity: 1 }, 0.7);
        };
    });
    // Parallax star animation
        gsap.to('.parallax-star', {
        scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top top",
        end: "50%",
        scrub: 1
    },
    y: -100,
    scale: 0.5,
    opacity: 0,
    stagger: 0.1
});
    return () => ctx.revert();
}
}, [loading]);  

return (
    <>
        <Nav />
        {loading && <Loading />}
        {!loading && (
            <>
                <div className="parallax-outer">
                    <div ref={parallaxRef} style={{ 
                        background: `linear-gradient(rgb(89, 0, 0) 0%
                        ,rgb(0, 0, 0) ${background}%,
                        rgb(212, 16, 16),
                        rgb(0, 0, 0))` }} 
                    className='parallax'>
                        <Stars count={30} />
                        <img ref={mountain3} className='mountain-3' src="/images/mountain-3.svg" alt="Mountain 3" />
                        <img ref={mountain2} className='mountain-2' src="/images/mountain-2.svg" alt="Mountain 2" />
                        <img ref={mountain1} className='mountain-1' src="/images/mountain-1.svg" alt="Mountain 1" />
                        <img ref={sun} className='sun' src="/images/sun.svg" alt="Sun" />
                        <div ref={copy} className="copy">
                            <h1> TASTEFUL USER EXPERiENCE and OPTIMISED BACKENDS </h1>
                            <h1> WEB DEVELOPMENT SPECiALiSiNG IN THE<br/> MERN STACK </h1>
                           
                        </div>
                    </div>
                </div>      
                <LogoSlider />           
                     <section ref={cardsRef} className="cards-section">
                        <Stars count={10} />
                         <div className="cards-container">
                                <div className="card">
                                 <h3>Hello!</h3>
                                 <p id="sartaj">I'm Sartaj, a full-stack developer based in India.
                                    I switched professionsal career paths for better intellectual reward and a desire for problem solving.
                                  With my studies in Economics and 5 years of supply chain strategy I made the transition to the software
                                 with the profound belief that my business accumen and a want for logical reward would be a great combination for the tech industry and me.
                                 </p>
                             </div>
                             <div className="card">
                                 <h3>Workflow.</h3>
                                 <p>1.Utilize React.js to build dynamic and responsive user interfaces.
<br/><br/>

                                    2.Utilize MongoDB for its scalability and flexibility in handling diverse data types.<br/>
                                    3.Implement Firebase for real-time database solutions and user authentication.<br/>                                    <br/>
                                      4.   Develop robust server-side logic using Node.jsand Express.js.
                                         <br/>
                                     5.Implement RESTful APIs for seamless communication between the client and server.
                                     <br/>
                                    </p></div>
                                    <div className="card">

                                    <h3>Efficiency.</h3>
                                    <p>1.Design and optimize database schemas for efficient data storage and retrieval.

                                    <br/><br/>
                                    2.Deploy web applications on platforms like Heroku for reliable and scalable hosting.<br/><br/>
                                    3.Set up Continuous Integration and Continuous Deployment (CI/CD) pipelines for automated testing and deployment.<br/><br/>
                                    4.Monitor application performance and environment variables.<br/><br/>
                                   </p>
                                    </div>
                                    <div className="card">
                                <h3>Results.</h3>
                                <p>This workflow ensures that I deliver high-quality, scalable, and secure web applications that meet the needs of both clients and end-users. <br/><br/>My hands-on experience with technologies such as Heroku, Firebase, and MongoDB, combined with a deep understanding of user authentication and database management, enables me to provide exceptional value to any company.</p>
                                </div>
                                </div>
                                
                     </section>
                     <Carousel3D />
                     <div className="inTouch">
                     <Stars count={10} />
                        <div><h1>Lets work together</h1>
                        <p>Have a question? <br/> Or a project you'd like to discuss?</p><br/><br/><br/><br/>
                        
                        </div>
                        <a href="mailto:sartajsingh8@gmail.com">sartajsingh8@gmail.com</a>                     </div>
                     
                  
                     </>
            )}
        </>
    );
}

    
    

export default Parallax;