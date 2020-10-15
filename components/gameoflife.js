import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import styles from './gameoflife.module.css'

const GameOfLife = dynamic({
  loader: async () => {
    const rust = await import('../pkg/')

    // Return the React component using Webassembly
    return (
      (props) => {
        // useRef: if universe is used directly doen't work
        const pattern = Uint32Array.from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        const universe = props.pattern
          ? useRef(rust.Universe.new_pattern(props.width, props.height, props.pattern))
          : useRef(rust.Universe.new(props.width, props.height))
        const [state, setState] = useState(0);

        useEffect(() => {
          var timerID = setInterval(() => setState(state + 1), 250);
          universe.current.tick();
          return function cleanup() {
            clearInterval(timerID);
          };
        });

        return (
          <>
            <pre className={styles.gol}>{universe.current.render()}</pre>
          </>
        )
      }
    )
    // end of component
  },
})

export default GameOfLife