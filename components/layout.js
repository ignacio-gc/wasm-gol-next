import Navbar from '../components/navbar'
import Head from 'next/head'


const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
