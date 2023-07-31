

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