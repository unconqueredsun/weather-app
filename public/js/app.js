console.log('Client side javascript file is loaded!');

const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const error = document.querySelector('#error');

form.addEventListener('submit', (e) => {
    message1.textContent = 'Loading...';
    message2.textContent = '';
    error.textContent = '';

    const address = input.value;
    fetch(`/weather/?address=${encodeURIComponent(address)}`).then((response) => {
        message1.textContent = '';
        response.json().then((data) => {
            if (data.error) {
                error.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });
    });

    e.preventDefault();
});
