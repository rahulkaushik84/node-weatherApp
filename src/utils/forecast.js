const request = require('request')




//37.8267,-122.4233

const forecast = (latitude, longitude , callback) => {

    const weatherBaseURL ='https://api.darksky.net/forecast/20a63ecb6e7ca07b3c3cb5346b90cb59/'
    //optional add it to end of url if celcius temprarure required
    const unitURL = '?units=si'

    const weatherURL = weatherBaseURL + latitude + encodeURIComponent(',') + longitude 
    console.log(weatherURL)

    request({url:weatherURL, json:true},(error,{body:respbody}) =>{

        if (error){
            callback('weather service is not availble !!',undefined)
    }else if (respbody.error){
        console.log('weather app unable to find location !! check latitude and longitude !!', undefined)
    }
    else{
        const cur = respbody.currently
        callback (undefined, {
            temprature : cur.temperature,
            rainProbability : cur.precipProbability,
            currentSummary : cur.summary,
        })
    }

    })
    

}


module.exports = forecast

