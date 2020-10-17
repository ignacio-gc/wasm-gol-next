import styles from './navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [toogleState, setState] = useState(false)

  const toggle = () => setState(prevState => !prevState)

  return (
    <nav>
      <ul className={`${styles.menu} ${toogleState ? styles.show : styles.hide}`}>
        <a className="btn" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} size={'2x'} style={{ color: 'white' }} />
        </a>
        <li>
          <Link href="/acerca"><a><FontAwesomeIcon icon={faQuestion} style={{ color: 'white' }} /></a></Link>
        </li>
        <li>
          <a href="https://github.com/ignacio-gc/wasm-gol-next" target="_">
            <FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} /></a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar