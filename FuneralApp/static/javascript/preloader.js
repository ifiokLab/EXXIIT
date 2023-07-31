document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader-wrapper");
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 2000);
  });
  
  function close_search(){
      document.getElementById('index-form').style.display = 'none';
  }
  
  function open_search(){
      document.getElementById('index-form').style.display = 'block';
  }