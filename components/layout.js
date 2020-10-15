import styles from './layout.module.css'
import Navbar from '../components/navbar'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
    </>
  )
}

export default Layout
