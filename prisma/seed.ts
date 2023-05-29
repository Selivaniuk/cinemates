import { MovieType, PrismaClient } from '@prisma/client'

import movieData from './movies.json'

type JsonMovie = {
  id: number
  type: MovieType
  name: string
  description: string
  shortDescription: string | null
  year: number
  rating: number
  votes: number
  alternativeName: string | null
  genres: string[]
  poster: {
    url: string
    previewUrl: string
  }
  externalId: {
    imdb: string | null | undefined
    kpHD: string | null
    tmdb: number | undefined
  }
}
const prisma = new PrismaClient()

const deleteAllMovies = async () => {
  try {
    await prisma.movie.deleteMany()
    console.log('All movies deleted')
  } catch (error) {
    console.error('Error deleting movies: ', error)
  }
}
const createMovie = async (movie: JsonMovie) => {
  try {
    const createdMovie = await prisma.movie.create({
      data: {
        id: movie.id,
        type: movie.type,
        name: movie.name,
        description: movie.description,
        shortDescription: movie.shortDescription,
        year: movie.year,
        rating: movie.rating,
        votes: movie.votes,
        alternativeName: movie.alternativeName,
        genres: { set: movie.genres },
        poster: { create: { ...movie.poster } },
        externalId: { create: { ...movie.externalId } },
      },
    })
    console.log('Movie created: ', createdMovie.name)
  } catch (error) {
    console.error('Error creating movie: ', error)
  }
}
const createMovies = async (index = 0) => {
  if (index >= movieData.length) {
    console.log('All movies created')
    return
  }
  const movie = movieData[index] as JsonMovie
  await createMovie(movie)
  await createMovies(index + 1)
}
async function main() {
  try {
    await deleteAllMovies()
    await createMovies()
  } catch (error) {
    console.error('Error: ', error)
  } finally {
    await prisma.$disconnect()
  }
}
main()
