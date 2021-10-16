import React from "react";
import PropTypes from "prop-types";
import { useSpring, useTransition, animated } from "react-spring";

// const SwitchContext = React.createContext();

/**
 * Central hook for handling animations on the root page and sub-pages
 * @return {object} RootPage - The component wrapping the root page
 * @return {function} transition - useTransition function for subpages
 * @return {object} SubPage - The component to wrap the sub pages in
 */

/**
 * This wraps the base route, allows us to apply animations to it when we navigate to another page
 * @param {boolean} animation - If spring is active or not
 */
export const RootPage = function ({ animation, ...rootPageProps }) {
  const scale = useSpring({
    o: animation ? 1 : 0,
    position: animation ? `absolute` : `relative`,
    config: { mass: 1, tension: 500, friction: 39 }
  });

  return (
    <animated.div
      key={0}
      style={{
        height: "100%",
        width: "100%",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased",
        transform: scale.o
          .to({ range: [0, 1], output: [1, 1.25] })
          .to((o) => `scale(${o}) translateZ(0)`)
      }}
      {...rootPageProps}
    />
  );
};

RootPage.propTypes = {
  animation: PropTypes.bool
};

/**
 * Its children are rendered if path equals the condition defined in the Switch component
 * @param {string} path
 */
export const Route = function () {
  return null;
};

/**
 * Switch wraps all possible routes and animates them entering or leaving view. Contains all the logic.
 * @param {string} condition - compared to Route's path, decides if a page renders or not
 * @param {Node} fallback - Component to display if condition doesn't match any paths
 */
export const Switch = ({ condition, children, fallback }) => {
  const transition = useTransition(condition, {
    from: {
      o: 0,
      position: "relative"
    },
    enter: { o: 1, position: "absolute" },
    leave: { o: 0, position: "absolute" },
    config: { mass: 1, tension: 500, friction: 39 }
  });

  if (!Array.isArray(children)) {
    children = new Array(children);
  }

  return (
    <>
      {condition
        ? transition((styles, item) => {
            return (
              <animated.div
                key={0}
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "subpixel-antialiased",
                  opacity: styles.o,
                  transform: styles.o
                    .to({ range: [0, 1], output: [0.75, 1] })
                    .to((o) => `scale(${o}) translateZ(0)`),
                  position: styles.position,
                  width: "100%",
                  height: "100%"
                }}
              >
                {children.map(({ props }) => {
                  return props.path === item && props.children;
                })}
              </animated.div>
            );
          })
        : fallback}
    </>
  );
};

Switch.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node.isRequired
};
