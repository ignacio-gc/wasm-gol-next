import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {

  return (
    <nav className={styles.nav}>
      <ul className={styles.container}>
        <li>
          <Link href="/como">
            <a>Github</a>
          </Link>
        </li>
        <li>
          <Link href="/acerca">
            <a>Acerca</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar