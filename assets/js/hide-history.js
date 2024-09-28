const hideBtn = document.querySelector('.hide-history');
const showBtn = document.querySelector('.show-history');
const history = document.querySelector('.history');
const noHistory = document.querySelector('.no-history');

hideBtn.addEventListener('click', () => {
    history.classList.add('hidden');
    noHistory.classList.remove('hidden');
})

showBtn.addEventListener('click', () => {
    history.classList.remove('hidden');
    noHistory.classList.add('hidden');
})
