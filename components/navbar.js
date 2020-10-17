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
        <button className="btn" onClick={toggle}><span><FontAwesomeIcon icon={faBars}  size={'2x'} /></span></button>
        <li>
          <Link href="/acerca"><a href=""><span><FontAwesomeIcon icon={faQuestion} style={{ color: 'white' }} /></span></a></Link>
        </li>
        <li>
          <a href="https://github.com/ignacio-gc/wasm-gol-next">
            <span className="font"><FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} /></span></a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar