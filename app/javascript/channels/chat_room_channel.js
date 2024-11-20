import consumer from "channels/consumer"

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-channel-subscribe="room"]').forEach(function (element) {
    var room_id = element.getAttribute('data-room-id');
    var user_id = document.querySelector('#user_id').value;
    var messageTemplate = document.querySelector('[data-role="message-template"]');

    // Smooth scroll to the bottom of the element
    element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
    });

    consumer.subscriptions.create({
      channel: "RoomChannel",
      room: room_id
    }, {
      connected() {
        console.log("Connected to the chat!");
      },
      disconnected() {
        console.log("Disconnected from the chat.");
      },
      received(data) {
        // Clone inside message template and its children

        if(data.user_id != user_id)
        {
          messageTemplate = document.querySelector('[data-role="message-template-second"]');
        }
        else
        {
          messageTemplate = document.querySelector('[data-role="message-template"]');
        }

        var content = messageTemplate.firstElementChild.cloneNode(true);

        // Update content with user data
        content.querySelector('[data-role="user-avatar"]').setAttribute('src', data.user_avatar_url);
        content.querySelector('[data-role="user-data"]').innerHTML += "<br/> " + data.user_name
        content.querySelector('[data-role="message-text"]').textContent = data.message;
        content.querySelector('[data-role="message-date"]').textContent = data.updated_at;

        // Append the updated content to the element
        element.appendChild(content);

        // Scroll the element to the bottom with animation
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
      }
    });
  });

  if (document.querySelector('.rooms.show')) {
    var newRoomMessage = document.querySelector('#new_room_message');

        $('#new_room_message').on('ajax:success', function(a, b,c ) {
          $(this).find('input[type="text"]').val('');
        });

    // newRoomMessage.addEventListener('ajax:success', function (event) {
    //     // Clear all text inputs inside the form
    //     console.log ("ajax success")
    //     newRoomMessage.querySelectorAll('input[type="text"]').forEach(function (input) {
    //         input.value = '';
    //     });
    // });
  }
});