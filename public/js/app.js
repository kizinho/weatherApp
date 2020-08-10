console.log('js loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
// response.json().then((data) =>{
// console.log(data)
// })

// })
// fetch('http://localhost:3000/weather?address=boston').then((response) => {

//     response.json().then((data) => {

//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)

//         }

//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading ....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    //fetch starts
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = 'latitude: ' + data.latitude
                messageFour.textContent = 'Longitude: ' + data.longitude
            }

        })
    })

})