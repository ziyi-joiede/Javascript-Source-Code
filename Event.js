const myEvent = new Event('lyw');

document.addEventListener('lywEvent', (e) => {
    console.log(e);
});

setTimeout(function() {
    document.dispatchEvent(myEvent);
}, 3000);