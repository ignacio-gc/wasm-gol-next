import Link from 'next/link'
import Prism from 'prismjs'
import { useEffect } from 'react'
import Layout from '../components/layout'
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-jsx'
import styles from './acerca.module.css'

const Acerca = () => {

  const code = `
  fn hola() -> u8 {
    let a = 2;    
    a
  }`

  const fragmentoIndexJs = `
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const RustComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    const rustModule = await import('../add.wasm')
    // Return a React component that calls the add_one method on the wasm module
    return (props) => <div>{rustModule.add_one(props.number)}</div>
  },
})

const Page = ({ router: { query } }) => {
  const number = parseInt(query.number || 30)
  return (
    <div>
      <RustComponent number={number} />
      <Link href={\`/? number = \${number + 1}\`}>
        <a>+</a>
      </Link>
    </div>
  )
} `

  const fragmentoRust =
    `
const GameOfLife = dynamic({
  loader: async () => {
    const rust = await import('../pkg')

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
`

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.linkDiv}>
            <Link href="/">
              <a className={styles.link}>🡐 back</a>
            </Link>
          </div>
          <div className={styles.texto}>
            Esta página es parte de mi aprendizaje de <a href="https://reactjs.org/">React</a>
            , <a href="https://nextjs.org/" target="_">Next</a>
            , <a href="https://www.rust-lang.org/">Rust</a> y <a href="https://webassembly.org/">Webassembly</a>.
            En particular es el
            intento de incorporar <a href="https://rustwasm.github.io/docs/book/" target="_">este</a> tutorial
            que implementa el Juego de la vida en Wasm a Next.
             </div>
          <div className={styles.texto}>
            El <a href="https://es.wikipedia.org/wiki/Juego_de_la_vida" target="_">juego de la vida</a> es un autómata
            celular diseñado por el matemático británico John Horton Conway en 1970.
            Es un juego de cero jugadores, y consiste en una grilla infinita donde
            cada casillero representa una "célula" que puede encontrarse en uno de dos estados: viva o muerta, poblada o despoblada,
            encendida o apagada, etc.
            Una vez establecido el patrón inicial solamente queda ver cómo evoluciona según las siguientes reglas:
          <ol>
              <li>Cualquier célula viva con menos de dos vecinas vivas muere en la siguiente generación</li>
              <li>Cualquier célula viva con dos o tres vecinas vivas sigue viva</li>
              <li>Cualquier célula viva con más de tres vecinas vivas muere</li>
              <li>Cualquier célula muerta con exactamente tres vecinas vivas pasa a estar viva</li>
            </ol>
          </div>
          <div className={styles.texto}>
          </div>
          <div className={styles.texto}>
            Según <a href="https://developer.mozilla.org/es/docs/WebAssembly/Concepts" target="_">MDN web docs</a> <b>Webassembly</b> es:
            <p><blockquote>un nuevo tipo de código que puede ser ejecutado en navegadores modernos, y provee nuevas
            funcionalidades y mejoras en rendimiento. No está pensado para ser ser escrito a mano, si no que está diseñado par
            ser un objeto final de compilación para lenguajes de bajo nivel como C, C++, Rust, etc.</blockquote></p>

            Rust tiene un buen soporte de Webassembly, con herramientas como wasm-bindgen que ayudan en la comunicación
            con Javascript. A eso hay que agregar que a diferencia de C y C++ el sistema de Ownership nos protege
            de ciertos errores y junto con otras características del lenguaje hace de "red de contención". Por último
            vale la pena aprenderlo!
          </div>
          <div className={styles.texto}>
            <h2>Algunos puntos</h2>
            Una vez que completamos el tutorial de Wasm y tenemos la implementación del Juego de la vida la primer pregunta
            que surge es ¿cómo se integra en Next.js?
          </div>
          <h3>Comunicación con Wasm</h3>
          <div className={styles.texto}>
            La información al respecto es poca, consiste en un ejemplo que se llama "with-webassembly".
            Nos interesa el archivo <a href="https://github.com/vercel/next.js/blob/canary/examples/with-webassembly/pages/index.js"> index.js</a> donde
            podemos ver cómo se carga Wasm:
            <pre className={styles.codeBlock}><code className={"language-jsx"}>{fragmentoIndexJs}</code></pre>
            Podemos ver que hay una linea con el path al archivo wasm: <code className={styles.nb}>await import('../add.wasm')</code> (o
            carpeta con archivos) y usa "dynamic import".
            A través de la variable <code className={styles.nb}>rustModule</code> vamos a poder acceder a
            las funciones que hayamos hecho públicas. La clave está en que el llamado
            a <code className={styles.nb}>dynamic()</code> devuelve un componente React donde vamos a poder usar esas funciones.
          </div>
          <div className={styles.texto}>
            Tengo que volver a aclarar que esto es más que nada parte de un aprendizaje y para nada
            algo acabado. Como ejemplo aún no integré el compilado del código Rust en Next, y mi solución fue compilar
            el código del tutorial y copiar la
            carpeta <code className={styles.nb}>pkg/</code> (Wasm-pack genera otros archivos además
            de <code className={styles.nb}>.wasm</code> para poder comunicarse, es por eso que hay que copiar la carpeta)
          </div>
          <h3>Animación del juego</h3>
          <div className={styles.texto}>
            El tutorial de Wasm implementa una primer solución para animar el juego usando
            <code className={styles.nb}> requestAnimationFrame()</code> pero
            como Next.js está basado en React después de unos intentos me pareció mejor
            que usar <code className={styles.nb}>setInterval()</code> junto con <code className={styles.nb}>useState</code> para
            provocar el re renderizado incrementando un contador por cada generación.
            Por otro lado el universo del juego está implementado usando un <code className={styles.nb}>struct</code> mutable
            que es modificado cada vez que se llama a la función <code className={styles.nb}>tick()</code>
            (que calcula la siguiente generación).
          </div>
          <div className={styles.texto}><p>Componente que se comunica con Wasm:</p>
            <pre className={styles.codeBlock}><code className={"language-rust"}>{fragmentoRust}</code></pre></div>

          <div className={styles.texto}>
            <h2>TODO</h2>
            Además de linpiar y mejorar muchas cosas algunas ideas para intentar:
            <ul>
              <li>
                Modificar la función de Rust <code className={styles.nb}>new()</code> para que acepte
                un patrón para empezar el juego (en parte implementado en <code className={styles.nb}>new_pattern()</code>)
              </li>
              <li>
                Permitir ingresar un patron clickendo en una grilla en blanco
              </li>
              <li>
                Implementar un botón de "start" y "stop"
              </li>
              <li>
                Agregar una galería de patrones como <a href="https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)" target="_">Glider</a>
              </li>
              <li>
                Integrar el paso de compilación del código Rust!
              </li>
            </ul>
          </div>

          <div className={styles.linkDiv}>
            <Link href="/">
              <a className={styles.link}>🡐 back</a>
            </Link>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default Acerca