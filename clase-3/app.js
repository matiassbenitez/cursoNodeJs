const express = require('express')
const crypto = require('node:crypto') //se utiliza para generar un id random
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const { object } = require('zod')

const app = express()
app.use(cors())
app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234'
]


// app.get('/',(req, res) => {
//     res.json({message: 'Hola mundo'})
// })

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {

    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }
   // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        // status 400 o 422
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie) // actualizar la caché del cliente
})

app.delete('/movies/:id', (req, res) => {

    const origin = req.header('origin')
    console.log(origin)
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, PATCH, DELETE, POST')
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: "Movie not found"})
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updatedMovie

    return res.json(updatedMovie)
})


app.get('/movies/:id', (req, res) => { //path-to-regexp
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
        
        res.status(404).json({message: 'Movie not found'})
    })
    
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.sendStatus(200)
    })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
