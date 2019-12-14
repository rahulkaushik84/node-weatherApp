console.log("this is a static client side js ...loaded !!!")


// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then( (data) =>{
//         console.log(data)
//     })
// })
 


const weatherForm = document.querySelector('form')
const searchiInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) =>{
     e.preventDefault()
     const location = searchiInput.value
    
     fetch ('http://localhost:3000/weather?location='+location).then( ((response) => {
    response.json().then( (jsonData) => {

        if(jsonData.error){
            messageOne.textContent = jsonData.error
        }else{
            messageOne.textContent = "Temprature  :  "+jsonData.temp
            messagetwo.textContent = "Chances of rain  :  " +jsonData.rain
            messagethree.textContent = "City  :  "+jsonData.city
            messagefour.textContent = "forecaste  :  "+jsonData.forecast
        }

    })

    
}))
})