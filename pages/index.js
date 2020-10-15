import { withRouter } from 'next/router'
import GameOfLife from '../components/gameoflife'
import styles from './index.module.css'
import Layout from '../components/layout'

const Page = ({ router: { query } }) => {
  return (
    <>
      <Layout>
        <div className={"main"}>
          <div className={styles.h1h2}>
            <h1>Game of Life</h1>
            <h2>Rust + Webassembly + Next.js</h2>
          </div>
          <div className={styles.golGallery}>
            <GameOfLife width={100} height={100} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default withRouter(Page)
