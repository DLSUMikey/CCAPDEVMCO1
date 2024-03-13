function goToCalendar() {
  window.location.href = 'Calendar/Calendar.html';
}


function goToCharacters() {
  window.location.href = 'Character.html';
}

function goToGacha() {
  window.location.href = 'gacha.html';
}

function goToStore() {
  window.location.href = 'Store.html';
}
function openModal() {
  document.getElementById('profileModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('profileModal').style.display = 'none';
}
window.onclick = function (event) {
  let modal = document.getElementById('profileModal');
  if (event.target == modal) {
    closeModal();
  }
}