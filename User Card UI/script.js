let buttons = document.querySelectorAll('.card button');

buttons.forEach(btn => {
  let isHired = false;

  btn.addEventListener('click', function () {
    if (!isHired) {
      btn.innerHTML = 'HIRING...';
      btn.style.backgroundColor = 'Green';
      isHired = true;

      setTimeout(function() {
        btn.innerHTML = 'FIRE';
        btn.style.backgroundColor = 'red';
      }, 2000);
    } else {
      btn.innerHTML = 'FIRING...';
      btn.style.backgroundColor = 'orange';
      isHired = false;

      setTimeout(function() {
        btn.innerHTML = 'HIRE';
        btn.style.backgroundColor = '';
      }, 2000);
    }
  });
});