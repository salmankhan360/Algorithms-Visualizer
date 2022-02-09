
import React, { Component } from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./config.json";


function ParticlesBG() {
  return (
    <>
     <Particles
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 300,
        interactivity: {
          events: {
            // onClick: {
            //   enable: true,
            //   mode: "push",
            // },
        
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 3,
              opacity: 0.8,
              size: 90,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.9,
            },
          },
        },
        particles: {
          color: {
            value: "#000",
          },
          links: {
            color: "#000",
            distance: 250,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 6,
          },
        },
        detectRetina: true,
      }}
      />
     
    </>
  );
}

export default ParticlesBG;
