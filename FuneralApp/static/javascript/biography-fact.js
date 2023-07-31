
const formset = document.querySelector('#book-formset');
const addBtn = formset.querySelector('.add-formset-row');
//const deleteBtns = formset.querySelectorAll('.delete-formset-row');
const deleteBtns = formset.querySelectorAll('.delete-formset-row');



function addFormsetRow() {
  const newFormsetRow = formset.querySelector('.formset-row:last-of-type').cloneNode(true);
  //const formsetCount = parseInt(formset.querySelector('#id_form-TOTAL_FORMS').value);
  const formsetCount = parseInt(formset.querySelector('#id_biographyfacts_set-TOTAL_FORMS').value);
  const newFormsetRowInputs = newFormsetRow.querySelectorAll('input, select');
  newFormsetRowInputs.forEach((input) => {
    input.name = input.name.replace(`-${formsetCount - 1}-`, `-${formsetCount}-`);
    //if (input.getAttribute('type') !== 'hidden') {
        //input.value = '';
    //}

    if(input.getAttribute('name').endsWith('id')){
      console.log('id',input);
      input.value = '';
    }
    if(input.getAttribute('name').endsWith('description')){
      console.log('desc',input);
      input.value = '';
    } 
    //console.log('hello',input.getAttribute('id').endsWith('id'));
    
  });
  formset.querySelector('#id_biographyfacts_set-TOTAL_FORMS').value = formsetCount + 1;
  formset.querySelector('.formset-row:last-of-type').after(newFormsetRow);
  newFormsetRow.querySelector('.delete-formset-row').addEventListener('click', deleteFormsetRow);
}


addBtn.addEventListener('click', addFormsetRow);
deleteBtns.forEach(btn => {
  btn.addEventListener('click', event => deleteFormsetRow(event)); // pass event as argument
})
//deleteBtns.forEach((btn) => btn.addEventListener('click', deleteFormsetRow));



function deleteFormsetRow(event) {
  const formsetRow = event.target.closest('.formset-row');
  
  const formsetCount = parseInt(formset.querySelector('#id_biographyfacts_set-TOTAL_FORMS').value);
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
 if (formsetCount > 1) {
    const formsetId = formsetRow.lastElementChild.getAttribute('data-formset-id');
      if(formsetId === 'None'){
        formsetRow.remove();
        formset.querySelector('#id_biographyfacts_set-TOTAL_FORMS').value = formsetCount - 1;
        console.log(formsetId);
      }
      else{
        const url = `/delete-facts/${formsetId}/`; // Change this to the URL for deleting the formset
        fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken // You need to set the CSRF token here
          }
      })
      .then(response => {
        console.log(response.status);
        if (response.ok) {
          // The formset was successfully deleted, so remove the corresponding HTML element
          formsetRow.remove();
          formset.querySelector('#id_biographyfacts_set-TOTAL_FORMS').value = formsetCount - 1;
          //window.location.href = `/create_biography/${deceased_url}/`
          console.log('ppc');
          setTimeout(function() {
            location.reload();
          }, 500);
        //var edit = document.getElementById('edit-container');
        //edit.classList.add('show');
        } 
        else {
            // Handle the error if the formset wasn't deleted
            console.log('not deleted.......!');
        }
      })
      .catch(error => {
          // Handle the error if the AJAX request failed
          console.log('ajax request failed!',error);
        
      });
      }
  } 
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
