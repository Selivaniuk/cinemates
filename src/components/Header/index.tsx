import CollapseControl from './features/CollapseControl'
import GenreFilter from './features/GenreFilter'
import MotionHeader from './features/MotionHeader'
import SearchInput from './features/SearchInput'

import User from './features/User'
import styles from './Header.module.scss'

const Header = () => (
  <MotionHeader>
    <div className={styles.headerBody}>
      <div className={styles.left}>
        <CollapseControl />
        <SearchInput />
      </div>
      <div className={styles.center}>
        <GenreFilter />
      </div>
      <div className={styles.right}>
        {/* @ts-ignore */}
        <User />
      </div>
    </div>
  </MotionHeader>
)
export default Header
