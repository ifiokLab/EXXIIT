
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
   
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.querySelector('i').classList.replace('fa-circle-minus','fa-circle-plus');
    } else {
      panel.style.display = "block";
      this.querySelector('i').classList.replace('fa-circle-plus','fa-circle-minus');
    }
  });
}



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

function menu_share(id){
  var element = document.getElementById(`menu-share-${id}`);
  var modal = document.getElementById(`modal-${id}`);
  if(element.classList.contains('show') || modal.classList.contains('show')){
      element.classList.remove('show');
      modal.classList.remove('show');
  }
  else{
      modal.classList.add('show');
      element.classList.add('show');
  }
}

function modal(){
  var element = document.getElementById('modal');
  var menu_share = document.getElementById('menu-share');
  menu_share.classList.remove('show');
  element.classList.remove('show');
}


function show_search(){
  document.getElementById('search-modal').style.display = 'block';
  document.getElementById('search-bar').style.display = 'block';
  document.getElementById('search-btn').style.display = 'none';
  document.getElementById('create').style.display = 'none';
  document.getElementById('logo').style.display = 'none';
}

function close_search(event){
  event.target.style.display = 'none';
  document.getElementById('search-bar').style.display = 'none';
  document.getElementById('search-btn').style.display = 'flex';
  document.getElementById('create').style.display = 'flex';
  document.getElementById('logo').style.display = 'block';
  setTimeout(function() {
      location.reload();
  }, 500);
  
}



function close_searchx(){
  document.getElementById('index-form').style.display = 'none';

} 

function open_search(){
  document.getElementById('index-form').style.display = 'block';
}