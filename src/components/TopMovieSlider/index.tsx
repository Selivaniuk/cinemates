import Slider from './Slider'

import prisma from 'lib/prisma'

const TopMovieSlider = async () => {
  const movies = await prisma.movie.findMany({ take: 3 })
  const posterIds = movies.map((movie) => movie.posterId)
  const posters = await prisma.poster.findMany({ where: { id: { in: posterIds } } })

  return (
    <div>
      <Slider movies={movies} posters={posters} />
    </div>
  )
}

export default TopMovieSlider
