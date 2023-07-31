


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
  
  
  const shaderEffects = [
    'cards',
    'glide',
    'cube',
    'coverflow',
    'flip',
    'creative',
    'fade', // Fade effect
    'slide', // Slide effect
    'concave', // Concave effect
    'zoom', // Zoom effect
  ];
  
  
  var mySwiper2 = new Swiper('.reel-container', {
    direction: 'vertical',
    loop:true,
    grabCursor:true,
    slidesPerView: 1,
    spaceBetween: 24,
  
    //effect: 'cube',
  
    //effect: shaderEffects[Math.floor(Math.random() * shaderEffects.length)],
  
  
  });
  
  
  mySwiper2.on('transitionStart', function () {
    // Handle transition start event here
    console.log('Slide transition started');
  });
  
  mySwiper2.on('transitionEnd', function () {
    // Handle transition end event here
    console.log('Slide transition ended');
  });
  
  mySwiper2.on('slideChange', function () {
      // Handle slide change event here
  
      var currentSlide = mySwiper2.slides[mySwiper2.activeIndex];
      var element_index = mySwiper2.slides[mySwiper2.activeIndex];
  
      // You can now use `currentSlide` as the current view element
  
      var photoId = element_index.querySelector('input').value;
  
  
      const like_url = `/cover-like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = element_index.querySelector('.num');
        var btn = element_index.querySelector('.like-cover');
        element_index.querySelector('.num-tributes').textContent = data.tributes_num;
        element_index.querySelector('.follow-num').textContent  = data.followers;
        if(data.gift_num > 0){
            element_index.querySelector('.num-gifts').textContent = data.gift_num;
        }
        else{
            element_index.querySelector('.num-gifts').textContent = 'Give';
        }
  
  
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
  
  });
  
  
  
  function showReel(id){
  
  
    document.querySelectorAll('.m-slides').forEach(slide =>{
    document.getElementById('reel-container').style.display = 'block';
  
    console.log('before:',mySwiper2.slides[mySwiper2.activeIndex]);
  
    mySwiper2.update();
      if(slide.id.endsWith(`${id}`)){
  
        //event.target.classList.add('hovered');
        //console.log('hello',event.target);
        //console.log(slide.getAttribute('data-swiper-slide-index'));
  
        var slideIndex = slide.getAttribute('data-swiper-slide-index');
        slideIndex++;
  
        mySwiper2.slideTo(slideIndex);
  
        var currentSlide = mySwiper2.slides[mySwiper2.activeIndex];
        var element_index = mySwiper2.slides[mySwiper2.activeIndex];
      // You can now use `currentSlide` as the current view element
  
        document.getElementById('reel-container').style.display = 'block';
  
        var photoId = element_index.querySelector('input').value;
  
  
      const like_url = `/cover-like-list/${photoId}/`;
      fetch(like_url)
      .then(response => response.json())
      .then(data => {
        var likeCount = element_index.querySelector('.num');
        var btn = element_index.querySelector('.like-cover');
        element_index.querySelector('.num-tributes').textContent = data.tributes_num;
        element_index.querySelector('.num-gifts').textContent = data.gift_num;
        element_index.querySelector('.follow-num').textContent  = data.followers;
  
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
  
  
  
  
  
  
  
      };
  });
  };
  
  
  function hideReel(event){
       //var element_index = mySwiper2.slides[mySwiper2.activeIndex];
  
        event.preventDefault();
       //element_index.preventDefault();
    document.getElementById('reel-container').style.display = 'none';
  };
  
  
  
  
  
  document.querySelectorAll('.like-cover').forEach(button => {
    button.addEventListener('click',  (event)=> {
      event.preventDefault();
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
  
  
  
  
  
  
  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      document.getElementById('share-container').style.display = 'flex';
      var element_index = mySwiper2.slides[mySwiper2.activeIndex];
      var deceased_name = element_index.querySelector('.deceased-name').value;
       var deceased_id = element_index.querySelector('.recipientId').value;
      document.getElementById('share-container').querySelector('.share-deceased-name').textContent = `${deceased_name}'s Memorial`;
      var url = 'https://kinglyrae.pythonanywhere.com/create_biography';
      document.getElementById('share-container').querySelector('#copy-text-b').textContent = `${url}/${deceased_id}/`;
      console.log(document.getElementById('share-container').querySelector('#copy-text-b'));
  
  
    });
  });
  
  
  function close_share(){
    document.getElementById('share-container').style.display = 'none';
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
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader-wrapper");
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 2000);
  });
  
  
  
  
  function m_tribute_comment(){
    var element  =  document.getElementById('m-tribute-container');
    element.classList.remove('show');
     //document.getElementById('reel-add-comment').setAttribute("hidden", "false");
     //console.log('krrrkk',document.getElementById('reel-add-comment'));
  
     var element_index = mySwiper2.slides[mySwiper2.activeIndex];
     element_index.querySelector('.reel-add-comment').style.display = 'block';
     console.log(element_index.querySelector('.reel-add-comment'));
  }
  
  
  
  
  
  document.querySelectorAll('.fetch-tribute').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
  
      var element  =  document.getElementById('m-tribute-container');
       var element_index = mySwiper2.slides[mySwiper2.activeIndex];
      element_index.querySelector('.reel-add-comment').style.display = 'none';
      element.classList.add('show');
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
  
  
  
  
  
  
  //mobile tribute form...
  const m_tributeForm = document.querySelector('#m-tribute-container');
  m_tributeForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    let deceasedId = m_tributeForm.querySelector('#m-deceased-id').value;
  
  
  
    //var currentSlide = mySwiper.activeIndex + 1;
    //var totalSlides = mySwiper.slides.length;
    //var element_index = mySwiper.slides[mySwiper.activeIndex];
  
  
    var element_index2 = mySwiper2.slides[mySwiper2.activeIndex];
  
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
               //element_index.querySelector('.num-tributes').textContent = comment.tribute_count;
                element_index2.querySelector('.num-tributes').textContent = comment.tribute_count;
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
       event.preventDefault();
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
        var element_index = mySwiper2.slides[mySwiper2.activeIndex];
        var parent = btn.closest('.delete-modal-container');
        //console.log(parent.querySelector('.gift-type'));
        var giftType = parent.querySelector('.gift-type').value;
        const giftPrice = btn.getAttribute('data-gift-price');
  
        const recipientId = element_index.querySelector('.recipientId').value;
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
      var follow_num = button.closest('.bottom-wrapper').querySelector('.follow-num');
      var follow_text = button.closest('.bottom-wrapper').querySelector('.follow-text');
  
      console.log(button.closest('.bottom-wrapper').querySelector('.follow-num'));
  
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
  
  
  