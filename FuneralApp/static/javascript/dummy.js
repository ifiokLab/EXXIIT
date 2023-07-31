comments_data.forEach(comment => {
    //console.log('reply#',comment.replies.first_name);
    const comment_card = document.createElement('div');
    const card1 = document.createElement('div');

    const card4 = document.createElement('div');// reply div
    const card5 = document.createElement('div');
    
    card1.classList.add('card1');
    card4.classList.add('card4');
    card5.classList.add('card5');
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
     
    
    const card4_box1 = document.createElement('div');
    const card4_box2 = document.createElement('div');
    card4_box1.classList.add('card4-box1');
    card4_box2.classList.add('card4-box2');
    const card4_text1 = document.createElement('span');
    card4_text1.setAttribute('onclick', `setReplyData(${comment.comment_id})`);
    const card4_text2 = document.createElement('span');
    card4_text1.textContent = 'Reply';
    card4_text2.textContent = 'Like';
    card4_text1.classList.add('card4-text1');
    card4_text2.classList.add('card4-text2');

    const card4_text3 = document.createElement('i');
    const card4_text4 = document.createElement('span');
    card4_text3.classList.add('fa-solid');
    card4_text3.classList.add('fa-heart');
   
    card4_text4.classList.add('card4-text4');
    card4_text4.textContent = 10;
    card4_box1.appendChild(card4_text1);
    card4_box1.appendChild(card4_text2);

    card4_box2.appendChild(card4_text3);
    card4_box2.appendChild(card4_text4);
    const card5_box1 = document.createElement('div');
    card5_box1.classList.add('card5-box1');
    card5_box1.textContent = '---  View replies(3)';
    card5.appendChild(card5_box1);

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
    const reply_card4_text3 = document.createElement('i');
    const reply_card4_text4 = document.createElement('span');

    //add class
    reply_card4_text3.classList.add('fa-solid');
    reply_card4_text3.classList.add('fa-heart');
    reply_card4_text4.classList.add('card4-text4');
    reply_card4_text1.classList.add('reply-card4-text1');
    reply_card4_text2.classList.add('reply-card4-text2');
    reply_card4_text4.textContent = '10';
    reply_card4_text1.textContent = 'Reply';
    reply_card4_text2.textContent = 'Like';

    reply_card4_box1.appendChild(reply_card4_text1);
    reply_card4_box1.appendChild(reply_card4_text2)
    reply_card4_box2.appendChild(reply_card4_text3);
    reply_card4_box2.appendChild(reply_card4_text4);
    reply_card4.appendChild(reply_card4_box1);
    reply_card4.appendChild(reply_card4_box2);
    
    


    

    //create element to reply card1
    const reply_box1 = document.createElement('div')
    const reply_icon = document.createElement('div');
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
    reply_icon.textContent = `${reply.first_name[0]} ${reply.last_name[0]}`;
    reply_user_box.classList.add('reply-user-box');
    reply_box1.appendChild(reply_icon);
    reply_box1.appendChild(reply_user_box);


    const reply_box2 = document.createElement('div')
    reply_box1.classList.add('reply-box1');
    reply_box2.classList.add('reply-box2');
    reply_box2.classList.add('reply-elipsisX');
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
    reply_delete_text.textContent = "can't delete";
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
    comment.replies.forEach(reply=>{

    });
    comment_card.classList.add('comment-card');

    container.appendChild(comment_card);
   
    });


  /*
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
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open('POST', `/add-comment/${photoId}/`); // Set up the request
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  xhr.setRequestHeader('X-CSRFToken', csrftoken);

  xhr.onload = function() {
    if (xhr.status === 200) {
      setTimeout(function() {
        document.querySelector('textarea[name="m_comment_content"]').value = '';
        const url = `/photos/${photoId}/comments/`;
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

  xhr.send(`comment_content=${encodeURIComponent(commentContent)}`); // Send the request with the comment content in the request body
});



 */