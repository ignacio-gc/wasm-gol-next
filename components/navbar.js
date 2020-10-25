import styles from './navbar.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [toogleState, setState] = useState(false)

  const toggle = () => setState(prevState => !prevState)

  return (
    <nav className={styles.nav}>
      <ul className={`${styles.menu} ${toogleState ? styles.show : styles.hide}`}>
        {toogleState ? (
          <a className={styles.btn} onClick={toggle}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'white' }} />
          </a>
        ) : (
            <a className={styles.btn} onClick={toggle}>
              <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} />
            </a>
          )}
        <li>
          <Link href="/acerca">
            <a>
              Acerca
            </a>
          </Link>
        </li>
        <li>
          <a href="https://github.com/ignacio-gc/wasm-gol-next" target="_">
            Github <FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} /></a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar