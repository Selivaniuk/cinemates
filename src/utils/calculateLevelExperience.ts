const experienceToLevelUp = 100

interface calculateLevelExperienceReturn {
  level: number
  experienceToNextLevel: number
  levelProgress: number
}
const calculateLevelExperience = (experience: number): calculateLevelExperienceReturn => {
  const currentLevel = Math.floor(experience / experienceToLevelUp) + 1
  const remainingExperience = experienceToLevelUp - (experience % experienceToLevelUp)
  const levelProgress = ((experience % experienceToLevelUp) / experienceToLevelUp) * 100

  return {
    level: currentLevel,
    experienceToNextLevel: remainingExperience,
    levelProgress,
  }
}
export default calculateLevelExperience
