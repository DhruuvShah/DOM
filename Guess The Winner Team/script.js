let arr = [
    {
        team: 'CSK',
        primary: 'yellow',
        secondary: 'blue'
    },
    {
        team: 'RCB',
        primary: 'red',
        secondary: 'golden'
    },
    {
        team: 'DC',
        primary: 'blue',
        secondary: 'red'
    },
    {
        team: 'GT',
        primary: 'dark blue',
        secondary: 'gold'
    },
    {
        team: 'KKR',
        primary: 'purple',
        secondary: 'gold'
    },
    {
        team: 'LSG',
        primary: 'orange',
        secondary: 'green'
    },
    {
        team: 'MI',
        primary: 'blue',
        secondary: 'orange'
    },
    {
        team: 'PBKS',
        primary: 'red',
        secondary: 'white'
    },
    {
        team: 'RR',
        primary: 'blue',
        secondary: 'gold'
    },
    {
        team: 'SRH',
        primary: 'orange',
        secondary: 'gold'
    },
]

var btn = document.querySelector('button')
var h1 = document.querySelector('h1')

btn.addEventListener('click',function(){
    var num = Math.floor(Math.random()*arr.length)
    var winner = arr[num]

    h1.innerHTML = winner.team
    h1.style.backgroundColor = winner.primary
    h1.style.color = winner.secondary
})



