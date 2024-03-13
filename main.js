function goToCalendar() {
  window.location.href = 'Calendar/Calendar.html';
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