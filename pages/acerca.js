import Link from 'next/link'
import Prism from 'prismjs'
import { useEffect } from 'react'
import Layout from '../components/layout'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-jsx'
import styles from './acerca.module.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'

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
      <Head>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </Head>
      <Layout>
        <div className={styles.container}>
          <div className={styles.linkDiv}>
            <Link href="/">
              <a className={styles.link}><span><FontAwesomeIcon icon={faArrowLeft} /></span></a>
            </Link>
          </div>
          <div className={styles.texto}>
            Esta página es mi primer intento de usar Webassembly (<a href="https://webassembly.org/">Wasm
          </a>) en <a href="https://nextjs.org/" target="_">Next.js</a>.
          Para eso primero seguí <a href="https://rustwasm.github.io/docs/book/" target="_">este</a> tutorial que implementa
          El juego de la vida en Rust y lo compila a Wasm y busqué cómo podía incorporarlo. Por suerte Next tiene soporte
          para Wasm.
        </div>
          <div className={styles.texto}>
            El <a href="https://es.wikipedia.org/wiki/Juego_de_la_vida" target="_">Juego de la vida</a> (<i>Game
            of life</i>) es un autómata celular diseñado por el matemático británico John Horton Conway en 1970.
            Es un juego de cero jugadores, y consiste en una grilla infinita (como la de la página anterior) donde
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
            Según <a href="https://developer.mozilla.org/es/docs/WebAssembly/Concepts" target="_">MDN web docs</a> <b>Webassembly</b> es:
          <p><blockquote>"un nuevo tipo de código que puede ser ejecutado en navegadores modernos, y provee nuevas
            funcionalidades y mejoras en rendimiento. No está pensado para ser ser escrito a mano, si no que está diseñado par
          ser un objeto final de compilación para lenguajes de bajo nivel como C, C++, Rust, etc."</blockquote></p>
            <p>
              Un ejemplo reciente de las posibilidades que da es la mejora de rendimiento de TensorFlow.js gracias a Wasm:
              <div className={styles.tweet}>
                <blockquote className="twitter-tweet"><p lang="en" dir="ltr">🔋⚡️ Get supercharged with WebAssembly<br></br><br></br>In the latest update, supercharging the <a href="https://twitter.com/hashtag/TensorFlowJS?src=hash&amp;ref_src=twsrc%5Etfw">#TensorFlowJS</a> WebAssembly backend with SIMD and multi-threading can get up to a 10x performance boost for free. <br></br><br></br>Learn more → <a href="https://t.co/ZKFWaxFAzE">https://t.co/ZKFWaxFAzE</a> <a href="https://t.co/HM3dyliTND">pic.twitter.com/HM3dyliTND</a></p>&mdash; TensorFlow (@TensorFlow) <a href="https://twitter.com/TensorFlow/status/1301211668735811584?ref_src=twsrc%5Etfw">September 2, 2020</a></blockquote>
              </div>
            </p>
            <a href="https://www.rust-lang.org/">Rust</a> tiene un buen soporte de Webassembly, con herramientas como wasm-bindgen que ayudan en la comunicación
          con Javascript.
        </div>
          <div className={styles.texto}>
            <a href="https://nextjs.org/" target="_">Next.js</a> es un framework basado en <a href="https://es.reactjs.org/">React
          </a> que permite hacer páginas web híbridas tanto estáticas como renderizadas en el lado del servidor (SSR).
        </div>
          <div className={styles.texto}>
            <h2>Algunos puntos</h2>
            Una vez que completamos el tutorial de Wasm y tenemos la implementación del Juego de la vida la primer pregunta
            que surge si uno quire usar Next.js es ¿cómo se integra?
          </div>
          <div className={styles.texto}>
            <h3>Comunicación con Wasm</h3>
          La información al respecto no es mucha. Dentro del repositorio de Next.js vamos a encontrar un
          ejemplo que se llama "with-webassembly" donde se muestra cómo crear un componente con Wasm.
          Nos interesa el archivo <a href="https://github.com/vercel/next.js/blob/canary/examples/with-webassembly/pages/index.js"> index.js</a> donde
          podemos ver cómo se hace:
          <pre className={styles.codeBlock}><code className={"language-jsx"}>{fragmentoIndexJs}</code></pre>
          Podemos ver que hay una linea con el path al archivo wasm: <code className={styles.nb}>await import('../add.wasm')</code> (o
          carpeta con archivos) y usa <i>dynamic import</i>.
          A través de la variable <code className={styles.nb}>rustModule</code> vamos a poder acceder a
          las funciones que hayamos hecho públicas. La clave está en que el llamado
          a <code className={styles.nb}>dynamic()</code> devuelve un componente React donde vamos a poder usar esas funciones.
          </div>
          <div className={styles.texto}>
            <h3>Animación del juego</h3>
          El tutorial de Wasm implementa una primera solución para animar el juego usando
          <code className={styles.nb}> requestAnimationFrame()</code> pero
          como Next.js está basado en React después de unos intentos me pareció mejor
          usar <code className={styles.nb}>setInterval()</code> junto con <code className={styles.nb}>useState</code> para
          provocar el re renderizado incrementando un contador por cada generación.
          Por otro lado el universo del juego está implementado usando un <code className={styles.nb}>struct</code> mutable
          que es modificado cada vez que se llama a la función <code className={styles.nb}>tick()</code>
          (que calcula la siguiente generación).
        </div>
          <div className={styles.texto}><p>Componente que se comunica con Wasm:</p>
            <pre className={styles.codeBlock}><code className={"language-rust"}>{fragmentoRust}</code></pre></div>
          <div className={styles.texto}>
            <h2>TODO</h2>
            Además de limpiar y mejorar muchas cosas algunas ideas para intentar:
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
            </ul>
          </div>
          <div className={styles.linkDiv}>
            <Link href="/">
              <a className={styles.link}><span><FontAwesomeIcon icon={faArrowLeft} /></span></a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Acerca