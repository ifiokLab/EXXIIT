

function notification(event){
  var element = document.getElementById('notification-wrapper');
  element.classList.toggle('show');
  
  
}

function close_not(event){
  var element = document.getElementById('notification-wrapper');
  if(event.target.className === 'notification-wrapper show') {
      element.classList.remove('show');
    }
}

function profile(){
  var element = document.getElementById('profile-card');
  element.classList.toggle('show');
  
}



function modal(){
  var element = document.getElementById('modal');
  var menu_share = document.getElementById('menu-share');
  menu_share.classList.remove('show');
  element.classList.remove('show');
}


const fileInput = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
fileInput.addEventListener('change', (event) => {
const file = event.target.files[0];
const reader = new FileReader();

reader.addEventListener('load', (event) => {
  imagePreview.src = event.target.result;
  imagePreview.style.display = 'block';
  document.getElementById('profile-image').style.display = 'block';
  document.getElementById('profile-text').style.display = 'none';

});

reader.readAsDataURL(file);
});



var messages = document.getElementById('messages');

// Check if the notification element exists
if (messages) {
// Show the notification message
//messages.innerHTML = "{{ messages }}";
messages.style.display = 'block';

// Set a timer to hide the notification message
setTimeout(function() {
  messages.style.display = 'none';
}, 3000);
}


