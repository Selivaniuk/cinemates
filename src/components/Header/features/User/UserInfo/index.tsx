'use client'

import Image from 'next/image'

import LevelProgress from './LevelProgress'
import styles from './UserInfo.module.scss'

import { User } from 'types/entities'
import calculateLevelExperience from 'utils/calculateLevelExperience'

interface UserInfoProps {
  user: User
}
const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { name, xp } = user
  const { level, levelProgress } = calculateLevelExperience(xp)
  return (
    <div className={styles.user}>
      <LevelProgress size={45} progress={levelProgress}>
        <Image className={styles.avatar} alt='avatar' src='/avatar.png' width={35} height={35} />
      </LevelProgress>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.level}>Level: {level}</p>
      </div>
    </div>
  )
}

export default UserInfo
