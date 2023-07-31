




    function createAutocomplete() {
      // Create the autocomplete input field
      var input = document.getElementById('search-bar');
      input.setAttribute('autocomplete', 'off');
      input.addEventListener('input', function() {
          var dropdown = document.querySelector('.autocomplete-dropdown');
          if (dropdown) {
              dropdown.parentNode.removeChild(dropdown);
          }
        var query = input.value;
        // Make an AJAX call to retrieve the suggestions
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/search-users/?q=' + query);
        xhr.onload = function() {
          if (xhr.status === 200) {
            // Process the AJAX response to get the suggestions
            var data = JSON.parse(xhr.responseText);
            var suggestions = data.map(function(item) {
              console.log('item',item);
              return {
                first_name: item.first_name,
                last_name: item.last_name,
                id: item.id,
              };
            });
            // Display the suggestions
            console.log(suggestions);
            //displaySuggestions(suggestions);
            if (query !== '') { // Only display dropdown if query is not empty
              displaySuggestions(suggestions);
            }
          }
          else {
              // Display an error message if there was an error with the AJAX request
              showError('Error: ' + xhr.statusText);
          }
        };
        xhr.send();
      });
      
      // Function to display the suggestions in a dropdown list
      function displaySuggestions(suggestions) {
        var dropdown = document.createElement('div');
        dropdown.classList.add('autocomplete-dropdown');
        for (var i = 0; i < suggestions.length; i++) {
          var item = document.createElement('div');
          item.classList.add('autocomplete-item');
          item.innerText = suggestions[i].first_name;
          item.setAttribute('data-id', suggestions[i].id);
          item.addEventListener('click', function() {
            // When a suggestion is selected, update the search bar with the selected value
            document.getElementById('user').value = this.getAttribute('data-id');
            input.value = this.innerText;
            // Perform search with the selected value
            search(this.getAttribute('data-id'));
            // Clear the suggestions dropdown
            dropdown.parentNode.removeChild(dropdown);
          });
          dropdown.appendChild(item);
        }
        // Add the dropdown to the page
        input.parentNode.appendChild(dropdown);
      }
    }
    
    // Function to perform search with the selected value
    function search(value) {
      // Perform search using the selected value
      console.log('Searching for user with ID: ' + value);
    }
    function showError(message) {
      var errorContainer = document.getElementById('messages');
      
      errorContainer.innerText = message;
    }
    
    // Create the search bar autocomplete
    createAutocomplete();






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


