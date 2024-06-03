const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('combined'));

// In-memory data
const movies = [
    { id:1,title: 'Inception', description: 'A mind-bending thriller', genre: 'Sci-Fi', director: 'Christopher Nolan', imageUrl: 'inception.jpg', featured: true },
    { id:2,title: 'The Matrix', description: 'A computer hacker learns about the true nature of his reality', genre: 'Sci-Fi', director: 'Lana Wachowski', imageUrl: 'matrix.jpg', featured: false },
   
];

const genres = [
    { name: 'Sci-Fi', description: 'Science fiction movies' },
    
];

const directors = [
    { name: 'Christopher Nolan', bio: 'British-American film director', birthYear: 1970, deathYear: null },
  
];

const users = [
    { username: 'user1', favorites: [] },
    { username: 'user2', favorites: [] },
    { username: 'user3', favorites: [] },
   
];

// GET all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET movie by title
app.get('/movies/:title', (req, res) => {
    const movie = movies.find(m => m.title === req.params.title);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

// GET genre by name
app.get('/genres/:name', (req, res) => {
    const genre = genres.find(g => g.name === req.params.name);
    if (genre) {
        res.json(genre);
    } else {
        res.status(404).send('Genre not found');
    }
});

// GET director by name
app.get('/directors/:name', (req, res) => {
    const director = directors.find(d => d.name === req.params.name);
    if (director) {
        res.json(director);
    } else {
        res.status(404).send('Director not found');
    }
});

// POST new user
app.post('/users', (req, res) => {
    const newUser = { username: req.body.username, favorites: [] };
    users.push(newUser);
    res.json(users);
});

// PUT update user info
app.put('/users/:username', (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    if (user) {
        user.username = req.body.username;
        res.json(users);
    } else {
        res.status(404).send('User not found');
    }
});

// POST add movie to favorites
app.post('/users/:username/favorites/:movieId', (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    if (user) {
        user.favorites.push(req.params.movieId);
        res.send(`Movie with ID ${req.params.movieId} added to ${req.params.username}'s favorites`);
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE remove movie from favorites
app.delete('/users/:username/favorites/:movieId', (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    if (user) {
        user.favorites = user.favorites.filter(movieId => movieId !== req.params.movieId);
        res.send(`Movie with ID ${req.params.movieId} removed from ${req.params.username}'s favorites`);
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE deregister user
app.delete('/users/:username', (req, res) => {
    const userIndex = users.findIndex(u => u.username === req.params.username);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send(`User ${req.params.username} deregistered successfully`);
    } else {
        res.status(404).send('User not found');
    }
});

// Serve documentation.html from the public folder
app.use('/documentation.html', express.static(path.join(__dirname, 'public/documentation.html')));

// Default response for root URL
app.get('/', (req, res) => {
    res.send("Welcome to the movies API");
});

// Error-handling middleware
app.get('/error', (req, res, next) => {
    const error = new Error('This is a test error!');
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
