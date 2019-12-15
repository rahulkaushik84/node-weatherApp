const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocodeutil.js')
const weather = require('./utils/forecast.js')
// added to support heroku dynamic port assingment
const port = process.env.PORT || 3000


const app = express()

// configure path for public and handlebar dir
const publicDir = path.join(__dirname,'..','public')
const viewsDir = path.join(__dirname, '../templates/views')
const paritalDir = path.join(__dirname,'../templates/partials')

const aboutMessage = "This App is created by Rahul Kaushik. This App used mapbox and darksky API to get weather details of a locations. This uses Node JS"

// set value in express  
app.set('view engine', 'hbs')
app.set('views',viewsDir)
hbs.registerPartials(paritalDir)

//Set dir for static assett
app.use(express.static(publicDir))

app.get('' , (req,res) => {
    res.render('index', {title:'Weather App', name:'Rahul kaushik'})
})


app.get('/about',(req,res) =>{
    res.render('about',{title: 'about',name:'rahul', message : aboutMessage})
})

app.get('/help',(req,res) =>{
    res.render('help', {
        message: 'How i can help you?',
        title : 'help page',
        name : 'rahul kaushik'
    })
})

//localhost:3000/weather
app.get('/weather', (req,res) =>{
    if (!req.query.location){
      return res.send({
        error : 'please provide the location'
      })
    }

    geocode(req.query.location, (err,geocodeData) => {
        if(err){
            return res.send({
                error :err
            })
        }

        weather(geocodeData.latitude,geocodeData.longitude, (err,forcasteData) => {
            if(err){
               return res.send({
                    error : err
                })
            }

            res.send({
                city : geocodeData.reflocation,
                temp : forcasteData.temprature,
                rain : forcasteData.rainProbability,
                forecast : forcasteData.currentSummary
            })

        })


    })

})

app.get('/help/*',(req,res) => {
    res.render('notfound', {
        errorMessage : 'Help Article nOt Found'
    })
})

app.get('*' , (req,res) => {
    res.render('notfound' , {
        errorMessage : 'Page Not Found'
    })
})

// WILL NOT BE USED AFTER EXPRESS STAIC 
//localhost:3000.
// app.get('' , (req , res) => {
// res.send("Hello Express")
// })

// THIS WILl NOT BE USED AFTER EXPRESS STAIC IS USED//localhost:3000/help
// app.get('/help', (req,res) => {
//     res.send('how may i hlpe you !!')
// })

// // localhost:3000/about
// app.get('/about', (req,res) => {
//     res.send('you are on about page !!')
// })


//App Server provided by express listenting at this port
app.listen(port, () => {
    console.log('server started on port port')
})