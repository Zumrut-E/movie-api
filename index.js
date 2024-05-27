const express = require('express');
const path =require ('path');
const morgan = require('morgan');


const app = express();

const port = 3000;

app.use(morgan('combined'));
//create an Express GET route located at the 
// endpoint “/movies” that returns a JSON object containing data about your top 10 movies.

app.get('/movies',(req,res)=>{
const topMovies=[
    {title:'Fight Club',year:1999},
    {title:'The Dark Knight',year:2008},
    {title:'Poor Things',year:2024},
]
res.json(topMovies);
})
//Create another GET route located at the endpoint “/”
// that returns a default textual response of your choosing.

app.get('/',(req,res)=>{
    res.send("Wellcome to the movies api")

})

// Use express.static to serve your “documentation.html” file from the public
//  folder (rather than using the http, url, and fs modules).
// If you run your project from the terminal, you should be able to navigate 
// to “localhost:[portnumber]/documentation.html”.
//  Test that the correct file loads in your browser.

app.use('/documentation.html', express.static(path.join(__dirname,'public/documentation.html')))

// Use the Morgan middleware library to log all 
// requests (instead of using the fs module to write to a text file).


// Create an error-handling middleware function 
// that will log all application-level errors to the terminal.

app.get('/error',(req,res,next)=>{
    const error = new Error('This is a test error!');
    next(error)
})
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("something is broke!");
   
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})