

var mobile_ellipsis =  document.querySelector('#mobile-ellipsis');
mobile_ellipsis.addEventListener('click',()=>{
    mobile_ellipsis.querySelector('.sub-elipsis').classList.toggle('show');
    document.getElementById('modal').classList.toggle('show');
    console.log(document.getElementById('modal'));
})

function modal(){
    var elipsis = mobile_ellipsis.querySelector('.sub-elipsis');
    elipsis.classList.remove('show');
    document.getElementById('modal').classList.remove('show');
    console.log( elipsis.classList.remove('show'));
}




document.addEventListener('DOMContentLoaded', function() {
    //var followBtn = document.getElementById('follow-btn');
    var followBtn = document.querySelectorAll('.follow-btn-x');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    followBtn.forEach(btn =>{
        console.log(btn);
       
        btn.addEventListener('click', function() {
            console.log(btn);
            var pk = btn.dataset.username;
            console.log('pk:',pk);
            var isFollowing = btn.dataset.isFollowing === 'True';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/follow/' + pk + '/');
            xhr.setRequestHeader('X-CSRFToken', csrfToken);
            xhr.onload = function() {
                
                if (xhr.status === 200) {
                    //var response = JSON.parse(xhr.responseText);
                    var response = JSON.parse(xhr.responseText);
                    console.log(response.status);
                    if (response.status === 'followed') {
                        btn.innerText = 'Unfollow';
                        btn.dataset.isFollowing = 'True';
                    } else if (response.status === 'unfollowed') {
                        btn.innerText = 'Follow';
                        btn.dataset.isFollowing = 'False';
                    }
                } else {
                    console.log('Error:', xhr.status);
                  
                    
                }
            };
            xhr.send();
        });
    })
    
});


/*


document.addEventListener('DOMContentLoaded', function() {
    //var followBtn = document.getElementById('follow-btn');
    var followBtn = document.querySelectorAll('.follow-btn');
    followBtn.forEach(btn =>{
        
    })
    console.log(followBtn);
    var pk = followBtn.dataset.username;
    var isFollowing = followBtn.dataset.isFollowing === 'True';
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    followBtn.addEventListener('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/follow/' + pk + '/');
        xhr.setRequestHeader('X-CSRFToken', csrfToken);
        xhr.onload = function() {
            var response = JSON.parse(xhr.responseText);
            console.log(response.status);
            if (xhr.status === 200) {
                //var response = JSON.parse(xhr.responseText);
                if (response.status === 'followed') {
                    followBtn.innerText = 'Unfollow';
                    followBtn.dataset.isFollowing = 'True';
                } else if (response.status === 'unfollowed') {
                    followBtn.innerText = 'Follow';
                    followBtn.dataset.isFollowing = 'False';
                }
            } else {
                console.log('Error:', xhr.status);
                
            }
        };
        xhr.send();
    });
}); */





function show_post(){
    document.getElementById('post-container').classList.toggle('show');
}

function post_modal(event){
    if(event.target.classList.contains('post-container')){
        event.target.classList.remove('show');
    }
    
}

function cancel_btn(){
    document.getElementById('post-container').classList.remove('show')
}


function close_search(){
    document.getElementById('index-form').style.display = 'none';
  }
  
  function open_search(){
    document.getElementById('index-form').style.display = 'block';
  }