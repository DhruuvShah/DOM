var btn = document.querySelector('button')
var h5 = document.querySelector('h5')
var check = 0;
btn.addEventListener('click', function () {
    if (check == 0) {
        h5.innerHTML = 'Request Sending...'
        h5.style.color = 'Orange'
        btn.innerHTML = 'Adding...'

        setTimeout(function () {
            h5.innerHTML = 'Friends'
            h5.style.color = 'Green'
            btn.innerHTML = 'Remove Friend'
        }, 2000)
        check = 1
    } else {
        h5.innerHTML = 'Removing...'
        h5.style.color = 'Orange'
        btn.innerHTML = 'Removing...'

        setTimeout(function () {
            h5.innerHTML = 'Stanger'
            h5.style.color = 'Red'
            btn.innerHTML = 'Add Friend'
        }, 2000)
        check = 0
    }
})




