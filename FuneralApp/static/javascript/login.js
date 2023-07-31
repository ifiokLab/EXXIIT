
var my_email = document.getElementById('my_email');
function Swap_text(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word = document.getElementById('pass_word');
    const password = document.getElementById('password');
    if(password.classList.contains('top')){
       
        if(pass_word.value === '' || pass_word.value === null){
            password.classList.remove('top');
        }
        

    }
    if(email.classList.contains('top')){
        console.log('hello')
    }
    else{
        email.classList.toggle('top');
    }
}

function Swap_text2(){
    const password = document.getElementById('password');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');

    var email = document.getElementById('email');
    var my_email = document.getElementById('my_email');
    var pass_word = document.getElementById('pass_word');
    if(email.classList.contains('top') ){
        if(my_email.value === '' || my_email.value === null){
            email.classList.remove('top');
            console.log('hi')
        }
        
    }
    if(password.classList.contains('top')){
        console.log('top');
    }
    else{
        password.classList.toggle('top');
    }
  
    
}

function Modal(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
    const password = document.getElementById('password');
    overlay.classList.remove('show');

    var my_password = document.getElementById('pass_word');
    var my_email = document.getElementById('my_email');
    if(my_email.value == ''){
        email.classList.remove('top');
    }
    
    if(my_password.value == ''){
        password.classList.remove('top');
    }
    
}


function show(){
    var eye = document.getElementById('eye');
    var element = document.getElementById('pass_word');
    if(element.type === 'password'){
        element.setAttribute('type','text');
        eye.classList.replace('fa-eye','fa-eye-slash');
    }
    else{
        element.setAttribute('type','password');
        eye.classList.replace('fa-eye-slash','fa-eye');
    }

}



