import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {

  return (
    <nav className={styles.nv}>
      <ul className={styles.menu}>
        <li>
          <a href="https://github.com/ignacio-gc/wasm-gol-next">Github</a>
        </li>
        <li>
          <Link href="/acerca"><a href="">Acerca</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar