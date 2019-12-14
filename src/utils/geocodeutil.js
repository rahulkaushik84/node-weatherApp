const request = require('request')


const geoCodefunct = (address, callback) => {

    const geoCodeBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const geocode_access_url = '?access_token=pk.eyJ1IjoicmFodWxrYXVzaGlrMjU4NCIsImEiOiJjazNsbnF4dDExNnJnM2NxbzRoYWgxNjlnIn0.-9xjgdIg8cuL5lxTvN0nrQ'
    
    const geoGoeCodeURL = geoCodeBaseURL + encodeURIComponent(address)+'.json'+geocode_access_url
    console.log(geoGoeCodeURL)
    request({url: geoGoeCodeURL , json : true} , (error, {body}) => {

        if(error){
                    callback('GeoCode Service is unavailable!!' , undefined)
                }else if(body.features.length === 0){
                    callback('unable to find location. TRY another address !!' , undefined)
                }else {
                    callback(undefined, {
                        latitude :  body.features[0].center[1],
                        longitude : body.features[0].center[0],
                        reflocation : body.features[0].place_name
                    })
                }

    })
}

module.exports = geoCodefunct;
