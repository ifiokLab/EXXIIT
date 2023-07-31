



function notificationMessage(status,msg){
  var messageContainers = document.querySelectorAll('.message');

  // Add shake animation class to message containers
  for (var i = 0; i < messageContainers.length; i++) {
      messageContainers[i].classList.add('animated', 'shake',`${status}`);
      messageContainers[i].querySelector('.info').innerHTML = `${msg}`;
      console.log(messageContainers[i].querySelector('.info'));
      messageContainers[i].style.display  = 'flex';
      messageContainers[i].style.opacity = 1;
      if(status == 'error'){
          messageContainers[i].querySelector('i').classList.add('fa-solid','fa-circle-exclamation');
      }
      else{
           messageContainers[i].querySelector('i').classList.add('fa-solid','fa-circle-check');
      }

  }

  // After a delay, remove the shake animation class and fade out the message containers
  setTimeout(function() {
      for (var i = 0; i < messageContainers.length; i++) {
          messageContainers[i].classList.remove('animated', 'shake',`${status}`);
          messageContainers[i].querySelector('.info').innerHTML = '';
          if(status == 'error'){
            messageContainers[i].querySelector('i').classList.remove('fa-solid','fa-circle-exclamation');
          }
          else{
               messageContainers[i].querySelector('i').classList.remove('fa-solid','fa-circle-check');
          }

          fadeOutElement(messageContainers[i]);
      }
  }, 5000); // Adjust the delay (in milliseconds) as needed

  // Helper function to fade out an element
  function fadeOutElement(element) {
      var opacity = 1;
      var timer = setInterval(function() {
          if (opacity <= 0.1) {
              clearInterval(timer);
              element.style.display = 'none';
          }
          element.style.opacity = opacity;
          element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
          opacity -= opacity * 0.1;
      }, 20);
  }
}





/*player*/
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;








function show_event(){
  document.getElementById('event-container').style.display = 'block';

}

document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader-wrapper");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2000);
});



function m_show_event(){
  document.getElementById('m-event-container').style.display = 'block';
}


function m_hide_event(){
  document.getElementById('m-event-container').style.display = 'none';

}
function hide_event(){
  document.getElementById('event-container').style.display = 'none';

}


function share_clip(){
  const textToCopy = document.getElementById('copy-text-b').innerHTML;
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
      document.getElementById('copied-b').style.display = 'block';
      setTimeout(function() {
          document.getElementById('copied-b').style.display = 'none';
      }, 1000);
  })
  .catch((error) => {
      console.error("Error copying text to clipboard: ", error);
  });
}

document.getElementById('clip-board-b').addEventListener('click',()=>{
  const textToCopy = document.getElementById('copy-text-b').innerHTML;

  navigator.clipboard.writeText(textToCopy)
  .then(() => {

      document.getElementById('copied-b').style.display = 'block';
      setTimeout(function() {
          document.getElementById('copied-b').style.display = 'none';
      }, 1000);
  })
  .catch((error) => {
      console.error("Error copying text to clipboard: ", error);
  });
});

document.getElementById('share-container').addEventListener('click',(event)=>{
  if(event.target.className == 'share-container'){
      document.getElementById('share-container').style.display = 'none';
  }

})


function close_share(){
  document.getElementById('share-container').style.display = 'none';
}



document.querySelectorAll('.share-btn').forEach(button => {
  button.addEventListener('click', event => {

    document.getElementById('share-container').style.display = 'flex';
  });
});


function share_whatsapp(fname,lname,month,year,url){

  const message = `Please help us honor the life of ${fname} ${lname}, who passed away on ${month},${year}. by visiting their memorial. ${url} #memorial #restinpeace`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(shareUrl, "_blank");
}

function share_messenger(fname,lname,month,year,url){
  const message = `Please help us honor the life of ${fname} ${lname}, who passed away on ${month},${year}. by visiting their memorial. ${url} #memorial #restinpeace`;
  const shareUrl = `fb-messenger://share/?link=${encodeURIComponent(window.location.href)}&app_id=${encodeURIComponent('kinglyrae.pythonanywhere.com')}&quote=${encodeURIComponent(message)}`;

  window.open(shareUrl, "_blank");
}


function share_facebook(fname,lname,month,year,url){
  const message = `Please help us honor the life of ${fname} ${lname}, who passed away on ${month},${year}. by visiting their memorial. ${url} #memorial #restinpeace`;
  const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(message)}`;

  window.open(shareUrl, "_blank");
}


function share_twitter(fname,lname,month,year,url){
  const message = `Please help us honor the life of ${fname} ${lname}, who passed away on ${month},${year}. by visiting their memorial. ${url} #memorial #restinpeace`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

  window.open(shareUrl, "_blank");
}


function share_mail(fname,lname,month,year,url){
  const message = `Please help us honor the life of ${fname} ${lname}, who passed away on ${month},${year}. by visiting their memorial. ${url} #memorial #restinpeace`;

  const subject = `Memorial for ${fname} ${lname}`;

  // Define the email address to send to
  const emailAddress = "ifiokudoh77@gmail.com";
  const shareUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0D%0A%0D%0A${encodeURIComponent(window.location.href)}`;

  window.open(shareUrl, "_blank");
}






function profile(){
    var element = document.getElementById('profile-card');
    var modal = document.getElementById('profile-modal');
    modal.classList.toggle('show');
    element.classList.toggle('show');


}

function show_invite(){
  var element  = document.getElementById('invite-container');
  element.style.display = 'flex';
}

function close_invite(){
  document.getElementById('invite-container').style.display = 'none';
}
document.getElementById('invite-container').addEventListener('click',(event)=>{
  //document.getElementById('invite-container').style.display = 'none';
  if(event.target.className === 'invite-container') {
      document.getElementById('invite-container').style.display = 'none';
    }
});



document.getElementById('clip-board').addEventListener('click',()=>{
  const textToCopy = document.getElementById('copy-text').innerHTML;

  navigator.clipboard.writeText(textToCopy)
  .then(() => {

      document.getElementById('copied').style.display = 'block';
      setTimeout(function() {
          document.getElementById('copied').style.display = 'none';
      }, 1000);
  })
  .catch((error) => {
      console.error("Error copying text to clipboard: ", error);
  });
})


function profile_modal(){
    var element = document.getElementById('profile-card');
    var element2 = document.getElementById('m-profile-card');
    element.classList.remove('show');
    element2.classList.remove('show');
    var modal = document.getElementById('profile-modal');
    modal.classList.remove('show');
}

function mprofile(){
    var element = document.getElementById('m-profile-card');
    var modal = document.getElementById('profile-modal');
    modal.classList.toggle('show');
    element.classList.toggle('show');
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





function editcontainer(){
  var edit = document.getElementById('edit-container');
  edit.classList.add('show');
}

function m_editcontainer(event){

  const x = event.clientX;
  const y = event.clientY;
  var edit = document.getElementById('edit-container');
  edit.style.top = `${y+50}px` ;
  edit.classList.add('show');
}



function cancel_edit(){
    var edit = document.getElementById('edit-container');
    edit.classList.remove('show');
}


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







//function show_comment(){
  //var element  =  document.getElementById('comment-container');
  //element.classList.add('show');
//}

function hide_comment(){
  var element  =  document.getElementById('comment-container');
  element.classList.remove('show');
}

function m_hide_comment(){
  var element  =  document.getElementById('m-comment-container');
  element.classList.remove('show');
}


function m_tribute_comment(){
  var element  =  document.getElementById('m-tribute-container');
  element.classList.remove('show');
}

function tribute_comment(){
  var element  =  document.getElementById('tribute-container');
  element.classList.remove('show');
}



var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function currentDiv(n) {
showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";

  }
  x[slideIndex-1].style.display = "block";
  if(x[slideIndex-1].style.display == "block"){
    if(slideIndex>1 && slideIndex<x.length){
      var photoId = x[slideIndex-1].querySelector('input').value;
      var element  =  document.getElementById('comment-container');
      //element.classList.add('show');
      if(element.classList.contains('show')){
        const url = `/photos/${photoId}/comments/`;




          fetch(url)
          .then(response => response.json())
          .then(comments_data => {
            const container = document.querySelector('.comment-box');
            container.innerHTML = '';

            comments_data.forEach(comment => {
              const comment_card = document.createElement('div');
              const card1 = document.createElement('div');
              card1.classList.add('card1');
              const box1 = document.createElement('div');
              const box2 = document.createElement('div');
              box1.classList.add('box1');
              box2.classList.add('box2');
              box2.setAttribute('data-comment-id',`${comment.comment_id}`);
              //box2.classList.add('elipsis');

              if(comment.comment_by == comment.login_user){
                box2.classList.add('elipsis');
              }
              else{
                box2.classList.add('elipsis-X');

              }
              const ellipsis = document.createElement('i');
              ellipsis.classList.add('fa-solid');
              ellipsis.classList.add('fa-ellipsis');
              const initials = document.createElement('div');
              initials.classList.add('icon');
              initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
              const user_box = document.createElement('div');
              user_box.classList.add('user-box');
              const user_name = document.createElement('div');
              user_name.classList.add('name');
              user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
              const time = document.createElement('time');
              time.classList.add('time');

              const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              });
              time.innerHTML = `${formattedDate}`;
              //append
              box2.appendChild(ellipsis);
              user_box.appendChild(user_name);
              user_box.appendChild(time);
              box1.appendChild(initials);
              box1.appendChild(user_box);
              card1.appendChild(box1);
              card1.appendChild(box2);



              const card2 = document.createElement('div');
              card2.classList.add('card2');
              const text = document.createElement('div');
              text.classList.add('text');
              text.textContent= `${comment.text}`;
              card2.appendChild(text);


              const card3 = document.createElement('div');
              card3.classList.add('delete-card');
              const icon = document.createElement('div');
              icon.classList.add('icon');
              card3.setAttribute('id',`icon${comment.comment_id}`);
              card3.setAttribute('data-delete-id',`${comment.comment_id}`);
              const fa_trash = document.createElement('i');
              fa_trash.classList.add('fa-solid');
              fa_trash.classList.add('fa-trash');
              const del_text = document.createElement('div');
              del_text.classList.add('text');
              if(comment.comment_by == comment.login_user){
                del_text.innerHTML = 'Delete';
              }
              else{
                del_text.innerHTML = "can't delete"
              }
              //del_text.innerHTML = 'Delete';
              //append
              icon.appendChild(fa_trash);
              card3.appendChild(icon);
              card3.appendChild(del_text);

              //append event to delete icon




              //end append





              comment_card.appendChild(card1);
              comment_card.appendChild(card2);
              comment_card.appendChild(card3);
              comment_card.classList.add('comment-card');

              container.appendChild(comment_card);
            });

            const deleteBtns = document.querySelectorAll('.elipsis');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns.forEach(btn => {
              //console.log('hhr',btn);
             btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');
                parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('comment-modal').style.display = 'block';
                  document.getElementById('comment-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('comment-modal').style.display = 'none';
                  });

                  //add event to delete btn
                  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                  parent_card.addEventListener('click',()=>{
                    fetch(`/delete-comment/${commentId}/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                      },
                    })
                      .then(response => {
                        if (response.ok) {
                          // Remove the comment element from the DOM
                          //const commentEl = btn.closest('.comment');

                          //commentEl.remove();
                          btn.closest('.comment-card').remove();
                          document.getElementById('comment-modal').style.display = 'none';

                        } else {
                          throw new Error('Failed to delete comment.');
                        }
                      })
                      .catch(error => console.error(error));
                  });

                }




              });
            });

            const deleteBtns_X = document.querySelectorAll('.elipsis-X');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns_X.forEach(btn => {
              //console.log('hhr',btn);
            btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

              parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('comment-modal').style.display = 'block';
                  document.getElementById('comment-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('comment-modal').style.display = 'none';
                  });
                }
            });

          });

          });
      }
      const like_url = `/like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = x[slideIndex-1].querySelector('.num');
        var btn = x[slideIndex-1].querySelector('.like-btn');

        if (data.liked) {

          btn.classList.add('liked');
          //likeCount.textContent = data.count + ' likes';
          likeCount.textContent = data.count ;
        } else {
          btn.classList.remove('liked');
          likeCount.textContent = data.count ;
        }
      });
    }
    else{
      var photoId = x[slideIndex-1].querySelector('input').value;
      const like_url = `/cover-like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = x[slideIndex-1].querySelector('.num');
        var btn = x[slideIndex-1].querySelector('.like-cover');

        if (data.liked) {

          btn.classList.add('liked');
          //likeCount.textContent = data.count + ' likes';
          likeCount.textContent = data.count ;
        } else {
          btn.classList.remove('liked');
          likeCount.textContent = data.count ;
        }
      });
    }
  }
}






const commentForm = document.querySelector('#comment-container');

commentForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  let photoId;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    if(x[i].style.display == "block"){
      photoId = x[i].querySelector('input').value;
      //console.log(x[i].querySelector('input'));
    }
  }


  //const photoId = document.querySelector('input[name="photo_id"]').value; // Get the photo ID from a hidden input field
  const commentContent = document.querySelector('textarea[name="comment_content"]').value; // Get the comment content from the textarea

  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', `/add-comment/${photoId}/`); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);

  xhr.onload = function() {
    if (xhr.status === 200) {
      setTimeout(function() {
        document.querySelector('textarea[name="comment_content"]').value = '';
        const url = `/photos/${photoId}/comments/`;

        fetch(url)
          .then(response => response.json())
          .then(comments_data => {
            const container = document.querySelector('.comment-box');
            container.innerHTML = '';

            comments_data.forEach(comment => {
              const comment_card = document.createElement('div');
              const card1 = document.createElement('div');
              card1.classList.add('card1');
              const box1 = document.createElement('div');
              const box2 = document.createElement('div');
              box1.classList.add('box1');
              box2.classList.add('box2');
              box2.setAttribute('data-comment-id',`${comment.comment_id}`);
              //box2.classList.add('elipsis');

              if(comment.comment_by == comment.login_user){
                box2.classList.add('elipsis');
              }
              else{
                box2.classList.add('elipsis-X');

              }
              const ellipsis = document.createElement('i');
              ellipsis.classList.add('fa-solid');
              ellipsis.classList.add('fa-ellipsis');
              const initials = document.createElement('div');
              initials.classList.add('icon');
              initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
              const user_box = document.createElement('div');
              user_box.classList.add('user-box');
              const user_name = document.createElement('div');
              user_name.classList.add('name');
              user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
              const time = document.createElement('time');
              time.classList.add('time');

              const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              });
              time.innerHTML = `${formattedDate}`;
              //append
              box2.appendChild(ellipsis);
              user_box.appendChild(user_name);
              user_box.appendChild(time);
              box1.appendChild(initials);
              box1.appendChild(user_box);
              card1.appendChild(box1);
              card1.appendChild(box2);



              const card2 = document.createElement('div');
              card2.classList.add('card2');
              const text = document.createElement('div');
              text.classList.add('text');
              text.textContent= `${comment.text}`;
              card2.appendChild(text);


              const card3 = document.createElement('div');
              card3.classList.add('delete-card');
              const icon = document.createElement('div');
              icon.classList.add('icon');
              card3.setAttribute('id',`icon${comment.comment_id}`);
              card3.setAttribute('data-delete-id',`${comment.comment_id}`);
              const fa_trash = document.createElement('i');
              fa_trash.classList.add('fa-solid');
              fa_trash.classList.add('fa-trash');
              const del_text = document.createElement('div');
              del_text.classList.add('text');
              if(comment.comment_by == comment.login_user){
                del_text.innerHTML = 'Delete';
              }
              else{
                del_text.innerHTML = "can't delete"
              }
              //del_text.innerHTML = 'Delete';
              //append
              icon.appendChild(fa_trash);
              card3.appendChild(icon);
              card3.appendChild(del_text);

              //append event to delete icon




              //end append





              comment_card.appendChild(card1);
              comment_card.appendChild(card2);
              comment_card.appendChild(card3);
              comment_card.classList.add('comment-card');

              container.appendChild(comment_card);
            });

            const deleteBtns = document.querySelectorAll('.elipsis');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns.forEach(btn => {
              //console.log('hhr',btn);
             btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');
                parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('comment-modal').style.display = 'block';
                  document.getElementById('comment-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('comment-modal').style.display = 'none';
                  });

                  //add event to delete btn
                  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                  parent_card.addEventListener('click',()=>{
                    fetch(`/delete-comment/${commentId}/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                      },
                    })
                      .then(response => {
                        if (response.ok) {
                          // Remove the comment element from the DOM
                          //const commentEl = btn.closest('.comment');

                          //commentEl.remove();
                          btn.closest('.comment-card').remove();
                          document.getElementById('comment-modal').style.display = 'none';

                        } else {
                          throw new Error('Failed to delete comment.');
                        }
                      })
                      .catch(error => console.error(error));
                  });

                }




              });
            });

            const deleteBtns_X = document.querySelectorAll('.elipsis-X');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns_X.forEach(btn => {
              //console.log('hhr',btn);
            btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

              parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('comment-modal').style.display = 'block';
                  document.getElementById('comment-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('comment-modal').style.display = 'none';
                  });
                }
            });

          });

          });
        }, 1000);
      // Request was successful
      // Update the page with the new comment
      //const commentList = document.querySelector(`#photo-${photoId} .comment-list`);
      //const newComment = document.createElement('li');
      //newComment.textContent = commentContent;
      //commentList.appendChild(newComment);

    }
    else if(xhr.status === 500){
      window.location.href = '/Auth-memorial/';
    }

    else {
      // Request failed

      console.error(`Server returned status ${xhr.status}`);

    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };

  xhr.send(`comment_content=${encodeURIComponent(commentContent)}`); // Send the request with the comment content in the request body
});






document.querySelectorAll('.fetch-comments-btn').forEach(button => {
  button.addEventListener('click', event => {
    var element  =  document.getElementById('comment-container');
    element.classList.add('show');
    const photoId = event.target.getAttribute('data-photo-id');
    const url = `/photos/${photoId}/comments/`;



    fetch(url)
      .then(response => response.json())
      .then(comments_data => {
        const container = document.querySelector('.comment-box');
        container.innerHTML = '';

        comments_data.forEach(comment => {
          const comment_card = document.createElement('div');
          const card1 = document.createElement('div');
          card1.classList.add('card1');
          const box1 = document.createElement('div');
          const box2 = document.createElement('div');
          box1.classList.add('box1');
          box2.classList.add('box2');
          box2.setAttribute('data-comment-id',`${comment.comment_id}`);
          box2.classList.add('elipsis');
          const ellipsis = document.createElement('i');
          ellipsis.classList.add('fa-solid');
          ellipsis.classList.add('fa-ellipsis');
          const initials = document.createElement('div');
          initials.classList.add('icon');
          initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
          const user_box = document.createElement('div');
          user_box.classList.add('user-box');
          const user_name = document.createElement('div');
          user_name.classList.add('name');
          user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
          const time = document.createElement('time');
          time.classList.add('time');

          const dateString = `${comment.date}`;
          const dateObject = new Date(dateString);
          const formattedDate = dateObject.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          });
          time.innerHTML = `${formattedDate}`;
          //append
          box2.appendChild(ellipsis);
          user_box.appendChild(user_name);
          user_box.appendChild(time);
          box1.appendChild(initials);
          box1.appendChild(user_box);
          card1.appendChild(box1);
          card1.appendChild(box2);



          const card2 = document.createElement('div');
          card2.classList.add('card2');
          const text = document.createElement('div');
          text.classList.add('text');
          text.textContent= `${comment.text}`;
          card2.appendChild(text);


          const card3 = document.createElement('div');
          card3.classList.add('delete-card');
          const icon = document.createElement('div');
          icon.classList.add('icon');
          card3.setAttribute('id',`icon${comment.comment_id}`);
          card3.setAttribute('data-delete-id',`${comment.comment_id}`);
          const fa_trash = document.createElement('i');
          fa_trash.classList.add('fa-solid');
          fa_trash.classList.add('fa-trash');
          const del_text = document.createElement('div');
          del_text.classList.add('text');
          del_text.innerHTML = 'Delete';
          //append
          icon.appendChild(fa_trash);
          card3.appendChild(icon);
          card3.appendChild(del_text);

          //append event to delete icon




          //end append





          comment_card.appendChild(card1);
          comment_card.appendChild(card2);
          comment_card.appendChild(card3);
          comment_card.classList.add('comment-card');

          container.appendChild(comment_card);
        });

        const deleteBtns = document.querySelectorAll('.elipsis');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteBtns.forEach(btn => {
          //console.log('hhr',btn);
         btn.addEventListener('click', () => {
            const commentId = btn.getAttribute('data-comment-id');
            let parent_card = btn.closest('.comment-card').querySelector('.delete-card');
            parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){
              document.getElementById('comment-modal').style.display = 'block';
              document.getElementById('comment-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('comment-modal').style.display = 'none';
              });

              //add event to delete btn
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              parent_card.addEventListener('click',()=>{
                fetch(`/delete-comment/${commentId}/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      // Remove the comment element from the DOM
                      //const commentEl = btn.closest('.comment');

                      //commentEl.remove();
                      btn.closest('.comment-card').remove();
                      document.getElementById('comment-modal').style.display = 'none';

                    } else {
                      throw new Error('Failed to delete comment.');
                    }
                  })
                  .catch(error => console.error(error));
              });

            }




          });
        });

      });
  });
});









const inviteForm = document.querySelector('#invite-form');

inviteForm.addEventListener('submit', function(event) {

  event.preventDefault(); // Prevent default form submission behavior
  //const photoId = document.querySelector('input[name="photo_id"]').value; // Get the photo ID from a hidden input field
  //const commentContent = document.querySelector('textarea[name="comment_content"]').value; // Get the comment content from the textarea
  //const formData = new FormData(inviteForm);

  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', '/invite-contributor/'); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);

  xhr.onload = function() {
    if (xhr.status === 200) {

        setTimeout(function() {
          location.reload();
      }, 500);
      // Request was successful
      // Update the page with the new comment
      //const commentList = document.querySelector(`#photo-${photoId} .comment-list`);
      //const newComment = document.createElement('li');
      //newComment.textContent = commentContent;
      //commentList.appendChild(newComment);

    } else {
      // Request failed
      console.error(`Server returned status ${xhr.status}`);
    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };

  //var data = encodeURI('email=' + form.email.value + '&name=' + form.name.value + '&message=' + form.message.value);
  var data = encodeURI('email=' + inviteForm.email.value  + '&name=' + inviteForm.name.value  + '&memorials=' + inviteForm.memorials.value);
  xhr.send(data); // Send the request with the comment content in the request body
});







document.querySelectorAll('.like-btn').forEach(button => {
  button.addEventListener('click',  ()=> {

    const photoId = button.getAttribute('data-photo-id');
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
    //const url = `/photos/${photoId}/comments/`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/like-photo/${photoId}/`);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      //var likeBtn = document.getElementById('like-btn');
      var likeCount = button.querySelector('.num');
      if (data.liked) {

        button.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;

        button.querySelector('.fly-icon');

        button.querySelector('.fly-icon').style.display = 'block';
        button.querySelector('.fly-icon').style.animationPlayState = 'running';
        setTimeout(function() {
          button.querySelector('.fly-icon').style.display = 'none';
        }, 2000);
      } else {
        button.querySelector('.fly-icon').style.display = 'none';
        button.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
    };
    xhr.send();
  });
});




document.querySelectorAll('.like-cover').forEach(button => {
  button.addEventListener('click',  ()=> {

    const photoId = button.getAttribute('data-photo-id');

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
    //const url = `/photos/${photoId}/comments/`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/like-cover/${photoId}/`);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      //var likeBtn = document.getElementById('like-btn');
      var likeCount = button.querySelector('.num');
      if (data.liked) {

        button.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
        button.querySelector('.fly-icon');
        button.querySelector('.fly-icon').style.display = 'block';
        button.querySelector('.fly-icon').style.animationPlayState = 'running';
        setTimeout(function() {
          button.querySelector('.fly-icon').style.display = 'none';
        }, 2000);

      } else {
        button.querySelector('.fly-icon').style.display = 'none';
        button.classList.remove('liked');
        likeCount.textContent = data.count ;

      }
    };
    xhr.send();
  });
});






/*
var m_slideIndex = 1;
m_showDivs(m_slideIndex);

function m_plusDivs(n) {
m_showDivs(m_slideIndex += n);
}

function m_currentDiv(n) {
m_showDivs(m_slideIndex = n);
}

function m_showDivs(n) {
  var i;
  var x = document.getElementsByClassName("m-slides");
  if (n > x.length) {m_slideIndex = 1}
  if (n < 1) {m_slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";

  }
  x[m_slideIndex-1].style.display = "block";

  if(x[m_slideIndex-1].style.display == "block"){
    if(m_slideIndex>1 && m_slideIndex < x.length){
      var photoId = x[m_slideIndex-1].querySelector('input').value;
      const like_url = `/like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = x[m_slideIndex-1].querySelector('.num');
        var btn = x[m_slideIndex-1].querySelector('.like-btn');

        if (data.liked) {

          btn.classList.add('liked');
          //likeCount.textContent = data.count + ' likes';
          likeCount.textContent = data.count ;
        } else {
          btn.classList.remove('liked');
          likeCount.textContent = data.count ;
        }
      });
    }
    else{
      var photoId = x[m_slideIndex-1].querySelector('input').value;
      const like_url = `/cover-like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = x[m_slideIndex-1].querySelector('.num');
        var btn = x[m_slideIndex-1].querySelector('.like-cover');

        if (data.liked) {

          btn.classList.add('liked');
          //likeCount.textContent = data.count + ' likes';
          likeCount.textContent = data.count ;
        } else {
          btn.classList.remove('liked');
          likeCount.textContent = data.count ;
        }
      });
    }
  }
}
 */



//submit mobile comments

const m_commentForm = document.querySelector('#m-comment-container');

m_commentForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  let photoId;
  var x = document.getElementsByClassName("m-slides");
  //for (i = 0; i < x.length; i++) {
    //if(x[i].style.display == "block"){
      //photoId = x[i].querySelector('input').value;
      //console.log(x[i].querySelector('input'));
    //}
  //}
  var currentSlide = mySwiper.activeIndex + 1;
  var totalSlides = mySwiper.slides.length;
  var element_index = mySwiper.slides[mySwiper.activeIndex];

  photoId = element_index.querySelector('input').value;
  //const photoId = document.querySelector('input[name="photo_id"]').value; // Get the photo ID from a hidden input field
  const commentContent = document.querySelector('textarea[name="m_comment_content"]').value; // Get the comment content from the textarea
  const parent_reply_id = document.querySelector('input[name="parent_reply_id"]').value;
  const comment_id = document.querySelector('input[name="comment_id"]').value;

  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', `/add-comment/${photoId}/`); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);

  xhr.onload = function() {
    if (xhr.status === 200) {
      setTimeout(function() {
        document.querySelector('textarea[name="m_comment_content"]').value = '';
        document.querySelector('input[name="parent_reply_id"]').value =  '';
        document.querySelector('input[name="comment_id"]').value = '';
        document.getElementById('reply-top-container').classList.remove('show');
        const url = `/photos/${photoId}/comments/`;
        fetch(url)
        .then(response => response.json())

        .then(comments_data => {

          const container = document.querySelector('.m-comment-box');
          container.innerHTML = '';
          console.log('nn',comments_data)
          comments_data.forEach(comment => {
            //console.log('reply#',comment.replies.first_name);
            element_index.querySelector('.num-comment').textContent =comment.comment_count ;
            const comment_card = document.createElement('div');
            const card1 = document.createElement('div');

            const card4 = document.createElement('div');// reply div


            card1.classList.add('card1');
            card4.classList.add('card4');

            const box1 = document.createElement('div');
            const box2 = document.createElement('div');
            box1.classList.add('box1');
            box2.classList.add('box2');
            box2.setAttribute('data-comment-id',`${comment.comment_id}`);

            if(comment.comment_by == comment.login_user){
              box2.classList.add('elipsis');
            }
            else{
              box2.classList.add('elipsis-X');
            }

            const ellipsis = document.createElement('i');
            ellipsis.classList.add('fa-solid');
            ellipsis.classList.add('fa-ellipsis');

            const initials = document.createElement('img');
            initials.src = `${comment.image}`;
            initials.classList.add('icon');
            //initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
            const user_box = document.createElement('div');
            user_box.classList.add('user-box');
            const user_name = document.createElement('div');
            user_name.classList.add('name');
            user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
            const time = document.createElement('time');
            time.classList.add('time');

           /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */
            time.innerHTML = `${comment.date}`;
            //append
            box2.appendChild(ellipsis);
            user_box.appendChild(user_name);
            user_box.appendChild(time);
            box1.appendChild(initials);
            box1.appendChild(user_box);
            card1.appendChild(box1);
            card1.appendChild(box2);



            const card2 = document.createElement('div');
            card2.classList.add('card2');
            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent= `${comment.text}`;
            card2.appendChild(text);


            const card3 = document.createElement('div');
            card3.classList.add('delete-card');
            const icon = document.createElement('div');
            icon.classList.add('icon');
            card3.setAttribute('id',`icon${comment.comment_id}`);
            card3.setAttribute('data-delete-id',`${comment.comment_id}`);
            const fa_trash = document.createElement('i');
            fa_trash.classList.add('fa-solid');
            fa_trash.classList.add('fa-trash');
            const del_text = document.createElement('div');
            del_text.classList.add('text');


            const card4_box1 = document.createElement('div');
            const card4_box2 = document.createElement('div');
            card4_box1.classList.add('card4-box1');
            card4_box2.classList.add('card4-box2');
            //card4_box2.setAttribute('onclick',`HeartComment(event)`);
            card4_box1.setAttribute('data-comment-id',`${comment.comment_id}`);
            const card4_text1 = document.createElement('span');
           // card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id},${comment.first_name},${comment.last_name})`);
            card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id}, "${comment.first_name}", "${comment.last_name}")`);
            const card4_text2 = document.createElement('span');
            const card4_text5 = document.createElement('span');
            card4_text5.classList.add('card4-text5');
            card4_text2.setAttribute('onclick',`LikeComment(event)`);
            card4_text2.setAttribute('data-comment-id',`${comment.comment_id}`);
            if (comment.liked){
              card4_text2.style.color = 'blue';
            }
            else{
              card4_text2.style.color = 'black';
            }
            card4_text5.textContent = comment.count_likes;
            card4_text1.textContent = 'Reply';
            card4_text2.textContent = 'Like';
            card4_text1.classList.add('card4-text1');
            card4_text2.classList.add('card4-text2');

            const card4_text3 = document.createElement('i');
            const card4_text4 = document.createElement('span');

            if(comment.heart){
              card4_text3.style.color = 'red';
              card4_text3.classList.add('fa-solid');
              card4_text3.classList.add('fa-heart');
            }
            else{
              card4_text3.style.color = 'black';
              card4_text3.classList.add('fa-regular');
              card4_text3.classList.add('fa-heart');
            }

            card4_text3.setAttribute('onclick',`HeartComment(event)`);
            card4_text3.setAttribute('data-comment-id',`${comment.comment_id}`);

            card4_text4.classList.add('card4-text4');
            card4_text4.textContent = comment.count_heart;
            card4_box1.appendChild(card4_text1);
            card4_box1.appendChild(card4_text2);
            card4_box1.appendChild(card4_text5);

            card4_box2.appendChild(card4_text3);
            card4_box2.appendChild(card4_text4);




            if(comment.comment_by == comment.login_user){
              del_text.innerHTML = 'Delete';
            }
            else{
              del_text.innerHTML = "can't delete"
            }

            //append
            icon.appendChild(fa_trash);
            card3.appendChild(icon);
            card3.appendChild(del_text);

            card4.appendChild(card4_box1);
            card4.appendChild(card4_box2);

            //append event to delete icon




            //end append





            comment_card.appendChild(card1);
            comment_card.appendChild(card2);
            comment_card.appendChild(card3);
            comment_card.appendChild(card4);
            //comment_card.appendChild(card5);
            const card5 = document.createElement('div');
              card5.classList.add('card5');
              const card5_box1 = document.createElement('div');
              card5_box1.setAttribute('onclick','showReply(event)');
            card5_box1.classList.add('card5-box1');
            card5_box1.textContent = `---  View replies(${comment.replies.length})`;
            card5.appendChild(card5_box1);

            comment.replies.forEach(reply=>{
              /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */


            //replycard
            const reply_card = document.createElement('div');
            reply_card.classList.add('reply-card');
            card5.appendChild(reply_card);

            //create element in reply card
            const reply_card1 = document.createElement('div');
            const reply_card2 = document.createElement('div');
            const reply_delete_card = document.createElement('div');
            const reply_card4 = document.createElement('div');

            //add classlist in reply card
            reply_card1.classList.add('reply-card1');
            reply_card2.classList.add('reply-card2');
            reply_delete_card.classList.add('reply-delete-card');

            reply_card4.classList.add('reply-card4');
            const reply_card4_box1 = document.createElement('div');
            const reply_card4_box2 = document.createElement('div');
            reply_card4_box1.classList.add('reply-card4-box1');
            reply_card4_box2.classList.add('reply-card4-box2');
            const reply_card4_text1 = document.createElement('span');
            const reply_card4_text2 = document.createElement('span');
            const reply_card4_text5 = document.createElement('span');

            reply_card4_text2.setAttribute('onclick',`LikeReply(event)`);
            reply_card4_text2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const reply_card4_text3 = document.createElement('i');
            const reply_card4_text4 = document.createElement('span');

            //add class
            if(reply.heart){
              reply_card4_text3.classList.add('fa-solid');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'red';
            }
            else{
              reply_card4_text3.classList.add('fa-regular');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'black';
            }

            reply_card4_text3.setAttribute('onclick',`HeartReply(event)`);
            reply_card4_text3.setAttribute('data-reply-id',`${reply.reply_id}`);
            reply_card4_text4.classList.add('card4-text4');
            reply_card4_text1.classList.add('reply-card4-text1');
            reply_card4_text2.classList.add('reply-card4-text2');
            reply_card4_text5.classList.add('reply-card4-text5');
            reply_card4_text5.textContent = reply.count_likes;
            reply_card4_text4.textContent = reply.count_heart;
            //reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id})`);
            reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id},"${reply.first_name}","${reply.last_name}")`);
            reply_card4_text1.textContent = 'Reply';
            if(reply.liked){
              reply_card4_text2.style.color = 'blue';

            }
            else{
              reply_card4_text2.style.color = 'black';
            }
            reply_card4_text2.textContent = 'Like';//LikeReply(event)

            reply_card4_box1.appendChild(reply_card4_text1);
            reply_card4_box1.appendChild(reply_card4_text2);
            reply_card4_box1.appendChild(reply_card4_text5);
            reply_card4_box2.appendChild(reply_card4_text3);
            reply_card4_box2.appendChild(reply_card4_text4);
            reply_card4.appendChild(reply_card4_box1);
            reply_card4.appendChild(reply_card4_box2);






            //create element to reply card1
            const reply_box1 = document.createElement('div')
            const reply_icon = document.createElement('img');
            const reply_user_box = document.createElement('div');
            const reply_name = document.createElement('div');
            reply_name.textContent = `${reply.first_name} ${reply.last_name}`;
            const reply_time = document.createElement('div');
            reply_time.textContent = `${reply.date}`;
            reply_name.classList.add('reply-name');
            reply_time.classList.add('reply-time');
            reply_user_box.appendChild(reply_name);
            reply_user_box.appendChild(reply_time);
            reply_icon.classList.add('reply-user');
            reply_icon.src = `${comment.image}`;
            //reply_icon.textContent = `${reply.first_name[0]} ${reply.last_name[0]}`;
            reply_user_box.classList.add('reply-user-box');
            reply_box1.appendChild(reply_icon);
            reply_box1.appendChild(reply_user_box);


            const reply_box2 = document.createElement('div')
            reply_box1.classList.add('reply-box1');
            reply_box2.classList.add('reply-box2');

            if(reply.reply_by == reply.login_user){
              reply_box2.classList.add('reply-elipsis');
            }
            else{
              reply_box2.classList.add('reply-elipsis-X');
            }
            reply_box2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const elipsisX = document.createElement('i');
            elipsisX.classList.add('fa-solid');
            elipsisX.classList.add('fa-ellipsis');
            reply_box2.appendChild(elipsisX);
            reply_card1.appendChild(reply_box1);
            reply_card1.appendChild(reply_box2);

            //create element to reply card2  reply_delete_card
            const reply_card2_text = document.createElement('div');
            reply_card2_text.classList.add('text');
            reply_card2_text.textContent = `${reply.text}`;
            reply_card2.appendChild(reply_card2_text);

            //create element to  reply_delete_card
            const reply_delete_icon = document.createElement('div');
            reply_delete_icon.classList.add('icon');
            const reply_delete_text = document.createElement('div');
            reply_delete_text.classList.add('text');

            if(reply.reply_by == reply.login_user){
              reply_delete_text.textContent = "delete";
            }
            else{
              reply_delete_text.textContent = "can't delete";
            }

            const reply_trash = document.createElement('i');
            reply_trash.classList.add('fa-solid');
            reply_trash.classList.add('fa-trash');
            reply_delete_icon.appendChild(reply_trash);
            reply_delete_card.appendChild(reply_delete_icon);
            reply_delete_card.appendChild(reply_delete_text);

            //append card1,2,3,4 to reply card
            reply_card.appendChild(reply_card1);
            reply_card.appendChild(reply_card2);
            reply_card.appendChild(reply_delete_card);
            //reply_card4.appendChild(card4_box1);
            //reply_card4.appendChild(card4_box2);
            reply_card.appendChild(reply_card4);
            comment_card.appendChild(card5);
            });

            comment_card.classList.add('comment-card');

            container.appendChild(comment_card);

            });

           //end

          const deleteBtns = document.querySelectorAll('.elipsis');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });


                //add event to delete btn
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                parent_card.addEventListener('click',()=>{
                  fetch(`/delete-comment/${commentId}/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                    },
                  })
                    .then(response => {
                      if (response.ok) {
                        // Remove the comment element from the DOM
                        //const commentEl = btn.closest('.comment');

                        //commentEl.remove();
                        btn.closest('.comment-card').remove();
                        document.getElementById('m-comment-modal').style.display = 'none';

                      } else {
                        throw new Error('Failed to delete comment.');
                      }
                    })
                    .catch(error => console.error(error));
                });

              }




            });
          });
          const deleteBtns_X = document.querySelectorAll('.elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });
              }
          });

        });

        //delete reply btn
        const deleteReply = document.querySelectorAll('.reply-elipsis');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteReply.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {

            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){

              document.getElementById('m-comment-modal').style.display = 'block';
              document.getElementById('m-comment-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-comment-modal').style.display = 'none';
              });


              //add event to delete btn
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              parent_card.addEventListener('click',()=>{
                console.log('hhr',parent_card,replyId);
                fetch(`/delete-reply/${replyId}/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      // Remove the comment element from the DOM
                      //const commentEl = btn.closest('.comment');

                      //commentEl.remove();
                      btn.closest('.reply-card').remove();
                      document.getElementById('m-comment-modal').style.display = 'none';

                    } else {
                      throw new Error('Failed to delete comment.');
                    }
                  })
                  .catch(error => console.error(error));
              });

            }




          });
        });

        const deleteReply_X = document.querySelectorAll('.reply-elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteReply_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });
              }
          });

        });



      });
      }, 1000);


      // Request was successful
      // Update the page with the new comment
      //const commentList = document.querySelector(`#photo-${photoId} .comment-list`);
      //const newComment = document.createElement('li');
      //newComment.textContent = commentContent;
      //commentList.appendChild(newComment);

    } else {
      // Request failed
      console.error(`Server returned status ${xhr.status}`);

    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };
  console.log('data:',parent_reply_id, commentContent);
  var data = encodeURI('comment_content=' + commentContent + '&comment_id=' + comment_id  + '&parent_reply_id=' + parent_reply_id);
  xhr.send(data);
  //xhr.send(`comment_content=${encodeURIComponent(commentContent)}`); // Send the request with the comment content in the request body
});


//list mobile comments

document.querySelectorAll('.m-fetch-comments-btn').forEach(button => {
  button.addEventListener('click', event => {
    var element  =  document.getElementById('m-comment-container');
    element.classList.add('show');
    const photoId = event.target.getAttribute('data-photo-id');
    const url = `/photos/${photoId}/comments/`;
    //console.log(event.target);
    //console.log(photoId)

    fetch(url)
      .then(response => response.json())
      .then(comments_data => {

          const container = document.querySelector('.m-comment-box');
          container.innerHTML = '';
          console.log('nn',comments_data)
          comments_data.forEach(comment => {
            //console.log('reply#',comment.replies.first_name);
            const comment_card = document.createElement('div');
            const card1 = document.createElement('div');

            const card4 = document.createElement('div');// reply div


            card1.classList.add('card1');
            card4.classList.add('card4');

            const box1 = document.createElement('div');
            const box2 = document.createElement('div');
            box1.classList.add('box1');
            box2.classList.add('box2');
            box2.setAttribute('data-comment-id',`${comment.comment_id}`);

            if(comment.comment_by == comment.login_user){
              box2.classList.add('elipsis');
            }
            else{
              box2.classList.add('elipsis-X');
            }

            const ellipsis = document.createElement('i');
            ellipsis.classList.add('fa-solid');
            ellipsis.classList.add('fa-ellipsis');

            const initials = document.createElement('img');
            initials.src = `${comment.image}`;
            initials.classList.add('icon');
            //initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
            const user_box = document.createElement('div');
            user_box.classList.add('user-box');
            const user_name = document.createElement('div');
            user_name.classList.add('name');
            user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
            const time = document.createElement('time');
            time.classList.add('time');

           /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */
            time.innerHTML = `${comment.date}`;
            //append
            box2.appendChild(ellipsis);
            user_box.appendChild(user_name);
            user_box.appendChild(time);
            box1.appendChild(initials);
            box1.appendChild(user_box);
            card1.appendChild(box1);
            card1.appendChild(box2);



            const card2 = document.createElement('div');
            card2.classList.add('card2');
            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent= `${comment.text}`;
            card2.appendChild(text);


            const card3 = document.createElement('div');
            card3.classList.add('delete-card');
            const icon = document.createElement('div');
            icon.classList.add('icon');
            card3.setAttribute('id',`icon${comment.comment_id}`);
            card3.setAttribute('data-delete-id',`${comment.comment_id}`);
            const fa_trash = document.createElement('i');
            fa_trash.classList.add('fa-solid');
            fa_trash.classList.add('fa-trash');
            const del_text = document.createElement('div');
            del_text.classList.add('text');


            const card4_box1 = document.createElement('div');
            const card4_box2 = document.createElement('div');
            card4_box1.classList.add('card4-box1');
            card4_box2.classList.add('card4-box2');
            //card4_box2.setAttribute('onclick',`HeartComment(event)`);
            card4_box1.setAttribute('data-comment-id',`${comment.comment_id}`);
            const card4_text1 = document.createElement('span');
           // card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id},${comment.first_name},${comment.last_name})`);
            card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id}, "${comment.first_name}", "${comment.last_name}")`);
            const card4_text2 = document.createElement('span');
            const card4_text5 = document.createElement('span');
            card4_text5.classList.add('card4-text5');
            card4_text2.setAttribute('onclick',`LikeComment(event)`);
            card4_text2.setAttribute('data-comment-id',`${comment.comment_id}`);
            if (comment.liked){
              card4_text2.style.color = 'blue';
            }
            else{
              card4_text2.style.color = 'black';
            }
            card4_text5.textContent = comment.count_likes;
            card4_text1.textContent = 'Reply';
            card4_text2.textContent = 'Like';
            card4_text1.classList.add('card4-text1');
            card4_text2.classList.add('card4-text2');

            const card4_text3 = document.createElement('i');
            const card4_text4 = document.createElement('span');

            if(comment.heart){
              card4_text3.style.color = 'red';
              card4_text3.classList.add('fa-solid');
              card4_text3.classList.add('fa-heart');
            }
            else{
              card4_text3.style.color = 'black';
              card4_text3.classList.add('fa-regular');
              card4_text3.classList.add('fa-heart');
            }

            card4_text3.setAttribute('onclick',`HeartComment(event)`);
            card4_text3.setAttribute('data-comment-id',`${comment.comment_id}`);

            card4_text4.classList.add('card4-text4');
            card4_text4.textContent = comment.count_heart;
            card4_box1.appendChild(card4_text1);
            card4_box1.appendChild(card4_text2);
            card4_box1.appendChild(card4_text5);

            card4_box2.appendChild(card4_text3);
            card4_box2.appendChild(card4_text4);




            if(comment.comment_by == comment.login_user){
              del_text.innerHTML = 'Delete';
            }
            else{
              del_text.innerHTML = "can't delete"
            }

            //append
            icon.appendChild(fa_trash);
            card3.appendChild(icon);
            card3.appendChild(del_text);

            card4.appendChild(card4_box1);
            card4.appendChild(card4_box2);

            //append event to delete icon




            //end append





            comment_card.appendChild(card1);
            comment_card.appendChild(card2);
            comment_card.appendChild(card3);
            comment_card.appendChild(card4);
            //comment_card.appendChild(card5);
            const card5 = document.createElement('div');
              card5.classList.add('card5');
              const card5_box1 = document.createElement('div');
              card5_box1.setAttribute('onclick','showReply(event)');
            card5_box1.classList.add('card5-box1');
            card5_box1.textContent = `---  View replies(${comment.replies.length})`;
            card5.appendChild(card5_box1);

            comment.replies.forEach(reply=>{
              /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */


            //replycard
            const reply_card = document.createElement('div');
            reply_card.classList.add('reply-card');
            card5.appendChild(reply_card);

            //create element in reply card
            const reply_card1 = document.createElement('div');
            const reply_card2 = document.createElement('div');
            const reply_delete_card = document.createElement('div');
            const reply_card4 = document.createElement('div');

            //add classlist in reply card
            reply_card1.classList.add('reply-card1');
            reply_card2.classList.add('reply-card2');
            reply_delete_card.classList.add('reply-delete-card');

            reply_card4.classList.add('reply-card4');
            const reply_card4_box1 = document.createElement('div');
            const reply_card4_box2 = document.createElement('div');
            reply_card4_box1.classList.add('reply-card4-box1');
            reply_card4_box2.classList.add('reply-card4-box2');
            const reply_card4_text1 = document.createElement('span');
            const reply_card4_text2 = document.createElement('span');
            const reply_card4_text5 = document.createElement('span');

            reply_card4_text2.setAttribute('onclick',`LikeReply(event)`);
            reply_card4_text2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const reply_card4_text3 = document.createElement('i');
            const reply_card4_text4 = document.createElement('span');

            //add class
            if(reply.heart){
              reply_card4_text3.classList.add('fa-solid');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'red';
            }
            else{
              reply_card4_text3.classList.add('fa-regular');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'black';
            }

            reply_card4_text3.setAttribute('onclick',`HeartReply(event)`);
            reply_card4_text3.setAttribute('data-reply-id',`${reply.reply_id}`);
            reply_card4_text4.classList.add('card4-text4');
            reply_card4_text1.classList.add('reply-card4-text1');
            reply_card4_text2.classList.add('reply-card4-text2');
            reply_card4_text5.classList.add('reply-card4-text5');
            reply_card4_text5.textContent = reply.count_likes;
            reply_card4_text4.textContent = reply.count_heart;
            //reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id})`);
            reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id},"${reply.first_name}","${reply.last_name}")`);
            reply_card4_text1.textContent = 'Reply';
            if(reply.liked){
              reply_card4_text2.style.color = 'blue';

            }
            else{
              reply_card4_text2.style.color = 'black';
            }
            reply_card4_text2.textContent = 'Like';//LikeReply(event)

            reply_card4_box1.appendChild(reply_card4_text1);
            reply_card4_box1.appendChild(reply_card4_text2);
            reply_card4_box1.appendChild(reply_card4_text5);
            reply_card4_box2.appendChild(reply_card4_text3);
            reply_card4_box2.appendChild(reply_card4_text4);
            reply_card4.appendChild(reply_card4_box1);
            reply_card4.appendChild(reply_card4_box2);






            //create element to reply card1
            const reply_box1 = document.createElement('div')
            const reply_icon = document.createElement('img');
            const reply_user_box = document.createElement('div');
            const reply_name = document.createElement('div');
            reply_name.textContent = `${reply.first_name} ${reply.last_name}`;
            const reply_time = document.createElement('div');
            reply_time.textContent = `${reply.date}`;
            reply_name.classList.add('reply-name');
            reply_time.classList.add('reply-time');
            reply_user_box.appendChild(reply_name);
            reply_user_box.appendChild(reply_time);
            reply_icon.classList.add('reply-user');
            reply_icon.src = `${comment.image}`;
            //reply_icon.textContent = `${reply.first_name[0]} ${reply.last_name[0]}`;
            reply_user_box.classList.add('reply-user-box');
            reply_box1.appendChild(reply_icon);
            reply_box1.appendChild(reply_user_box);


            const reply_box2 = document.createElement('div')
            reply_box1.classList.add('reply-box1');
            reply_box2.classList.add('reply-box2');

            if(reply.reply_by == reply.login_user){
              reply_box2.classList.add('reply-elipsis');
            }
            else{
              reply_box2.classList.add('reply-elipsis-X');
            }
            reply_box2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const elipsisX = document.createElement('i');
            elipsisX.classList.add('fa-solid');
            elipsisX.classList.add('fa-ellipsis');
            reply_box2.appendChild(elipsisX);
            reply_card1.appendChild(reply_box1);
            reply_card1.appendChild(reply_box2);

            //create element to reply card2  reply_delete_card
            const reply_card2_text = document.createElement('div');
            reply_card2_text.classList.add('text');
            reply_card2_text.textContent = `${reply.text}`;
            reply_card2.appendChild(reply_card2_text);

            //create element to  reply_delete_card
            const reply_delete_icon = document.createElement('div');
            reply_delete_icon.classList.add('icon');
            const reply_delete_text = document.createElement('div');
            reply_delete_text.classList.add('text');

            if(reply.reply_by == reply.login_user){
              reply_delete_text.textContent = "delete";
            }
            else{
              reply_delete_text.textContent = "can't delete";
            }

            const reply_trash = document.createElement('i');
            reply_trash.classList.add('fa-solid');
            reply_trash.classList.add('fa-trash');
            reply_delete_icon.appendChild(reply_trash);
            reply_delete_card.appendChild(reply_delete_icon);
            reply_delete_card.appendChild(reply_delete_text);

            //append card1,2,3,4 to reply card
            reply_card.appendChild(reply_card1);
            reply_card.appendChild(reply_card2);
            reply_card.appendChild(reply_delete_card);
            //reply_card4.appendChild(card4_box1);
            //reply_card4.appendChild(card4_box2);
            reply_card.appendChild(reply_card4);
            comment_card.appendChild(card5);
            });

            comment_card.classList.add('comment-card');

            container.appendChild(comment_card);

            });

           //end

          const deleteBtns = document.querySelectorAll('.elipsis');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });


                //add event to delete btn
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                parent_card.addEventListener('click',()=>{
                  fetch(`/delete-comment/${commentId}/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                    },
                  })
                    .then(response => {
                      if (response.ok) {
                        // Remove the comment element from the DOM
                        //const commentEl = btn.closest('.comment');

                        //commentEl.remove();
                        btn.closest('.comment-card').remove();
                        document.getElementById('m-comment-modal').style.display = 'none';

                      } else {
                        throw new Error('Failed to delete comment.');
                      }
                    })
                    .catch(error => console.error(error));
                });

              }




            });
          });
          const deleteBtns_X = document.querySelectorAll('.elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });
              }
          });

        });

        //delete reply btn
        const deleteReply = document.querySelectorAll('.reply-elipsis');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteReply.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {

            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){

              document.getElementById('m-comment-modal').style.display = 'block';
              document.getElementById('m-comment-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-comment-modal').style.display = 'none';
              });


              //add event to delete btn
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              parent_card.addEventListener('click',()=>{
                console.log('hhr',parent_card,replyId);
                fetch(`/delete-reply/${replyId}/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      // Remove the comment element from the DOM
                      //const commentEl = btn.closest('.comment');

                      //commentEl.remove();
                      btn.closest('.reply-card').remove();
                      document.getElementById('m-comment-modal').style.display = 'none';

                    } else {
                      throw new Error('Failed to delete comment.');
                    }
                  })
                  .catch(error => console.error(error));
              });

            }




          });
        });

        const deleteReply_X = document.querySelectorAll('.reply-elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteReply_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });
              }
          });

        });



      });
  });
});




/*

document.querySelectorAll('.m-fetch-comments-btn').forEach(button => {
  button.addEventListener('click', event => {
    var element  =  document.getElementById('m-comment-container');
    element.classList.add('show');
    const photoId = event.target.getAttribute('data-photo-id');
    const url = `/photos/${photoId}/comments/`;
    //console.log(event.target);
    //console.log(photoId)

    fetch(url)
      .then(response => response.json())
      .then(comments_data => {

          const container = document.querySelector('.m-comment-box');
          container.innerHTML = '';
          console.log('nn',comments_data)
          comments_data.forEach(comment => {
            const comment_card = document.createElement('div');
            const card1 = document.createElement('div');
            card1.classList.add('card1');
            const box1 = document.createElement('div');
            const box2 = document.createElement('div');
            box1.classList.add('box1');
            box2.classList.add('box2');
            box2.setAttribute('data-comment-id',`${comment.comment_id}`);

            if(comment.comment_by == comment.login_user){
              box2.classList.add('elipsis');
            }
            else{
              box2.classList.add('elipsis-X');
            }

            const ellipsis = document.createElement('i');
            ellipsis.classList.add('fa-solid');
            ellipsis.classList.add('fa-ellipsis');

            const initials = document.createElement('div');
            initials.classList.add('icon');
            initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
            const user_box = document.createElement('div');
            user_box.classList.add('user-box');
            const user_name = document.createElement('div');
            user_name.classList.add('name');
            user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
            const time = document.createElement('time');
            time.classList.add('time');

            const dateString = `${comment.date}`;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true
            });
            time.innerHTML = `${formattedDate}`;
            //append
            box2.appendChild(ellipsis);
            user_box.appendChild(user_name);
            user_box.appendChild(time);
            box1.appendChild(initials);
            box1.appendChild(user_box);
            card1.appendChild(box1);
            card1.appendChild(box2);



            const card2 = document.createElement('div');
            card2.classList.add('card2');
            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent= `${comment.text}`;
            card2.appendChild(text);


            const card3 = document.createElement('div');
            card3.classList.add('delete-card');
            const icon = document.createElement('div');
            icon.classList.add('icon');
            card3.setAttribute('id',`icon${comment.comment_id}`);
            card3.setAttribute('data-delete-id',`${comment.comment_id}`);
            const fa_trash = document.createElement('i');
            fa_trash.classList.add('fa-solid');
            fa_trash.classList.add('fa-trash');
            const del_text = document.createElement('div');
            del_text.classList.add('text');

            if(comment.comment_by == comment.login_user){
              del_text.innerHTML = 'Delete';
            }
            else{
              del_text.innerHTML = "can't delete"
            }

            //append
            icon.appendChild(fa_trash);
            card3.appendChild(icon);
            card3.appendChild(del_text);

            //append event to delete icon




            //end append





            comment_card.appendChild(card1);
            comment_card.appendChild(card2);
            comment_card.appendChild(card3);
            comment_card.classList.add('comment-card');

            container.appendChild(comment_card);
          });

          const deleteBtns = document.querySelectorAll('.elipsis');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });


                //add event to delete btn
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                parent_card.addEventListener('click',()=>{
                  fetch(`/delete-comment/${commentId}/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                    },
                  })
                    .then(response => {
                      if (response.ok) {
                        // Remove the comment element from the DOM
                        //const commentEl = btn.closest('.comment');

                        //commentEl.remove();
                        btn.closest('.comment-card').remove();
                        document.getElementById('m-comment-modal').style.display = 'none';

                      } else {
                        throw new Error('Failed to delete comment.');
                      }
                    })
                    .catch(error => console.error(error));
                });

              }




            });
          });
          const deleteBtns_X = document.querySelectorAll('.elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-comment-modal').style.display = 'block';
                document.getElementById('m-comment-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-comment-modal').style.display = 'none';
                });
              }
          });

        });


    });
  });
});



document.getElementById('clip-board-m').addEventListener('click',()=>{
  const textToCopy = document.getElementById('copy-text-m').innerHTML;

  navigator.clipboard.writeText(textToCopy)
  .then(() => {
      console.log("Text copied to clipboard successfully");
      document.getElementById('copied-m').style.display = 'block';
      setTimeout(function() {
          document.getElementById('copied-m').style.display = 'none';
      }, 1000);
  })
  .catch((error) => {
      console.error("Error copying text to clipboard: ", error);
  });
});


*/



/*
document.querySelectorAll('.event-container').forEach(eventForm => {
  eventForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior
    const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open('POST', '/create-event/'); // Set up the request
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.onload = function() {
      if (xhr.status === 200) {
          console.log('success')
          setTimeout(function() {
            location.reload();
        }, 500);
      } else {
        console.error(`Server returned status ${xhr.status}`);
      }
    };
    xhr.onerror = function() {
      console.error('Request failed');
    };
    console.log(eventForm.host_image.files[0]['name']);
    //var data = encodeURI('email=' + form.email.value + '&name=' + form.name.value + '&message=' + form.message.value);
    var data = encodeURI('celebration_type=' + eventForm.celebration_type.value  + '&description=' + eventForm.description.value  + '&date=' + eventForm.date.value + '&location=' + eventForm.location.value + '&streaming_link=' + eventForm.streaming_link.value + '&user=' + eventForm.user.value + '&deceased=' + eventForm.deceased.value + '&host_image=' + eventForm.host_image.files[0]['name']);
    xhr.send(data); // Send the request with the comment content in the request body
  });
}); */

/*const eventForm = document.querySelector('#event-container');
eventForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', '/create-event/'); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('success')
        setTimeout(function() {
          location.reload();
      }, 500);
    } else {
      console.error(`Server returned status ${xhr.status}`);
    }
  };
  xhr.onerror = function() {
    console.error('Request failed');
  };
  console.log(eventForm);
  //var data = encodeURI('email=' + form.email.value + '&name=' + form.name.value + '&message=' + form.message.value);
  var data = encodeURI('celebration_type=' + eventForm.celebration_type.value  + '&description=' + eventForm.description.value  + '&date=' + eventForm.date.value + '&location=' + eventForm.location.value + '&streaming_link=' + eventForm.streaming_link.value + '&user=' + eventForm.user.value + '&deceased=' + eventForm.deceased.value);
  xhr.send(data); // Send the request with the comment content in the request body
});
 */






document.querySelectorAll('.event-header').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    button.nextElementSibling.classList.toggle('show');

    if(button.querySelector('.chevron').firstElementChild.classList.contains('fa-chevron-up')){
      button.querySelector('.chevron').firstElementChild.classList.replace('fa-chevron-up','fa-chevron-down');
    }
    else{
      button.querySelector('.chevron').firstElementChild.classList.replace('fa-chevron-down','fa-chevron-up');
    }

  });
});





document.querySelectorAll('.event-container').forEach(eventForm => {
  eventForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(eventForm);

    // Create a new AJAX request object
    const xhr = new XMLHttpRequest();

    // Attach an event listener for the AJAX response

    xhr.addEventListener('load', () => {
      // Handle the AJAX response
      if (xhr.status === 200) {
        // Show a success notification
        setTimeout(function() {
          location.reload();
        }, 500);
      } else {
        // Show an error notification
         console.log('error');
      }
    });

    // Open the AJAX request
    xhr.open('POST', '/create-event/');
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    xhr.setRequestHeader('X-CSRFToken', csrftoken);

    // Send the form data with the AJAX request
    xhr.send(formData);
  });
});





const deleteEvent = document.querySelectorAll('.delete-event');
//let delete_box = document.getElementById(`icon${comment.comment_id}`);
deleteEvent.forEach(btn => {
  //console.log('hhr',btn);
 btn.addEventListener('click', () => {
    const eventId = btn.getAttribute('data-event-id');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    console.log(btn.closest('.event-list'));
    fetch(`/delete-event/${eventId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the comment element from the DOM
          //const commentEl = btn.closest('.comment');
          setTimeout(function() {
            btn.closest('.event-list').remove();
            location.reload();
          }, 500);

        } else {
          throw new Error('Failed to delete comment.');
        }
      })
      .catch(error => console.error(error));
  });

});







function close_search(){
  document.getElementById('index-form').style.display = 'none';
}

function open_search(){
  document.getElementById('index-form').style.display = 'block';
}




//mobile tribute form...
const m_tributeForm = document.querySelector('#m-tribute-container');
m_tributeForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  let deceasedId = m_tributeForm.querySelector('#m-deceased-id').value;



  var currentSlide = mySwiper.activeIndex + 1;
  var totalSlides = mySwiper.slides.length;
  var element_index = mySwiper.slides[mySwiper.activeIndex];




  //const photoId = document.querySelector('input[name="photo_id"]').value; // Get the photo ID from a hidden input field
  const commentContent = document.querySelector('textarea[name="tribute-deceased"]').value; // Get the comment content from the textarea
  const parent_reply_id = document.querySelector('input[name="tribute_parent_reply_id"]').value;
  const comment_id = document.querySelector('input[name="tribute_comment_id"]').value;
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', `/add-tribute/${deceasedId}/`); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
// const container = m_tributeForm.querySelector('.m-comment-box');

  xhr.onload = function() {
    if (xhr.status === 200) {

      setTimeout(function() {
        document.querySelector('textarea[name="tribute-deceased"]').value = '';
        document.querySelector('input[name="tribute_comment_id"]').value = '';
        document.querySelector('input[name="tribute_parent_reply_id"]').value = '';
        document.getElementById('reply-top-container-tribute').classList.remove('show');
        const url = `/tribute/${deceasedId}/list/`;
        fetch(url)
        .then(response => response.json())
        .then(comments_data => {

          const container = m_tributeForm.querySelector('.m-comment-box');
          container.innerHTML = '';
          console.log('nn',comments_data)
          comments_data.forEach(comment => {
             element_index.querySelector('.num-tributes').textContent = comment.tribute_count;

            //console.log('reply#',comment.replies.first_name);
            const comment_card = document.createElement('div');
            const card1 = document.createElement('div');

            const card4 = document.createElement('div');// reply div


            card1.classList.add('card1');
            card4.classList.add('card4');

            const box1 = document.createElement('div');
            const box2 = document.createElement('div');
            box1.classList.add('box1');
            box2.classList.add('box2');
            box2.setAttribute('data-comment-id',`${comment.comment_id}`);

            if(comment.comment_by == comment.login_user){
              box2.classList.add('elipsis');
            }
            else{
              box2.classList.add('elipsis-X');
            }

            const ellipsis = document.createElement('i');
            ellipsis.classList.add('fa-solid');
            ellipsis.classList.add('fa-ellipsis');

            const initials = document.createElement('img');
            initials.src = `${comment.image}`;
            initials.classList.add('icon');
            //initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
            const user_box = document.createElement('div');
            user_box.classList.add('user-box');
            const user_name = document.createElement('div');
            user_name.classList.add('name');
            user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
            const time = document.createElement('time');
            time.classList.add('time');

           /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */
            time.innerHTML = `${comment.date}`;
            //append
            box2.appendChild(ellipsis);
            user_box.appendChild(user_name);
            user_box.appendChild(time);
            box1.appendChild(initials);
            box1.appendChild(user_box);
            card1.appendChild(box1);
            card1.appendChild(box2);



            const card2 = document.createElement('div');
            card2.classList.add('card2');
            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent= `${comment.text}`;
            card2.appendChild(text);


            const card3 = document.createElement('div');
            card3.classList.add('delete-card');
            const icon = document.createElement('div');
            icon.classList.add('icon');
            card3.setAttribute('id',`icon${comment.comment_id}`);
            card3.setAttribute('data-delete-id',`${comment.comment_id}`);
            const fa_trash = document.createElement('i');
            fa_trash.classList.add('fa-solid');
            fa_trash.classList.add('fa-trash');
            const del_text = document.createElement('div');
            del_text.classList.add('text');


            const card4_box1 = document.createElement('div');
            const card4_box2 = document.createElement('div');
            card4_box1.classList.add('card4-box1');
            card4_box2.classList.add('card4-box2');
            //card4_box2.setAttribute('onclick',`HeartComment(event)`);
            card4_box1.setAttribute('data-comment-id',`${comment.comment_id}`);
            const card4_text1 = document.createElement('span');
           // card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id},${comment.first_name},${comment.last_name})`);
            card4_text1.setAttribute('onclick', `setTributeData(${comment.comment_id}, "${comment.first_name}", "${comment.last_name}")`);
            const card4_text2 = document.createElement('span');
            const card4_text5 = document.createElement('span');
            card4_text5.classList.add('card4-text5');
            card4_text2.setAttribute('onclick',`LikeTribute(event)`);
            card4_text2.setAttribute('data-comment-id',`${comment.comment_id}`);
            if (comment.liked){
              card4_text2.style.color = 'blue';
            }
            else{
              card4_text2.style.color = 'black';
            }
            card4_text5.textContent = comment.count_likes;
            card4_text1.textContent = 'Reply';
            card4_text2.textContent = 'Like';
            card4_text1.classList.add('card4-text1');
            card4_text2.classList.add('card4-text2');

            const card4_text3 = document.createElement('i');
            const card4_text4 = document.createElement('span');

            if(comment.heart){
              card4_text3.style.color = 'red';
              card4_text3.classList.add('fa-solid');
              card4_text3.classList.add('fa-heart');
            }
            else{
              card4_text3.style.color = 'black';
              card4_text3.classList.add('fa-regular');
              card4_text3.classList.add('fa-heart');
            }

            card4_text3.setAttribute('onclick',`HeartTribute(event)`);
            card4_text3.setAttribute('data-comment-id',`${comment.comment_id}`);

            card4_text4.classList.add('card4-text4');
            card4_text4.textContent = comment.count_heart;
            card4_box1.appendChild(card4_text1);
            card4_box1.appendChild(card4_text2);
            card4_box1.appendChild(card4_text5);

            card4_box2.appendChild(card4_text3);
            card4_box2.appendChild(card4_text4);




            if(comment.comment_by == comment.login_user){
              del_text.innerHTML = 'Delete';
            }
            else{
              del_text.innerHTML = "can't delete"
            }

            //append
            icon.appendChild(fa_trash);
            card3.appendChild(icon);
            card3.appendChild(del_text);

            card4.appendChild(card4_box1);
            card4.appendChild(card4_box2);

            //append event to delete icon




            //end append





            comment_card.appendChild(card1);
            comment_card.appendChild(card2);
            comment_card.appendChild(card3);
            comment_card.appendChild(card4);
            //comment_card.appendChild(card5);
            const card5 = document.createElement('div');
              card5.classList.add('card5');
              const card5_box1 = document.createElement('div');
              card5_box1.setAttribute('onclick','showReply(event)');
            card5_box1.classList.add('card5-box1');
            card5_box1.textContent = `---  View replies(${comment.replies.length})`;
            card5.appendChild(card5_box1);

            comment.replies.forEach(reply=>{
              /* const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }); */


            //replycard
            const reply_card = document.createElement('div');
            reply_card.classList.add('reply-card');
            card5.appendChild(reply_card);

            //create element in reply card
            const reply_card1 = document.createElement('div');
            const reply_card2 = document.createElement('div');
            const reply_delete_card = document.createElement('div');
            const reply_card4 = document.createElement('div');

            //add classlist in reply card
            reply_card1.classList.add('reply-card1');
            reply_card2.classList.add('reply-card2');
            reply_delete_card.classList.add('reply-delete-card');

            reply_card4.classList.add('reply-card4');
            const reply_card4_box1 = document.createElement('div');
            const reply_card4_box2 = document.createElement('div');
            reply_card4_box1.classList.add('reply-card4-box1');
            reply_card4_box2.classList.add('reply-card4-box2');
            const reply_card4_text1 = document.createElement('span');
            const reply_card4_text2 = document.createElement('span');
            const reply_card4_text5 = document.createElement('span');

            reply_card4_text2.setAttribute('onclick',`LikeTributeReply(event)`);
            reply_card4_text2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const reply_card4_text3 = document.createElement('i');
            const reply_card4_text4 = document.createElement('span');

            //add class
            if(reply.heart){
              reply_card4_text3.classList.add('fa-solid');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'red';
            }
            else{
              reply_card4_text3.classList.add('fa-regular');
              reply_card4_text3.classList.add('fa-heart');
              reply_card4_text3.style.color = 'black';
            }

            reply_card4_text3.setAttribute('onclick',`HeartTributeReply(event)`);
            reply_card4_text3.setAttribute('data-reply-id',`${reply.reply_id}`);
            reply_card4_text4.classList.add('card4-text4');
            reply_card4_text1.classList.add('reply-card4-text1');
            reply_card4_text2.classList.add('reply-card4-text2');
            reply_card4_text5.classList.add('reply-card4-text5');
            reply_card4_text5.textContent = reply.count_likes;
            reply_card4_text4.textContent = reply.count_heart;
            //reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id})`);
            reply_card4_text1.setAttribute('onclick', `setTributeReplyData(${comment.comment_id},${reply.reply_id},"${reply.first_name}","${reply.last_name}")`);
            reply_card4_text1.textContent = 'Reply';
            if(reply.liked){
              reply_card4_text2.style.color = 'blue';

            }
            else{
              reply_card4_text2.style.color = 'black';
            }
            reply_card4_text2.textContent = 'Like';//LikeReply(event)

            reply_card4_box1.appendChild(reply_card4_text1);
            reply_card4_box1.appendChild(reply_card4_text2);
            reply_card4_box1.appendChild(reply_card4_text5);
            reply_card4_box2.appendChild(reply_card4_text3);
            reply_card4_box2.appendChild(reply_card4_text4);
            reply_card4.appendChild(reply_card4_box1);
            reply_card4.appendChild(reply_card4_box2);






            //create element to reply card1
            const reply_box1 = document.createElement('div')
            const reply_icon = document.createElement('img');
            const reply_user_box = document.createElement('div');
            const reply_name = document.createElement('div');
            reply_name.textContent = `${reply.first_name} ${reply.last_name}`;
            const reply_time = document.createElement('div');
            reply_time.textContent = `${reply.date}`;
            reply_name.classList.add('reply-name');
            reply_time.classList.add('reply-time');
            reply_user_box.appendChild(reply_name);
            reply_user_box.appendChild(reply_time);
            reply_icon.classList.add('reply-user');
            reply_icon.src = `${comment.image}`;
            //reply_icon.textContent = `${reply.first_name[0]} ${reply.last_name[0]}`;
            reply_user_box.classList.add('reply-user-box');
            reply_box1.appendChild(reply_icon);
            reply_box1.appendChild(reply_user_box);


            const reply_box2 = document.createElement('div')
            reply_box1.classList.add('reply-box1');
            reply_box2.classList.add('reply-box2');

            if(reply.reply_by == reply.login_user){
              reply_box2.classList.add('reply-elipsis');
            }
            else{
              reply_box2.classList.add('reply-elipsis-X');
            }
            reply_box2.setAttribute('data-reply-id',`${reply.reply_id}`);
            const elipsisX = document.createElement('i');
            elipsisX.classList.add('fa-solid');
            elipsisX.classList.add('fa-ellipsis');
            reply_box2.appendChild(elipsisX);
            reply_card1.appendChild(reply_box1);
            reply_card1.appendChild(reply_box2);

            //create element to reply card2  reply_delete_card
            const reply_card2_text = document.createElement('div');
            reply_card2_text.classList.add('text');
            reply_card2_text.textContent = `${reply.text}`;
            reply_card2.appendChild(reply_card2_text);

            //create element to  reply_delete_card
            const reply_delete_icon = document.createElement('div');
            reply_delete_icon.classList.add('icon');
            const reply_delete_text = document.createElement('div');
            reply_delete_text.classList.add('text');

            if(reply.reply_by == reply.login_user){
              reply_delete_text.textContent = "delete";
            }
            else{
              reply_delete_text.textContent = "can't delete";
            }

            const reply_trash = document.createElement('i');
            reply_trash.classList.add('fa-solid');
            reply_trash.classList.add('fa-trash');
            reply_delete_icon.appendChild(reply_trash);
            reply_delete_card.appendChild(reply_delete_icon);
            reply_delete_card.appendChild(reply_delete_text);

            //append card1,2,3,4 to reply card
            reply_card.appendChild(reply_card1);
            reply_card.appendChild(reply_card2);
            reply_card.appendChild(reply_delete_card);
            //reply_card4.appendChild(card4_box1);
            //reply_card4.appendChild(card4_box2);
            reply_card.appendChild(reply_card4);
            comment_card.appendChild(card5);
            });

            comment_card.classList.add('comment-card');

            container.appendChild(comment_card);

            });

           //end

          const deleteBtns = document.querySelectorAll('.elipsis');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-tribute-modal').style.display = 'block';
                document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-tribute-modal').style.display = 'none';
                });


                //add event to delete btn
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                parent_card.addEventListener('click',()=>{
                  fetch(`/delete-tribute/${commentId}/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                    },
                  })
                    .then(response => {
                      if (response.ok) {
                        // Remove the comment element from the DOM
                        //const commentEl = btn.closest('.comment');

                        //commentEl.remove();
                        btn.closest('.comment-card').remove();
                        document.getElementById('m-tribute-modal').style.display = 'none';

                      } else {
                        throw new Error('Failed to delete comment.');
                      }
                    })
                    .catch(error => console.error(error));
                });

              }




            });
          });
          const deleteBtns_X = document.querySelectorAll('.elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-tribute-modal').style.display = 'block';
                document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-tribute-modal').style.display = 'none';
                });
              }
          });

        });

        //delete reply btn
        const deleteReply = document.querySelectorAll('.reply-elipsis');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteReply.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {

            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){

              document.getElementById('m-tribute-modal').style.display = 'block';
              document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-tribute-modal').style.display = 'none';
              });


              //add event to delete btn
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              parent_card.addEventListener('click',()=>{

                fetch(`/delete-tribute-reply/${replyId}/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      // Remove the comment element from the DOM
                      //const commentEl = btn.closest('.comment');

                      //commentEl.remove();
                      btn.closest('.reply-card').remove();
                      document.getElementById('m-tribute-modal').style.display = 'none';

                    } else {
                      throw new Error('Failed to delete comment.');
                    }
                  })
                  .catch(error => console.error(error));
              });

            }




          });
        });

        const deleteReply_X = document.querySelectorAll('.reply-elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteReply_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
            const replyId = btn.getAttribute('data-reply-id');
            let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('m-tribute-modal').style.display = 'block';
                document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('m-tribute-modal').style.display = 'none';
                });
              }
          });

        });



        });


      }, 1000);


      // Request was successful
      // Update the page with the new comment
      //const commentList = document.querySelector(`#photo-${photoId} .comment-list`);
      //const newComment = document.createElement('li');
      //newComment.textContent = commentContent;
      //commentList.appendChild(newComment);

    }
    else if(xhr.status === 500){
      window.location.href = '/Auth-memorial/';
    }
    else {
      // Request failed
      console.error(`Server returned status ${xhr.status}`);
    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };

  //xhr.send(`comment_content=${encodeURIComponent(commentContent)}`); // Send the request with the comment content in the request body

  var data = encodeURI('comment_content=' + commentContent + '&comment_id=' +  comment_id + '&parent_reply_id=' + parent_reply_id);
  xhr.send(data);



});



document.querySelectorAll('.fetch-tribute').forEach(button => {
  button.addEventListener('click', event => {
    var element  =  document.getElementById('m-tribute-container');
    element.classList.add('show');
    console.log('333',button);


   // const container = document.querySelector('.m-tribute-box');
    var tribute_head = element.querySelector('.header').querySelector('.text');
    tribute_head.textContent = `Add a tribute in memory of ${button.querySelector('input').value}`;
    const deceasedId = button.getAttribute('data-deceased-id');
    element.querySelector('#m-deceased-id').value = deceasedId;
     element.querySelector('textarea').placeholder = `Add a tribute in memory of ${button.querySelector('input').value}`;

    const url = `/tribute/${deceasedId}/list/`;
    fetch(url)
      .then(response => response.json())
      .then(comments_data => {

        const container = document.querySelector('.m-tribute-box');
        container.innerHTML = '';
        console.log('nn',comments_data)
        comments_data.forEach(comment => {
          //console.log('reply#',comment.replies.first_name);
          const comment_card = document.createElement('div');
          const card1 = document.createElement('div');

          const card4 = document.createElement('div');// reply div


          card1.classList.add('card1');
          card4.classList.add('card4');

          const box1 = document.createElement('div');
          const box2 = document.createElement('div');
          box1.classList.add('box1');
          box2.classList.add('box2');
          box2.setAttribute('data-comment-id',`${comment.comment_id}`);

          if(comment.comment_by == comment.login_user){
            box2.classList.add('elipsis');
          }
          else{
            box2.classList.add('elipsis-X');
          }

          const ellipsis = document.createElement('i');
          ellipsis.classList.add('fa-solid');
          ellipsis.classList.add('fa-ellipsis');

          const initials = document.createElement('img');
          initials.src = `${comment.image}`;
          initials.classList.add('icon');
          //initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
          const user_box = document.createElement('div');
          user_box.classList.add('user-box');
          const user_name = document.createElement('div');
          user_name.classList.add('name');
          user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
          const time = document.createElement('time');
          time.classList.add('time');

         /* const dateString = `${comment.date}`;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true
            }); */
          time.innerHTML = `${comment.date}`;
          //append
          box2.appendChild(ellipsis);
          user_box.appendChild(user_name);
          user_box.appendChild(time);
          box1.appendChild(initials);
          box1.appendChild(user_box);
          card1.appendChild(box1);
          card1.appendChild(box2);



          const card2 = document.createElement('div');
          card2.classList.add('card2');
          const text = document.createElement('div');
          text.classList.add('text');
          text.textContent= `${comment.text}`;
          card2.appendChild(text);


          const card3 = document.createElement('div');
          card3.classList.add('delete-card');
          const icon = document.createElement('div');
          icon.classList.add('icon');
          card3.setAttribute('id',`icon${comment.comment_id}`);
          card3.setAttribute('data-delete-id',`${comment.comment_id}`);
          const fa_trash = document.createElement('i');
          fa_trash.classList.add('fa-solid');
          fa_trash.classList.add('fa-trash');
          const del_text = document.createElement('div');
          del_text.classList.add('text');


          const card4_box1 = document.createElement('div');
          const card4_box2 = document.createElement('div');
          card4_box1.classList.add('card4-box1');
          card4_box2.classList.add('card4-box2');
          //card4_box2.setAttribute('onclick',`HeartComment(event)`);
          card4_box1.setAttribute('data-comment-id',`${comment.comment_id}`);
          const card4_text1 = document.createElement('span');
         // card4_text1.setAttribute('onclick', `setCommentData(${comment.comment_id},${comment.first_name},${comment.last_name})`);
          card4_text1.setAttribute('onclick', `setTributeData(${comment.comment_id}, "${comment.first_name}", "${comment.last_name}")`);
          const card4_text2 = document.createElement('span');
          const card4_text5 = document.createElement('span');
          card4_text5.classList.add('card4-text5');
          card4_text2.setAttribute('onclick',`LikeTribute(event)`);
          card4_text2.setAttribute('data-comment-id',`${comment.comment_id}`);
          if (comment.liked){
            card4_text2.style.color = 'blue';
          }
          else{
            card4_text2.style.color = 'black';
          }
          card4_text5.textContent = comment.count_likes;
          card4_text1.textContent = 'Reply';
          card4_text2.textContent = 'Like';
          card4_text1.classList.add('card4-text1');
          card4_text2.classList.add('card4-text2');

          const card4_text3 = document.createElement('i');
          const card4_text4 = document.createElement('span');

          if(comment.heart){
            card4_text3.style.color = 'red';
            card4_text3.classList.add('fa-solid');
            card4_text3.classList.add('fa-heart');
          }
          else{
            card4_text3.style.color = 'black';
            card4_text3.classList.add('fa-regular');
            card4_text3.classList.add('fa-heart');
          }

          card4_text3.setAttribute('onclick',`HeartTribute(event)`);
          card4_text3.setAttribute('data-comment-id',`${comment.comment_id}`);

          card4_text4.classList.add('card4-text4');
          card4_text4.textContent = comment.count_heart;
          card4_box1.appendChild(card4_text1);
          card4_box1.appendChild(card4_text2);
          card4_box1.appendChild(card4_text5);

          card4_box2.appendChild(card4_text3);
          card4_box2.appendChild(card4_text4);




          if(comment.comment_by == comment.login_user){
            del_text.innerHTML = 'Delete';
          }
          else{
            del_text.innerHTML = "can't delete"
          }

          //append
          icon.appendChild(fa_trash);
          card3.appendChild(icon);
          card3.appendChild(del_text);

          card4.appendChild(card4_box1);
          card4.appendChild(card4_box2);

          //append event to delete icon




          //end append





          comment_card.appendChild(card1);
          comment_card.appendChild(card2);
          comment_card.appendChild(card3);
          comment_card.appendChild(card4);
          //comment_card.appendChild(card5);
          const card5 = document.createElement('div');
            card5.classList.add('card5');
            const card5_box1 = document.createElement('div');
            card5_box1.setAttribute('onclick','showReply(event)');
          card5_box1.classList.add('card5-box1');
          card5_box1.textContent = `---  View replies(${comment.replies.length})`;
          card5.appendChild(card5_box1);

          comment.replies.forEach(reply=>{
            /* const dateString = `${comment.date}`;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true
            }); */


          //replycard
          const reply_card = document.createElement('div');
          reply_card.classList.add('reply-card');
          card5.appendChild(reply_card);

          //create element in reply card
          const reply_card1 = document.createElement('div');
          const reply_card2 = document.createElement('div');
          const reply_delete_card = document.createElement('div');
          const reply_card4 = document.createElement('div');

          //add classlist in reply card
          reply_card1.classList.add('reply-card1');
          reply_card2.classList.add('reply-card2');
          reply_delete_card.classList.add('reply-delete-card');

          reply_card4.classList.add('reply-card4');
          const reply_card4_box1 = document.createElement('div');
          const reply_card4_box2 = document.createElement('div');
          reply_card4_box1.classList.add('reply-card4-box1');
          reply_card4_box2.classList.add('reply-card4-box2');
          const reply_card4_text1 = document.createElement('span');
          const reply_card4_text2 = document.createElement('span');
          const reply_card4_text5 = document.createElement('span');

          reply_card4_text2.setAttribute('onclick',`LikeTributeReply(event)`);
          reply_card4_text2.setAttribute('data-reply-id',`${reply.reply_id}`);
          const reply_card4_text3 = document.createElement('i');
          const reply_card4_text4 = document.createElement('span');

          //add class
          if(reply.heart){
            reply_card4_text3.classList.add('fa-solid');
            reply_card4_text3.classList.add('fa-heart');
            reply_card4_text3.style.color = 'red';
          }
          else{
            reply_card4_text3.classList.add('fa-regular');
            reply_card4_text3.classList.add('fa-heart');
            reply_card4_text3.style.color = 'black';
          }

          reply_card4_text3.setAttribute('onclick',`HeartTributeReply(event)`);
          reply_card4_text3.setAttribute('data-reply-id',`${reply.reply_id}`);
          reply_card4_text4.classList.add('card4-text4');
          reply_card4_text1.classList.add('reply-card4-text1');
          reply_card4_text2.classList.add('reply-card4-text2');
          reply_card4_text5.classList.add('reply-card4-text5');
          reply_card4_text5.textContent = reply.count_likes;
          reply_card4_text4.textContent = reply.count_heart;
          //reply_card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id},${reply.reply_id})`);
          reply_card4_text1.setAttribute('onclick', `setTributeReplyData(${comment.comment_id},${reply.reply_id},"${reply.first_name}","${reply.last_name}")`);
          reply_card4_text1.textContent = 'Reply';
          if(reply.liked){
            reply_card4_text2.style.color = 'blue';

          }
          else{
            reply_card4_text2.style.color = 'black';
          }
          reply_card4_text2.textContent = 'Like';//LikeReply(event)

          reply_card4_box1.appendChild(reply_card4_text1);
          reply_card4_box1.appendChild(reply_card4_text2);
          reply_card4_box1.appendChild(reply_card4_text5);
          reply_card4_box2.appendChild(reply_card4_text3);
          reply_card4_box2.appendChild(reply_card4_text4);
          reply_card4.appendChild(reply_card4_box1);
          reply_card4.appendChild(reply_card4_box2);






          //create element to reply card1
          const reply_box1 = document.createElement('div')
          const reply_icon = document.createElement('img');
          const reply_user_box = document.createElement('div');
          const reply_name = document.createElement('div');
          reply_name.textContent = `${reply.first_name} ${reply.last_name}`;
          const reply_time = document.createElement('div');
          reply_time.textContent = `${reply.date}`;
          reply_name.classList.add('reply-name');
          reply_time.classList.add('reply-time');
          reply_user_box.appendChild(reply_name);
          reply_user_box.appendChild(reply_time);
          reply_icon.classList.add('reply-user');
          reply_icon.src = `${comment.image}`;
          //reply_icon.textContent = `${reply.first_name[0]} ${reply.last_name[0]}`;
          reply_user_box.classList.add('reply-user-box');
          reply_box1.appendChild(reply_icon);
          reply_box1.appendChild(reply_user_box);


          const reply_box2 = document.createElement('div')
          reply_box1.classList.add('reply-box1');
          reply_box2.classList.add('reply-box2');

          if(reply.reply_by == reply.login_user){
            reply_box2.classList.add('reply-elipsis');
          }
          else{
            reply_box2.classList.add('reply-elipsis-X');
          }
          reply_box2.setAttribute('data-reply-id',`${reply.reply_id}`);
          const elipsisX = document.createElement('i');
          elipsisX.classList.add('fa-solid');
          elipsisX.classList.add('fa-ellipsis');
          reply_box2.appendChild(elipsisX);
          reply_card1.appendChild(reply_box1);
          reply_card1.appendChild(reply_box2);

          //create element to reply card2  reply_delete_card
          const reply_card2_text = document.createElement('div');
          reply_card2_text.classList.add('text');
          reply_card2_text.textContent = `${reply.text}`;
          reply_card2.appendChild(reply_card2_text);

          //create element to  reply_delete_card
          const reply_delete_icon = document.createElement('div');
          reply_delete_icon.classList.add('icon');
          const reply_delete_text = document.createElement('div');
          reply_delete_text.classList.add('text');

          if(reply.reply_by == reply.login_user){
            reply_delete_text.textContent = "delete";
          }
          else{
            reply_delete_text.textContent = "can't delete";
          }

          const reply_trash = document.createElement('i');
          reply_trash.classList.add('fa-solid');
          reply_trash.classList.add('fa-trash');
          reply_delete_icon.appendChild(reply_trash);
          reply_delete_card.appendChild(reply_delete_icon);
          reply_delete_card.appendChild(reply_delete_text);

          //append card1,2,3,4 to reply card
          reply_card.appendChild(reply_card1);
          reply_card.appendChild(reply_card2);
          reply_card.appendChild(reply_delete_card);
          //reply_card4.appendChild(card4_box1);
          //reply_card4.appendChild(card4_box2);
          reply_card.appendChild(reply_card4);
          comment_card.appendChild(card5);
          });

          comment_card.classList.add('comment-card');

          container.appendChild(comment_card);

          });

         //end

        const deleteBtns = document.querySelectorAll('.elipsis');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteBtns.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {
            const commentId = btn.getAttribute('data-comment-id');
            let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){
              document.getElementById('m-tribute-modal').style.display = 'block';
              document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-tribute-modal').style.display = 'none';
              });


              //add event to delete btn
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              parent_card.addEventListener('click',()=>{
                fetch(`/delete-tribute/${commentId}/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      // Remove the comment element from the DOM
                      //const commentEl = btn.closest('.comment');

                      //commentEl.remove();
                      btn.closest('.comment-card').remove();
                      document.getElementById('m-tribute-modal').style.display = 'none';

                    } else {
                      throw new Error('Failed to delete comment.');
                    }
                  })
                  .catch(error => console.error(error));
              });

            }




          });
        });
        const deleteBtns_X = document.querySelectorAll('.elipsis-X');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteBtns_X.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {
            const commentId = btn.getAttribute('data-comment-id');
            let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){
              document.getElementById('m-tribute-modal').style.display = 'block';
              document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-tribute-modal').style.display = 'none';
              });
            }
        });

      });

      //delete reply btn
      const deleteReply = document.querySelectorAll('.reply-elipsis');
      //let delete_box = document.getElementById(`icon${comment.comment_id}`);
      deleteReply.forEach(btn => {
        //console.log('hhr',btn);
      btn.addEventListener('click', () => {

          const replyId = btn.getAttribute('data-reply-id');
          let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

        parent_card.style.display = 'flex';
          if(parent_card.style.display == 'flex'){

            document.getElementById('m-tribute-modal').style.display = 'block';
            document.getElementById('m-tribute-modal').addEventListener('click',()=>{
              parent_card.style.display='none';
              document.getElementById('m-tribute-modal').style.display = 'none';
            });


            //add event to delete btn
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            parent_card.addEventListener('click',()=>{

              fetch(`/delete-tribute-reply/${replyId}/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken,
                },
              })
                .then(response => {
                  if (response.ok) {
                    // Remove the comment element from the DOM
                    //const commentEl = btn.closest('.comment');

                    //commentEl.remove();
                    btn.closest('.reply-card').remove();
                    document.getElementById('m-tribute-modal').style.display = 'none';

                  } else {
                    throw new Error('Failed to delete comment.');
                  }
                })
                .catch(error => console.error(error));
            });

          }




        });
      });

      const deleteReply_X = document.querySelectorAll('.reply-elipsis-X');
        //let delete_box = document.getElementById(`icon${comment.comment_id}`);
        deleteReply_X.forEach(btn => {
          //console.log('hhr',btn);
        btn.addEventListener('click', () => {
          const replyId = btn.getAttribute('data-reply-id');
          let parent_card = btn.closest('.reply-card').querySelector('.reply-delete-card');

          parent_card.style.display = 'flex';
            if(parent_card.style.display == 'flex'){
              document.getElementById('m-tribute-modal').style.display = 'block';
              document.getElementById('m-tribute-modal').addEventListener('click',()=>{
                parent_card.style.display='none';
                document.getElementById('m-tribute-modal').style.display = 'none';
              });
            }
        });

      });



    });


  });
});



//larger screen tribute

const tributeForm = document.querySelector('#tribute-container');
tributeForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  let deceasedId = tributeForm.querySelector('#L-deceased-id').value;




  //const photoId = document.querySelector('input[name="photo_id"]').value; // Get the photo ID from a hidden input field
  const commentContent = document.querySelector('textarea[name="L-tribute-deceased"]').value; // Get the comment content from the textarea
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', `/add-tribute/${deceasedId}/`); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);


  xhr.onload = function() {
    if (xhr.status === 200) {
      setTimeout(function() {

        document.querySelector('textarea[name="L-tribute-deceased"]').value = '';
        const url = `/tribute/${deceasedId}/list/`;
        fetch(url)
        .then(response => response.json())
        .then(comments_data => {

            const container = tributeForm.querySelector('.tribute-box');
            container.innerHTML = '';
            comments_data.forEach(comment => {

              const comment_card = document.createElement('div');
              const card1 = document.createElement('div');
              card1.classList.add('card1');
              const box1 = document.createElement('div');
              const box2 = document.createElement('div');
              box1.classList.add('box1');
              box2.classList.add('box2');
              box2.setAttribute('data-comment-id',`${comment.comment_id}`);

              if(comment.comment_by == comment.login_user){
                box2.classList.add('elipsis');
              }
              else{
                box2.classList.add('elipsis-X');
              }

              const ellipsis = document.createElement('i');
              ellipsis.classList.add('fa-solid');
              ellipsis.classList.add('fa-ellipsis');

              const initials = document.createElement('div');
              initials.classList.add('icon');
              initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
              const user_box = document.createElement('div');
              user_box.classList.add('user-box');
              const user_name = document.createElement('div');
              user_name.classList.add('name');
              user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
              const time = document.createElement('time');
              time.classList.add('time');

              const dateString = `${comment.date}`;
              const dateObject = new Date(dateString);
              const formattedDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              });
              time.innerHTML = `${formattedDate}`;
              //append
              box2.appendChild(ellipsis);
              user_box.appendChild(user_name);
              user_box.appendChild(time);
              box1.appendChild(initials);
              box1.appendChild(user_box);
              card1.appendChild(box1);
              card1.appendChild(box2);



              const card2 = document.createElement('div');
              card2.classList.add('card2');
              const text = document.createElement('div');
              text.classList.add('text');
              text.textContent= `${comment.text}`;
              card2.appendChild(text);


              const card3 = document.createElement('div');
              card3.classList.add('delete-card');
              const icon = document.createElement('div');
              icon.classList.add('icon');
              card3.setAttribute('id',`icon${comment.comment_id}`);
              card3.setAttribute('data-delete-id',`${comment.comment_id}`);
              const fa_trash = document.createElement('i');
              fa_trash.classList.add('fa-solid');
              fa_trash.classList.add('fa-trash');
              const del_text = document.createElement('div');
              del_text.classList.add('text');

              if(comment.comment_by == comment.login_user){
                del_text.innerHTML = 'Delete';
              }
              else{
                del_text.innerHTML = "can't delete"
              }

              //append
              icon.appendChild(fa_trash);
              card3.appendChild(icon);
              card3.appendChild(del_text);

              //append event to delete icon




              //end append





              comment_card.appendChild(card1);
              comment_card.appendChild(card2);
              comment_card.appendChild(card3);
              comment_card.classList.add('comment-card');

              container.appendChild(comment_card);
            });

            const deleteBtns = document.querySelectorAll('.elipsis');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns.forEach(btn => {
              //console.log('hhr',btn);
            btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

              parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('tribute-modal').style.display = 'block';
                  document.getElementById('tribute-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('tribute-modal').style.display = 'none';
                  });


                  //add event to delete btn
                  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                  parent_card.addEventListener('click',()=>{
                    fetch(`/delete-tribute/${commentId}/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                      },
                    })
                      .then(response => {
                        if (response.ok) {
                          // Remove the comment element from the DOM
                          //const commentEl = btn.closest('.comment');

                          //commentEl.remove();
                          btn.closest('.comment-card').remove();
                          document.getElementById('tribute-modal').style.display = 'none';

                        } else {
                          throw new Error('Failed to delete comment.');
                        }
                      })
                      .catch(error => console.error(error));
                  });

                }




              });
            });
            const deleteBtns_X = document.querySelectorAll('.elipsis-X');
            //let delete_box = document.getElementById(`icon${comment.comment_id}`);
            deleteBtns_X.forEach(btn => {
              //console.log('hhr',btn);
            btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-comment-id');
                let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

              parent_card.style.display = 'flex';
                if(parent_card.style.display == 'flex'){
                  document.getElementById('tribute-modal').style.display = 'block';
                  document.getElementById('tribute-modal').addEventListener('click',()=>{
                    parent_card.style.display='none';
                    document.getElementById('tribute-modal').style.display = 'none';
                  });
                }
            });

          });


        });


      }, 400);


      // Request was successful
      // Update the page with the new comment
      //const commentList = document.querySelector(`#photo-${photoId} .comment-list`);
      //const newComment = document.createElement('li');
      //newComment.textContent = commentContent;
      //commentList.appendChild(newComment);

    }
    else if(xhr.status === 500){
      window.location.href = '/Auth-memorial/';
    }
    else {
      // Request failed
      console.error(`Server returned status ${xhr.status}`);
    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };

  xhr.send(`comment_content=${encodeURIComponent(commentContent)}`); // Send the request with the comment content in the request body



});





document.querySelectorAll('.L-fetch-tribute').forEach(button => {
  button.addEventListener('click', event => {
    var element  =  document.getElementById('tribute-container');
    element.classList.add('show');


    const deceasedId = button.getAttribute('data-deceased-id');
    const url = `/tribute/${deceasedId}/list/`;
    fetch(url)
      .then(response => response.json())
      .then(comments_data => {

          const container = document.querySelector('.tribute-box');
          container.innerHTML = '';
          comments_data.forEach(comment => {

            const comment_card = document.createElement('div');
            const card1 = document.createElement('div');
            card1.classList.add('card1');
            const box1 = document.createElement('div');
            const box2 = document.createElement('div');
            box1.classList.add('box1');
            box2.classList.add('box2');
            box2.setAttribute('data-comment-id',`${comment.comment_id}`);

            if(comment.comment_by == comment.login_user){
              box2.classList.add('elipsis');
            }
            else{
              box2.classList.add('elipsis-X');
            }

            const ellipsis = document.createElement('i');
            ellipsis.classList.add('fa-solid');
            ellipsis.classList.add('fa-ellipsis');

            const initials = document.createElement('div');
            initials.classList.add('icon');
            initials.innerHTML =  `${comment.first_name[0]} ${comment.last_name[0]}`;
            const user_box = document.createElement('div');
            user_box.classList.add('user-box');
            const user_name = document.createElement('div');
            user_name.classList.add('name');
            user_name.innerHTML = `${comment.first_name} ${comment.last_name}`;
            const time = document.createElement('time');
            time.classList.add('time');

            const dateString = `${comment.date}`;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true
            });
            time.innerHTML = `${formattedDate}`;
            //append
            box2.appendChild(ellipsis);
            user_box.appendChild(user_name);
            user_box.appendChild(time);
            box1.appendChild(initials);
            box1.appendChild(user_box);
            card1.appendChild(box1);
            card1.appendChild(box2);



            const card2 = document.createElement('div');
            card2.classList.add('card2');
            const text = document.createElement('div');
            text.classList.add('text');
            text.textContent= `${comment.text}`;
            card2.appendChild(text);


            const card3 = document.createElement('div');
            card3.classList.add('delete-card');
            const icon = document.createElement('div');
            icon.classList.add('icon');
            card3.setAttribute('id',`icon${comment.comment_id}`);
            card3.setAttribute('data-delete-id',`${comment.comment_id}`);
            const fa_trash = document.createElement('i');
            fa_trash.classList.add('fa-solid');
            fa_trash.classList.add('fa-trash');
            const del_text = document.createElement('div');
            del_text.classList.add('text');

            if(comment.comment_by == comment.login_user){
              del_text.innerHTML = 'Delete';
            }
            else{
              del_text.innerHTML = "can't delete"
            }

            //append
            icon.appendChild(fa_trash);
            card3.appendChild(icon);
            card3.appendChild(del_text);

            //append event to delete icon




            //end append





            comment_card.appendChild(card1);
            comment_card.appendChild(card2);
            comment_card.appendChild(card3);
            comment_card.classList.add('comment-card');

            container.appendChild(comment_card);
          });

         const deleteBtns = document.querySelectorAll('.elipsis');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {

              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('tribute-modal').style.display = 'block';
                document.getElementById('tribute-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('tribute-modal').style.display = 'none';
                });


                //add event to delete btn
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                parent_card.addEventListener('click',()=>{
                  fetch(`/delete-tribute/${commentId}/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                    },
                  })
                    .then(response => {
                      if (response.ok) {
                        // Remove the comment element from the DOM
                        //const commentEl = btn.closest('.comment');

                        //commentEl.remove();
                        btn.closest('.comment-card').remove();
                        document.getElementById('tribute-modal').style.display = 'none';

                      } else {
                        throw new Error('Failed to delete comment.');
                      }
                    })
                    .catch(error => console.error(error));
                });

              }




            });
          });
          const deleteBtns_X = document.querySelectorAll('.elipsis-X');
          //let delete_box = document.getElementById(`icon${comment.comment_id}`);
          deleteBtns_X.forEach(btn => {
            //console.log('hhr',btn);
          btn.addEventListener('click', () => {
              const commentId = btn.getAttribute('data-comment-id');
              let parent_card = btn.closest('.comment-card').querySelector('.delete-card');

            parent_card.style.display = 'flex';
              if(parent_card.style.display == 'flex'){
                document.getElementById('tribute-modal').style.display = 'block';
                document.getElementById('tribute-modal').addEventListener('click',()=>{
                  parent_card.style.display='none';
                  document.getElementById('tribute-modal').style.display = 'none';
                });
              }
          });

        });


    });


  });
});



function show_sidebar(){
  var menu = document.getElementById('container1');
  var icon = document.getElementById('menu');
  menu.classList.toggle('show');
  if(menu.classList.contains('show')){
    icon.querySelector('i').classList.replace('fa-circle-xmark','fa-bars');

    icon.querySelector('i').style.color = 'white';
    document.querySelector('.image-box-wrapper').querySelector('img').style.width = '100%';

    document.querySelectorAll('.image-box-wrapper').forEach(button => {

      button.querySelector('img').style.width = 'auto';

    })

  }
  else{
    icon.querySelector('i').classList.replace('fa-bars','fa-circle-xmark');
    icon.querySelector('i').style.color = 'rgb(229, 62, 62)';
    document.querySelectorAll('.image-box-wrapper').forEach(button => {
      button.querySelector('img').style.width = 'auto';
    })
  }

}


const shaderEffects = [
  'cards',
  'glide',
  'cube',
  'coverflow',
  'flip',
  'creative'
];

var mySwiper = new Swiper('#swiper-container', {
  loop:true,
  grabCursor:true,
  slidesPerView: 1,
  spaceBetween: 24,
  effect: 'cube',
  //effect: shaderEffects[Math.floor(Math.random() * shaderEffects.length)],


});
//mySwiper.setTransition(shaderEffects[Math.floor(Math.random() * shaderEffects.length)]);

mySwiper.on('slideChange', function () {
  //shaderEffects[Math.floor(Math.random() * shaderEffects.length)];
  //console.log('kk',shaderEffects[Math.floor(Math.random() * shaderEffects.length)]);
  var currentSlide = mySwiper.activeIndex + 1;
  var totalSlides = mySwiper.slides.length;
  var element_index = mySwiper.slides[mySwiper.activeIndex];

     var set_hidden = document.querySelector('.set-hidden-bio');

    if(element_index.classList.contains('cover-host')){
        if(document.querySelector('.album-text')){

          document.querySelectorAll('.album-text').forEach(btn=>{
            console.log(btn);
            btn.style.display = 'none';
          });
        }
        if(document.querySelector('.text-cover-host')){
            document.querySelector('.text-cover-host').style.display= 'none';
        }

        console.log('setting hideen...',set_hidden)
        set_hidden.style.display= 'none';
    }
    else{
       if(document.querySelector('.album-text')){

          document.querySelectorAll('.album-text').forEach(btn=>{
            console.log(btn);
            btn.style.display = 'block';
          });
        }
        if(document.querySelector('.text-cover-host')){
            document.querySelector('.text-cover-host').style.display= 'block';
        }

         set_hidden.style.display= 'block';

    }


  if(element_index.classList.contains('event-photos')){
    let deceased_music = element_index.querySelector('.player-deceased-music').value;
    var photoId =  element_index.querySelector('.player-photo-id').value;

    if(deceased_music.endsWith('.mp3') || deceased_music.endsWith('.mp4')){
    let deceased_image = element_index.querySelector('.player-deceased-image').value;
    let deceased_name = element_index.querySelector('.player-deceased-name').value;
    let deceased_description = element_index.querySelector('.player-deceased-description').value;

    console.log(deceased_music,deceased_music.endsWith('.png'));
    const music_list = [
        {
            img :deceased_image ,
            name : deceased_name,
            artist : deceased_description,
            music : deceased_music,
        },

    ];



    function loadTrack(track_index){
        clearInterval(updateTimer);
        reset();

        curr_track.src = music_list[track_index].music;
        curr_track.load();

        track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
        track_art.setAttribute("onclick", "playpauseTrack()");
        track_name.textContent = music_list[track_index].name;
        track_artist.textContent = music_list[track_index].artist;
        //now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

        updateTimer = setInterval(setUpdate, 1000);

        curr_track.addEventListener('ended', nextTrack);
        random_bg_color();
    }
     loadTrack(track_index);
    function random_bg_color(){
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
        let a;

        function populate(a){
            for(let i=0; i<6; i++){
                let x = Math.round(Math.random() * 14);
                let y = hex[x];
                a += y;
            }
            return a;
        }
        let Color1 = populate('#');
        let Color2 = populate('#');
        var angle = 'to right';

        let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
        //document.body.style.background = gradient;
    }
    function reset(){
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }
    function randomTrack(){
        isRandom ? pauseRandom() : playRandom();
    }
    function playRandom(){
        isRandom = true;
        randomIcon.classList.add('randomActive');
    }
    function pauseRandom(){
        isRandom = false;
        randomIcon.classList.remove('randomActive');
    }
    function repeatTrack(){
        let current_index = track_index;
        loadTrack(current_index);
        playTrack();
    }
    function playpauseTrack(){
        isPlaying ? pauseTrack() : playTrack();
    }
    function playTrack(){
        curr_track.play();
        isPlaying = true;
        track_art.classList.add('rotate');
        wave.classList.add('loader');
        //playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    function pauseTrack(){
        curr_track.pause();
        isPlaying = false;
        track_art.classList.remove('rotate');
        wave.classList.remove('loader');
        //playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    function nextTrack(){
        if(track_index < music_list.length - 1 && isRandom === false){
            track_index += 1;
        }else if(track_index < music_list.length - 1 && isRandom === true){
            let random_index = Number.parseInt(Math.random() * music_list.length);
            track_index = random_index;
        }else{
            track_index = 0;
        }
        loadTrack(track_index);
        playTrack();
    }
    function prevTrack(){
        if(track_index > 0){
            track_index -= 1;
        }else{
            track_index = music_list.length -1;
        }
        loadTrack(track_index);
        playTrack();
    }
    function seekTo(){
        let seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
    }
    function setVolume(){
        curr_track.volume = volume_slider.value / 100;
    }
    function setUpdate(){
        let seekPosition = 0;
        if(!isNaN(curr_track.duration)){
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;

            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
            if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
            if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    }




    const like_url = `/like-list/${photoId}/`;

    fetch(like_url)
    .then(response => response.json())
    .then(data => {

      var likeCount = element_index.querySelector('.num');
      element_index.querySelector('.num-comment').textContent = data.comment_count;
      element_index.querySelector('.num-tributes').textContent = data.tributes_num;
      element_index.querySelector('.follow-num').textContent  = data.followers;
      console.log(data.followers);
      if(element_index.querySelector('.num-gifts')){
            if(data.gift_num > 0){
                element_index.querySelector('.num-gifts').textContent = data.gift_num;
            }
            else{
                element_index.querySelector('.num-gifts').textContent = 'Give';
            }


      }

      //console.log('dsss', element_index.querySelector('.num-tributes'));
      var btn = element_index.querySelector('.like-btn');

      if (data.liked) {

        btn.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
      } else {
        btn.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
      if(data.followed){
          element_index.querySelector('.follow-text').textContent  = 'Following';
      }
      else{
        element_index.querySelector('.follow-text').textContent  = 'Follow';

      }
    });
  }
  else{
    var photoId =  element_index.querySelector('.player-photo-id').value;

    const like_url = `/cover-like-list/${photoId}/`;
    fetch(like_url)
    .then(response => response.json())
    .then(data => {

      var likeCount = element_index.querySelector('.num');
      var btn = element_index.querySelector('.like-cover');
      //element_index.querySelector('.num-comment').textContent = data.comment_count;
      element_index.querySelector('.num-tributes').textContent = data.tributes_num;
      element_index.querySelector('.follow-num').textContent  = data.followers;
      console.log(data);
      if(element_index.querySelector('.num-gifts')){
            if(data.gift_num > 0){
                element_index.querySelector('.num-gifts').textContent = data.gift_num;
            }
            else{
                element_index.querySelector('.num-gifts').textContent = 'Give';
            }

      }

      //console.log('dsss', element_index.querySelector('.num-tributes'));


      if (data.liked) {

        btn.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
      } else {
        btn.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
      if(data.followed){
          element_index.querySelector('.follow-text').textContent  = 'Following';
      }
      else{
        element_index.querySelector('.follow-text').textContent  = 'Follow';

      }
    });
  }
});



function showYear(id){
  document.querySelectorAll('.album-text').forEach(btn =>{
    if(btn.id.endsWith(`${id}`)){
      btn.classList.add('hovered');
    }
    else{
      btn.classList.remove('hovered');
    }
  });
  document.querySelectorAll('.m-slides').forEach(slide =>{

    if(slide.id.endsWith(`${id}`)){
      event.target.classList.add('hovered');


      var slideIndex = slide.getAttribute('data-swiper-slide-index');
      slideIndex++;
      mySwiper.slideTo(slideIndex);
      //console.log('hell0');
      //slide.style.display = 'block';

      var photoId = slide.querySelector('input').value;
      const like_url = `/like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = slide.querySelector('.num');
        var btn = slide.querySelector('.like-btn');

        if (data.liked) {

          btn.classList.add('liked');
          //likeCount.textContent = data.count + ' likes';
          likeCount.textContent = data.count ;
        } else {
          btn.classList.remove('liked');
          likeCount.textContent = data.count ;
        }
      });
    }


  })

}


/*

var form = document.getElementById('light-candle-form');
    form.addEventListener('submit', function(event) {
        console.log('ggggg');
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/light-candle/');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
       xhr.setRequestHeader('X-CSRFToken', csrftoken);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          document.querySelector('.preloader-btn').style.display = 'block';
          //var candle = document.getElementById('candle-' + data.candle_id);
          //candle.classList.add('lit');
          setTimeout(function() {
            location.reload();
            document.querySelector('.preloader-btn').style.display = 'none';
          }, 2000);
          console.log('success');
        }
        else{
            window.location.href = '/Auth-memorial/';
        }
      };
      //console.log(form.deceased.value);
      var data = encodeURI('deceased=' + form.deceased.value)
      xhr.send(data);
    });

*/



function list_candles(){
  document.getElementById('list-candles').classList.toggle('show');
}
    //laptop


function close_list(){
  document.getElementById('list-candles').classList.remove('show');
}





function myFunction() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");
  if(moreText.classList.contains('show')){
    moreText.classList.remove('show');
    btnText.querySelector('.text').innerHTML = 'see more';
  }
  else{
    moreText.classList.add('show');
    btnText.querySelector('.text').innerHTML = 'see less';
  }


}




// Get the scroll button element
var scrollButton = document.getElementById('scrollButton');

// Add a scroll event listener
window.addEventListener('scroll', function() {
  // Calculate the scroll position
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Check if the scroll position is greater than 100vh window.innerHeight
  if (scrollPosition > 50) {
    scrollButton.style.display = 'block'; // Show the scroll button
  } else {
    scrollButton.style.display = 'none'; // Hide the scroll button
  }
});

// Function to scroll to the top when the button is clicked
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Add smooth scrolling behavior
  });
}





function myFunction2() {
  var moreText = document.getElementById("more-photo");
  var btnText = document.getElementById("myBtn-photo");
  if(moreText.classList.contains('show')){
    moreText.classList.remove('show');
    btnText.querySelector('.text').innerHTML = 'see more';
  }
  else{
    moreText.classList.add('show');
    btnText.querySelector('.text').innerHTML = 'see less';
  }
}


function myFunction3() {
  var moreText = document.getElementById("more-photo3");
  var btnText = document.getElementById("myBtn-photo3");
  if(moreText.classList.contains('show')){
    moreText.classList.remove('show');
    btnText.querySelector('.text').innerHTML = 'see more';
  }
  else{
    moreText.classList.add('show');
    btnText.querySelector('.text').innerHTML = 'see less';
  }
}

function event_info(){
  document.getElementById('event-info-wrapper').classList.toggle('show');
}



function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();















document.addEventListener('DOMContentLoaded', function() {
    //var followBtn = document.getElementById('follow-btn');
    var followBtn = document.querySelectorAll('.follow-btn-x');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    followBtn.forEach(btn =>{


        btn.addEventListener('click', function() {

            var pk = btn.dataset.username;

            var isFollowing = btn.dataset.isFollowing === 'True';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/follow/' + pk + '/');
            xhr.setRequestHeader('X-CSRFToken', csrfToken);
            xhr.onload = function() {

                if (xhr.status === 200) {
                    //var response = JSON.parse(xhr.responseText);
                    var response = JSON.parse(xhr.responseText);

                    if (response.status === 'followed') {
                        btn.innerText = 'Unfollow';
                        btn.dataset.isFollowing = 'True';
                    } else if (response.status === 'unfollowed') {
                        btn.innerText = 'Follow';
                        btn.dataset.isFollowing = 'False';
                    }
                } else {


                }
            };
            xhr.send();
        });
    })

});



















function setReplyData(commentId,parentReplyId,fname,lname) {

    var parentReplyIdInput = document.getElementById('parent-reply-id');
    var commentIdInput = document.getElementById('comment-id');
  parentReplyIdInput.value = parentReplyId;
  document.getElementById('reply-top-container').classList.add('show');
  document.getElementById('reply-top-container').querySelector('.reply-to').textContent = `replying to ${fname} ${lname}`;
  commentIdInput.value = commentId;
  document.querySelector('textarea[name="m_comment_content"]').value = `@${fname} ${lname}  `;
  //console.log('hellop',commentIdInput, parentReplyIdInput.value);
}
function setCommentData(commentId,fname,lname){

    var parentReplyIdInput = document.getElementById('parent-reply-id');
    var commentIdInput = document.getElementById('comment-id');

  document.getElementById('reply-top-container').classList.add('show');

  document.getElementById('reply-top-container').querySelector('.reply-to').textContent = `replying to ${fname} ${lname}`;
  document.querySelector('textarea[name="m_comment_content"]').value = `@${fname} ${lname}  `;
  commentIdInput.value = commentId;
}

function clearReplyData() {

    var parentReplyIdInput = document.getElementById('parent-reply-id');
    var commentIdInput = document.getElementById('comment-id');

  document.getElementById('reply-top-container').classList.remove('show');
  parentReplyIdInput.value = '';
  commentIdInput.value = '';
    document.querySelector('textarea[name="m_comment_content"]').value = ``;
  //console.log('helTo',commentIdInput);
}


function setTributeData(commentId,fname,lname){
  const commentIdInput = document.getElementById('comment-id-tribute-m');
  document.getElementById('reply-top-container-tribute').classList.add('show');

  document.getElementById('reply-top-container-tribute').querySelector('.reply-to').textContent = `replying to ${fname} ${lname}`;
  document.querySelector('textarea[name="tribute-deceased"]').value = `@${fname} ${lname}  `;
  commentIdInput.value = commentId;
}


function setTributeReplyData(commentId,parentReplyId,fname,lname) {

  const parentReplyIdInput = document.getElementById('parent-reply-id-tribute-m');
  const commentIdInput = document.getElementById('comment-id-tribute-m');

  parentReplyIdInput.value = parentReplyId;
  document.getElementById('reply-top-container-tribute').classList.add('show');
  document.getElementById('reply-top-container-tribute').querySelector('.reply-to').textContent = `replying to ${fname} ${lname}`;
  commentIdInput.value = commentId;
  document.querySelector('textarea[name="tribute-deceased"]').value = `@${fname} ${lname}  `;

}


function clearTributeReplyData() {

  const parentReplyIdInput = document.getElementById('parent-reply-id-tribute-m');
  const commentIdInput = document.getElementById('comment-id-tribute-m');
  document.getElementById('reply-top-container-tribute').classList.remove('show');
  parentReplyIdInput.value = '';
  commentIdInput.value = '';
  document.querySelector('textarea[name="tribute-deceased"]').value = ``;

}



//heart comment



function HeartComment(event){
  const button = event.target;

  const commentId = event.target.getAttribute('data-comment-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/heart-comment/${commentId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var heartCount = button.nextElementSibling;
    if (data.heart) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'red';
      //likeCount.textContent = data.count + ' likes';
      heartCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      heartCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function HeartReply(event){
  const button = event.target;

  const replyId = event.target.getAttribute('data-reply-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/heart-reply/${replyId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var heartCount = button.nextElementSibling;
    if (data.heart) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'red';
      //likeCount.textContent = data.count + ' likes';
      heartCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      heartCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function LikeComment(event){
  const button = event.target;

  const commentId = event.target.getAttribute('data-comment-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/like-comment/${commentId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var LikeCount = button.nextElementSibling;
    if (data.liked) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'blue';
      //likeCount.textContent = data.count + ' likes';
      LikeCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      LikeCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function LikeReply(event){
  const button = event.target;

  const replyId = event.target.getAttribute('data-reply-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/like-reply/${replyId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var LikeCount = button.nextElementSibling;
    if (data.liked) {



      button.style.color = 'blue';
      //likeCount.textContent = data.count + ' likes';
      LikeCount.textContent = data.count ;



    } else {


      button.style.color = 'black';
      LikeCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function showReply(event){

  const parent =  event.target.closest('.card5').querySelectorAll('.reply-card');
  parent.forEach(btn=>{
    btn.classList.toggle('show');
  });
  //event.target.nextElementSibling.classList.toggle('show');
}




//tribute reactions

function HeartTribute(event){
  const button = event.target;

  const tributeId = event.target.getAttribute('data-comment-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/heart-tribute/${tributeId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var heartCount = button.nextElementSibling;
    if (data.heart) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'red';
      //likeCount.textContent = data.count + ' likes';
      heartCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      heartCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function HeartTributeReply(event){
  const button = event.target;

  const replyId = event.target.getAttribute('data-reply-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/heart-tribute-reply/${replyId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var heartCount = button.nextElementSibling;
    if (data.heart) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'red';
      //likeCount.textContent = data.count + ' likes';
      heartCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      heartCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function LikeTribute(event){
  const button = event.target;

  const tributeId = event.target.getAttribute('data-comment-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/like-tribute/${tributeId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var LikeCount = button.nextElementSibling;
    if (data.liked) {


      button.classList.replace('fa-regular', 'fa-solid');
      button.style.color = 'blue';
      //likeCount.textContent = data.count + ' likes';
      LikeCount.textContent = data.count ;



    } else {

      button.classList.replace('fa-solid','fa-regular');
      button.style.color = 'black';
      LikeCount.textContent = data.count ;
    }
  };
  xhr.send();
}


function LikeTributeReply(event){
  const button = event.target;

  const replyId = event.target.getAttribute('data-reply-id');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/like-tribute-reply/${replyId}/`);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //var likeBtn = document.getElementById('like-btn');
    var LikeCount = button.nextElementSibling;
    if (data.liked) {



      button.style.color = 'blue';
      //likeCount.textContent = data.count + ' likes';
      LikeCount.textContent = data.count ;



    } else {


      button.style.color = 'black';
      LikeCount.textContent = data.count ;
    }
  };
  xhr.send();
}









function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    //playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
   // playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}








/*
var startY, endY;
var parent = document.getElementById('swiper-container');

parent.addEventListener('touchstart', function(event) {

  startY = event.touches[0].clientY;

});

parent.addEventListener('touchend', function(event) {

  endY = event.changedTouches[0].clientY;

  var deltaY = endY - startY;

  if (deltaY < -160) {
    handleSwipeUp();
  }
});

function handleSwipeUp() {
  document.getElementById('reel-container').style.display = 'block';
    //var element_index2 = mySwiper2.slides[mySwiper2.activeIndex];
    //element_index2.querySelector('.num-tributes').textContent = data.tributes_num;
    //console.log(element_index2);

  //console.log('Swipe up detected!');
}


function HideSwipeUp() {
  document.getElementById('reel-container').style.display = 'none';
 // console.log('Swipe up detected!');
}



const swhaderEffects = [
  'cards',
  'glide',
  'cube',
  'coverflow',
  'flip',
  'creative'
];
var mySwiper2 = new Swiper('#reel-container', {
  direction: 'vertical',
  loop:true,
  grabCursor:true,
  slidesPerView: 1,
  spaceBetween: 10,

  //effect: 'cube',

  //effect: shaderEffects[Math.floor(Math.random() * shaderEffects.length)],


});
//mySwiper.setTransition(shaderEffects[Math.floor(Math.random() * shaderEffects.length)]);

mySwiper2.on('slideChange', function () {
  //shaderEffects[Math.floor(Math.random() * shaderEffects.length)];
  //console.log('kk',shaderEffects[Math.floor(Math.random() * shaderEffects.length)]);
  var currentSlide = mySwiper2.activeIndex + 1;
  var totalSlides = mySwiper2.slides.length;
  var element_index = mySwiper2.slides[mySwiper2.activeIndex];


  if(element_index.classList.contains('event-photos')){
    var photoId =  element_index.querySelector('input').value;


    const like_url = `/like-list/${photoId}/`;

    fetch(like_url)
    .then(response => response.json())
    .then(data => {

      //comment_count
      element_index.querySelector('.num-comment').textContent = data.comment_count;
      var likeCount = element_index.querySelector('.num');
      var btn = element_index.querySelector('.like-btn');

      if (data.liked) {

        btn.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
      } else {
        btn.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
    });
  }
  else{
    var set_hidden = document.querySelector('.set-hidden-bio');

    var photoId = element_index.querySelector('input').value;


    const like_url = `/cover-like-list/${photoId}/`;
    fetch(like_url)
    .then(response => response.json())
    .then(data => {
      var likeCount = element_index.querySelector('.num');
      var btn = element_index.querySelector('.like-cover');
      element_index.querySelector('.num-tributes').textContent = data.tributes_num;

      if (data.liked) {

        btn.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
      } else {
        btn.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
    });
  }
});



*/







function show_post(){
    document.getElementById('post-container').classList.toggle('show');
    console.log('ggg', document.getElementById('post-container'));
}

function post_modal(event){
    if(event.target.classList.contains('post-container')){
        event.target.classList.remove('show');
    }

}

function cancel_btn(){
    document.getElementById('post-container').classList.remove('show')
}




window.onload = function() {
    var currentSlide = mySwiper.activeIndex + 1;
    var totalSlides = mySwiper.slides.length;
    var element_index = mySwiper.slides[mySwiper.activeIndex];
    console.log('$$$',element_index);


    var photoId = element_index.querySelector('.m-like-cover-1').value;



    const like_url = `/cover-like-list/${photoId}/`;
    fetch(like_url)
    .then(response => response.json())
    .then(data => {
        element_index.querySelector('.num-tributes').textContent = data.tributes_num;

      var likeCount = element_index.querySelector('.num');
      var btn = element_index.querySelector('.like-cover');
       element_index.querySelector('.follow-num').textContent  = data.followers;
     if(element_index.querySelector('.num-gifts')){
            if(data.gift_num > 0){
                element_index.querySelector('.num-gifts').textContent = data.gift_num;
            }
            else{
                element_index.querySelector('.num-gifts').textContent = 'Give';
            }

      }

      //console.log('dsss', element_index.querySelector('.num-tributes'));



      if (data.liked) {

        btn.classList.add('liked');
        //likeCount.textContent = data.count + ' likes';
        likeCount.textContent = data.count ;
      } else {
        btn.classList.remove('liked');
        likeCount.textContent = data.count ;
      }
       if(data.followed){
          element_index.querySelector('.follow-text').textContent  = 'Following';
      }
      else{
        element_index.querySelector('.follow-text').textContent  = 'Follow';

      }
    });


}






var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n){

  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("gift-tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
}

function nextPrev(n) {

  var x = document.getElementsByClassName("gift-tab");
  // Exit the function if any field in the current tab is invalid:
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


















 function showGift(event){

     document.getElementById('new-gift-wrapper').classList.toggle('show');
}
function showFlower(event){

   console.log(document.getElementById('gift-flower'));
  document.getElementById('gift-flower').style.display = 'block';
  document.getElementById('gift-tab1').style.display = 'none';
  document.getElementById('gift-tab2').style.display = 'none';
}

function hideFlower(){
  document.getElementById('gift-flower').style.display = 'none';
  document.getElementById('gift-tab1').style.display = 'block';
}






var sendGift = document.querySelectorAll('.send-gift');

sendGift.forEach(btn =>{
    btn.addEventListener('click',()=>{
      var element_index = mySwiper.slides[mySwiper.activeIndex];
      var parent = btn.closest('.delete-modal-container');
      //console.log(parent.querySelector('.gift-type'));
      var giftType = parent.querySelector('.gift-type').value;
      const giftPrice = btn.getAttribute('data-gift-price');

      const recipientId = document.querySelector('.recipientId').value;
      console.log('gift-price',giftPrice);
      console.log(recipientId);
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
      var xhr = new XMLHttpRequest();
      xhr.open('POST', `/send-gift/${recipientId}/${giftPrice}/${giftType}/`,true)
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);

          document.querySelector('#user-balance').textContent = `${response.balance}`;
          element_index.querySelector('.num-gifts').textContent = response.deceased_bal;
          console.log(element_index.querySelector('.num-gifts'));
          if (response.success) {
            console.log('Gift sent successfully.');
            notificationMessage('success',response.message);
          } else {
            console.error('Failed to send gift: ' + response.message);
            notificationMessage('error',response.message);
          }
        }
        else {
            notificationMessage('error','login to send gifts!');

          console.error(`Server returned status ${xhr.status}`);
        }

      };
      //console.log(form.deceased.value);
      var data = encodeURI('giftPrice=' + giftPrice  + '&recipientId=' + recipientId);
      console.log(data);
      xhr.send(data);

    })
})





function giftModal(element){

  element.querySelector('.delete-modal-container').classList.toggle('show');
  var image = element.querySelector('.gift-img').src;
  var type = element.querySelector('.gift-type').value;
  element.querySelector('.rep-img').src = image;
  element.querySelector('.confirm-text').innerHTML = `this is to confirm you are honoring your loved one with ${type}?`;


  //element.querySelector('.m-tribute-box').classList.toggle('show');
}

function cancelAds(element){
  element.querySelector('.delete-modal-container').classList.remove('show');
}






//follow

document.querySelectorAll('.follow-btn').forEach(button => {
  button.addEventListener('click',  (event)=> {
    event.preventDefault();
    const deceasedId = button.getAttribute('data-deceased-id');
    var follow_num = button.closest('.m-body').querySelector('.follow-num');
    var follow_text = button.closest('.m-body').querySelector('.follow-text');
    //console.log(button.closest('.m-body'));
    console.log(button.closest('.m-body').querySelector('.follow-num'));

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
    //const url = `/photos/${photoId}/comments/`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/follow-deceased/${deceasedId}/`);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      //var likeBtn = document.getElementById('like-btn');

      console.log(data);
      if (data.status == 'followed') {
          follow_num.innerHTML = data.followers_count;
          follow_text.innerHTML = "Following";
           console.log('success!');

      }
      else if (data.status == 'unfollowed') {
          follow_num.innerHTML = data.followers_count;
          follow_text.innerHTML = "Follow";
          console.log('success!');

      }
      else {
          console.log('error');
          notificationMessage('error',"Please login.");

      }
    };
    xhr.send();
  });
});



