
var form = document.getElementById("chat-wrapper");
//listing detail form
form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var listingId = document.querySelector('#listingId').value;
        var messageValue = document.getElementById("user-message").value;
         var recieverId = document.getElementById("recieverId").value;

        var message = messageInput.value.trim(); // Remove leading and trailing whitespaces

        if (message === "") {
              document.getElementById("error-message").style.display = 'block';
              return;
        }
        else{
            const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
            xhr.open('POST', `/send-message/`); // Set up the request
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header
            xhr.setRequestHeader('X-CSRFToken', csrftoken);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);
                    if (response.status === "success") {
                        document.getElementById("chat-wrapper").style.display = "none";
                        document.getElementById("start-message").style.display = "block";
                        document.querySelector('.message-status').style.display = "block";
                        messageInput.value = "";

                    }
                    else {
                        console.log(response.message);
                        //window.location.href = '/customer-login/';

                    }

                }
                else {
                // Request failed
                    console.error(`Server returned status ${xhr.status}`);
                }

            }


            var data = encodeURI('listingId=' + listingId + '&user-message=' +  messageValue  + '&recieverId=' +  recieverId);
            xhr.send(data);
        }




});
