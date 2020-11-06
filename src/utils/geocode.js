const request = require('postman-request');

const geocode= (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VzaGFncmExIiwiYSI6ImNrZ3l6NzN1MDB5aG8yeXFobmk5NXQ5bnAifQ.tRZKuKJQ5zTCU6_oQZynrA&limit=1'
    // console.log(url) 
    request({ url,json: true},(error,responce)=>{
        if(error){
                    callback('unable to connect internet',undefined)
                }else{
                    if(responce.body.features.length === 0){ // Invalid Latitude and longitude
                    
                        callback('Unable to connect  Location,Try Another Search',undefined);
                    }
                    else{
                    
                        // console.log(`${responce.body.current.weather_descriptions[0]}. Temperature is = ${responce.body.current.temperature} and feels like temp is = ${responce.body.current.feelslike} `)
                        
                        callback(undefined,{
                            latitude: responce.body.features[0].center[0],
                            longitude: responce.body.features[0].center[1],
                            location: responce.body.features[0].place_name
                        })
                    }
                }
            
            })
    }

module.exports = geocode;