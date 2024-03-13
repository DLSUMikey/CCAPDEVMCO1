function openAbout() {
    document.getElementById('aboutModal').style.display = 'block';
}

function closeAbout() {
    document.getElementById('aboutModal').style.display = 'none';
}

function openContact() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContact() {
    document.getElementById('contactModal').style.display = 'none';
}

window.onclick = function (event) {
    let contactModal = document.getElementById('contactModal');
    let aboutModal = document.getElementById('aboutModal');
    if (event.target == contactModal) {
        closeContact();
    } else if (event.target == aboutModal) {
        closeAbout();
    }
}

function handleLogin() {
    //putting login validation here

    window.location.href = 'main.html';
}