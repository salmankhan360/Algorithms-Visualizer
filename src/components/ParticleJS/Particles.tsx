import React, { Component } from "react";
import Particles from "react-tsparticles";

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
          fpsLimit: 60,
          interactivity: {
            events: {
              resize: true,
              onHover: {
                enable: true,
                mode: ["grab"],
              },
            },

            modes: {
              bubble: {
                distance: 200,
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
              connect: {
                distance: 100,
                lineLinked: {
                  opacity: 0.1,
                },
              },
              grab: {
                lineLinked: {
                  opacity: 0.4,
                },
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
              speed: 1,
              straight: false,
              warp: true,
            },
            number: {
              density: {
                enable: true,
                area: 600,
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
