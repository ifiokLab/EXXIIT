
from django.db.models import Max
def Chat(request):
    #message = Message.objects.all()
    latest_messages = Message.objects.filter(
        models.Q(sender=request.user) | models.Q(receiver=request.user)
    ).values('sender', 'receiver').annotate(latest=Max('created_at'))

    conversations = []
    for message in latest_messages:
        sender_id = message['sender']
        receiver_id = message['receiver']

        # Fetch the most recent message for this conversation
        conversation_message = Message.objects.filter(
            (models.Q(sender_id=sender_id) & models.Q(receiver_id=receiver_id)) |
            (models.Q(sender_id=receiver_id) & models.Q(receiver_id=sender_id))
        ).latest('created_at')

        conversations.append(conversation_message)

    return render(request,'listings/chat.html',{"message":conversations})




def view_conversation(request, sender_id, receiver_id):
    print('44',sender_id, receiver_id)
    # Fetch messages for the conversation
    messages = Message.objects.filter(
        (models.Q(sender_id=sender_id) & models.Q(receiver_id=receiver_id)) |
        (models.Q(sender_id=receiver_id) & models.Q(receiver_id=sender_id))
    ).order_by('created_at')

    # Collect message IDs and their corresponding files
    message_files_dict = {}
    message_files = MessageFiles.objects.filter(message__in=messages)
    for message_file in message_files:
        message_id = message_file.message.id
        if message_id not in message_files_dict:
            message_files_dict[message_id] = []
        message_files_dict[message_id].append(message_file.file.url)

    conversation_data = []
    for message in messages:
        data = {
            'sender': message.sender.first_name,
            'receiver': message.receiver.first_name,
            'content': message.content,
            'senderId': message.sender.id,
            'currentuserId': request.user.id,
            'listingImage': message.listing.featured_image.url,
            'listingTitle': message.listing.title,
            'listingPrice': message.listing.price,
            'listingId': message.listing.id,
            'created_at': message.formatted_created_at(),  # Format the timestamp as a string
        }

        # Check if the current message has associated files
        message_id = message.id
        if message_id in message_files_dict:
            data['files'] = message_files_dict[message_id]

        conversation_data.append(data)
        print(conversation_data)

    # Return the data as JSON response
    return JsonResponse(conversation_data, safe=False)



def sendMessage(request):
    if request.user.is_authenticated:
        print(request.POST)
        if request.method == 'POST':
            receiver = myuser.objects.get(id = request.POST['recieverId'])
            listing = Listing.objects.get(id=request.POST['listingId'])
            message = Message.objects.create(listing=listing, sender=request.user, receiver=receiver,content=request.POST['user-message'])

            files = request.FILES.getlist('messagefiles')
            if files:
                for file in files:
                    MessageFiles.objects.create(message=message, file=file)

            messages = Message.objects.filter(
                (models.Q(sender_id=request.user.id) & models.Q(receiver_id=listing.owner.id)) |
                (models.Q(sender_id=listing.owner.id) & models.Q(receiver_id=request.user.id))
            ).order_by('created_at')

            # Collect message IDs and their corresponding files
            message_files_dict = {}
            message_files = MessageFiles.objects.filter(message__in=messages)
            for message_file in message_files:
                message_id = message_file.message.id
                if message_id not in message_files_dict:
                    message_files_dict[message_id] = []
                message_files_dict[message_id].append(message_file.file.url)

            conversation_data = []
            for message in messages:
                data = {
                    'sender': message.sender.first_name,
                    'receiver': message.receiver.first_name,
                    'content': message.content,
                    'senderId': message.sender.id,
                    'currentuserId': request.user.id,
                    'listingImage': message.listing.featured_image.url,
                    'listingTitle': message.listing.title,
                    'listingPrice': message.listing.price,
                    'listingId': message.listing.id,
                    'created_at': message.formatted_created_at(),  # Format the timestamp as a string
                }

                # Check if the current message has associated files
                message_id = message.id
                if message_id in message_files_dict:
                    data['files'] = message_files_dict[message_id]

                conversation_data.append(data)
                #print(conversation_data)

            return JsonResponse({'status': 'success', 'message': 'Message sent!', 'conversation_data': conversation_data})
    else:
        return JsonResponse({'status': 'error', 'message': 'Authentication required.'})









##consumer
# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, Listing

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender = self.scope['user']
        self.receiver_id = self.scope['url_route']['kwargs']['receiver_id']
        self.receiver = await self.get_receiver()

        if self.receiver:
            self.room_name = f'chat_{self.sender.id}_{self.receiver.id}'
            self.room_group_name = f'chat_{self.sender.id}_{self.receiver.id}_group'

            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        await self.save_message(message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': self.sender.id,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
        }))

    async def get_receiver(self):
        # Implement the logic to retrieve the receiver based on receiver_id
        # You can use the provided model to fetch the receiver instance
        try:
            receiver_id = int(self.receiver_id)
            receiver = myuser.objects.get(id=receiver_id)
            return receiver
        except myuser.DoesNotExist:
            return None

    async def save_message(self, message):
        # Implement the logic to save the message in the database
        # You can use the provided Message model to save the message
        # Don't forget to set the sender, receiver, and content fields of the Message model
        if self.receiver:
            Message.objects.create(
                sender=self.sender,
                receiver=self.receiver,
                content=message
            )
