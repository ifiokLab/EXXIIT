

var my_email = document.getElementById('my_email');

function Swap_text(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word2 = document.getElementById('pass_word2');//inputs
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const pass_word1 = document.getElementById('pass_word1');



    const password2 = document.getElementById('password2');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password1 = document.getElementById('password1');//other element
    if(password2.classList.contains('top') || firstname.classList.contains('top') || lastname.classList.contains('top') || password1.classList.contains('top')){
       
        if(first_name.value === '' || first_name.value === null ){
            firstname.classList.remove('top'); 
        }
        if(last_name.value === '' || last_name.value === null ){
            lastname.classList.remove('top'); 
        }
        if(pass_word1.value === '' || pass_word1.value === null ){
            password1.classList.remove('top'); 
        }
        if(pass_word2.value === '' || pass_word2.value === null ){
            password2.classList.remove('top'); 
        }
        

    }
    if(email.classList.contains('top')){//current element
        console.log('hello')
    }
    else{
        email.classList.toggle('top');
      

    }
}

function Swap_text5(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word2 = document.getElementById('pass_word2');//inputs
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const pass_word1 = document.getElementById('pass_word1');



    const password2 = document.getElementById('password2');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password1 = document.getElementById('password1');//other element
    if(email.classList.contains('top') || firstname.classList.contains('top') || lastname.classList.contains('top') || password1.classList.contains('top')){
       
        if(first_name.value === '' || first_name.value === null ){
            firstname.classList.remove('top'); 
        }
        if(last_name.value === '' || last_name.value === null ){
            lastname.classList.remove('top'); 
        }
        if(pass_word1.value === '' || pass_word1.value === null ){
            password1.classList.remove('top'); 
        }
        if(my_email.value === '' || pass_word2.value === null ){
            email.classList.remove('top'); 
        }
        

    }
    if(password2.classList.contains('top')){//current element
        console.log('hello')
    }
    else{
        password2.classList.toggle('top');
      

    }
}





function Swap_text2(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word2 = document.getElementById('pass_word2');//inputs
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const pass_word1 = document.getElementById('pass_word1');



    const password2 = document.getElementById('password2');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password1 = document.getElementById('password1');//other element
    if(password2.classList.contains('top') || email.classList.contains('top') || lastname.classList.contains('top') || password1.classList.contains('top')){
       
        if(my_email.value === '' || my_email.value === null ){
            email.classList.remove('top'); 
        }
        if(last_name.value === '' || last_name.value === null ){
            lastname.classList.remove('top'); 
        }
        if(pass_word1.value === '' || pass_word1.value === null ){
            password1.classList.remove('top'); 
        }
        if(pass_word2.value === '' || pass_word2.value === null ){
            password2.classList.remove('top'); 
        }
        

    }
    if(firstname.classList.contains('top')){//current element
        console.log('hello')
    }
    else{
        firstname.classList.toggle('top');
      
    }
}



function Swap_text3(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word2 = document.getElementById('pass_word2');//inputs
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const pass_word1 = document.getElementById('pass_word1');



    const password2 = document.getElementById('password2');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password1 = document.getElementById('password1');//other element
    if(password2.classList.contains('top') || firstname.classList.contains('top') || email.classList.contains('top') || password1.classList.contains('top')){
       
        if(first_name.value === '' || first_name.value === null ){
            firstname.classList.remove('top'); 
        }
        if(my_email.value === '' || my_email.value === null ){
            email.classList.remove('top'); 
        }
        if(pass_word1.value === '' || pass_word1.value === null ){
            password1.classList.remove('top'); 
        }
        if(pass_word2.value === '' || pass_word2.value === null ){
            password2.classList.remove('top'); 
        }
        

    }
    if(lastname.classList.contains('top')){//current element
        console.log('hello')
    }
    else{
        lastname.classList.toggle('top');
      

    }
}



function Swap_text4(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
   
    overlay.classList.toggle('show');
    var pass_word2 = document.getElementById('pass_word2');//inputs
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const pass_word1 = document.getElementById('pass_word1');



    const password2 = document.getElementById('password2');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password1 = document.getElementById('password1');//other element
    if(password2.classList.contains('top') || firstname.classList.contains('top') || lastname.classList.contains('top') || email.classList.contains('top')){
       
        if(first_name.value === '' || first_name.value === null ){
            firstname.classList.remove('top'); 
        }
        if(last_name.value === '' || last_name.value === null ){
            lastname.classList.remove('top'); 
        }
        if(my_email.value === '' || my_email.value === null ){
            email.classList.remove('top'); 
        }
        if(pass_word2.value === '' || pass_word2.value === null ){
            password2.classList.remove('top'); 
        }
        

    }
    if(password1.classList.contains('top')){//current element
        console.log('hello')
    }
    else{
        password1.classList.toggle('top');
      

    }
}






function Modal(){
    const email = document.getElementById('email');
    const overlay = document.getElementById('overlay');
    const password2 = document.getElementById('password2');
    const lastname = document.getElementById('lastname');
    const last_name = document.getElementById('last_name');
    overlay.classList.remove('show');

    var my_password2 = document.getElementById('pass_word2');
    var my_email = document.getElementById('my_email');
    if(my_email.value == ''){
        email.classList.remove('top');
    }
    
    if(my_password2.value == ''){
        password2.classList.remove('top');
    }
    if(last_name.value == ''){
        lastname.classList.remove('top');
    }
    
}


function show(){
    var eye = document.getElementById('eye');
    var element = document.getElementById('pass_word2');
    if(element.type === 'password'){
        element.setAttribute('type','text');
        eye.classList.replace('fa-eye','fa-eye-slash');
    }
    else{
        element.setAttribute('type','password');
        eye.classList.replace('fa-eye-slash','fa-eye');
    }

}


function show2(){
    var eye = document.getElementById('eye1');
    var element = document.getElementById('pass_word1');
    if(element.type === 'password'){
        element.setAttribute('type','text');
        eye.classList.replace('fa-eye','fa-eye-slash');
    }
    else{
        element.setAttribute('type','password');
        eye.classList.replace('fa-eye-slash','fa-eye');
    }

}