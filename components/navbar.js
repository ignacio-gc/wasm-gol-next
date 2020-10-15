import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {

  return (
    <div className={styles.container}>
      <a href="https://github.com/ignacio-gc/wasm-gol-next">Github</a>
      <Link href="/acerca"><a href="">Acerca</a></Link>
    </div>
  )
}

export default Navbar