import Navbar from '../components/navbar'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MYQ1L1WNL2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MYQ1L1WNL2');
          `,
          }}
        />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
