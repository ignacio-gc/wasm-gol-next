import styles from './navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li>
          <Link href="/acerca"><a href="">Acerca</a></Link>
        </li>
        <li>
          <a href="https://github.com/ignacio-gc/wasm-gol-next">
            <span className="font"><FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} /></span> Github</a>
        </li>
      </ul>
    </nav >
  )
}

export default Navbar