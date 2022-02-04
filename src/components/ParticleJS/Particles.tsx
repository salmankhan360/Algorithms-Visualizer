import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./config.json";

<<<<<<< HEAD
<<<<<<< HEAD
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
            onClick: {
              enable: true,
              mode: "push",
            },
        
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
            value: 80,
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
=======
class Canvas extends Component {
  state = { width: "0px", height: "0px" };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
    });
  };
  render() {
    return (
      <div style={{ position: "fixed", zIndex: -1 }}>
        {/* <Particles
          {...this.state}
          params={{
            particles: {
              number: {
                value: 30,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.4,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable_auto: true,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1,
                condensed_mode: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 600,
                },
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                },
                onclick: {
                  enable: false,
                },
                resize: true,
              },
            },
            retina_detect: true,
          }}
        /> */}
      </div>
    );
  }
>>>>>>> 9af93463c0e17eba65f6ca858dfc32fd86aeb779
=======
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
              value: 80,
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
>>>>>>> 894b63baac33aedee9b1a55515bc4b4835f76543
}

export default ParticlesBG;
