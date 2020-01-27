const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const paraOne = document.querySelector('.one');
const paraTwo = document.querySelector('.two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    paraOne.textContent = 'Loading...'
    paraTwo.textContent = '';

    fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            return paraOne.textContent = data.error;
        } 
        paraOne.textContent = data.location
        paraTwo.textContent = data.forecast
    })

    console.log(location)
})