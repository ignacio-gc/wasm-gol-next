import { withRouter } from 'next/router'
import GameOfLife from '../components/gameoflife'
import styles from './index.module.css'
import Layout from '../components/layout'

const Page = ({ router: { query } }) => {
  return (
    <>
      <Layout>
        <div className={styles.header}>
          <h1>Game of Life </h1>
          <h2>Rust + Webassembly + Next.js</h2>
        </div>
        <div className={styles.gol}>
          <GameOfLife width={64} height={64} />
        </div>
      </Layout>
    </>
  )
}

export default withRouter(Page)
