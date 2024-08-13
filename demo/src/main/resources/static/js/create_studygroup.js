document.getElementById('return').addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();

    var icon = document.getElementById('submiticon');
    icon.className = 'fa-solid fa-spinner fa-spin-pulse';
});