from django.shortcuts import render,redirect
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login
from django.db.models import Q
from django.contrib import messages
from django.db.models import Count, Sum
from django.views.decorators.csrf import csrf_exempt
import stripe
from django.conf import settings
import os
#from sendgrid import SendGridAPIClient
#from sendgrid.helpers.mail import Mail
from django.contrib.auth.forms import UserCreationForm, UserChangeForm,AuthenticationForm

# Create your views here.

def search_memorials(request):
    query = request.GET.get('q')

    if query:
        results = Deceased.objects.filter(Q(first_name__icontains=query) | Q(last_name__icontains=query) | Q(location__icontains=query))

    else:
        results = []
    return render(request, 'FuneralApp/search-memorial.html', {'results': results,'query':query})

def recent_memorial(request):
    if request.user.is_authenticated:
        if Wallet.objects.filter(user=request.user).exists():
            wallet = Wallet.objects.get(user=request.user)
        else:
            wallet = Wallet.objects.create(user=request.user)

    data = Biography.objects.all()
    gift = Gift.objects.all()
    return render(request,'FuneralApp/recent-memorial.html',{'data':data,'gift':gift})


def Auth_memorial(request):
    data = Biography.objects.all()
    return render(request,'FuneralApp/auth-memorial.html',{'data':data})


def register(request,pk):
    deceased = Deceased.objects.get(id = pk)
    if request.method == 'POST':
        form = UserForm(request.POST)

        if form.is_valid():
            form_user = form.save()

            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email = email,password = raw_password)

            deceased.user = form_user
            deceased.save()
            login(request,user)
            print(user)

            return redirect('memorials')
    else:
        form = UserForm()
    return render(request,'FuneralApp/signup.html',{'form':form})



def SignUp(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email = email,password = raw_password)
            login(request,user)
            return redirect('memorials')
    else:
        form = UserForm()
    return render(request,'FuneralApp/signup.html',{'form':form})

import random
import string
from django.core.mail import send_mail

def generate_token():
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(32))


@login_required(login_url='auth_memorial')
def create_event(request):
    if request.method == 'POST':
        ceremony_type = request.POST['celebration_type']
        #user = request.POST['user']
        deceased = Deceased.objects.get(id = request.POST['deceased'])
        description= request.POST['description']
        date= request.POST['date']
        location = request.POST['location']
        streaming_link = request.POST['streaming_link']

        host_image = request.FILES['host_image']
        print(host_image)

        data = Event.objects.create(
            celebration_type = ceremony_type,
            user = request.user,
            deceased = deceased,
            description = description,
            date = date,
            location = location,
            streaming_link = streaming_link,
            host_image = host_image,
        )
        data.save()
        messages.success(request, 'Event created successfully!.')
    else:
        form = EventForm()
    return JsonResponse({'status': 'ok'})

@login_required(login_url='auth_memorial')
def edit_event(request,pk):
    event = Event.objects.get(id = pk)
    deceased = Deceased.objects.get(id = event.deceased.id)
    if request.method == 'POST':
        form = EventForm(request.POST,instance=event)
        if form.is_valid():
            form.save()
            return redirect('create_biography' ,pk = deceased.id)
            #return redirect('create_biography',deceased.id)
    else:
        form = EventForm(instance=event)

    return render(request,'FuneralApp/edit-event.html',{'EventForm':form,'event':event,'deceased':deceased})


@login_required(login_url='auth_memorial')
def delete_event(request, eventId):
    event = Event.objects.get(id=eventId)
    print(event)
    event.delete()
    return JsonResponse({'message': 'Formset deleted successfully.'})




'''
@login_required
def invite_contributor(request):
    if request.method == 'POST':
        email = request.POST['email']
        name = request.POST['name']
        invitation_token = generate_token()
        contributor = Contributor(email=email,name = name, invitation_token=invitation_token, invited_by=request.user)
        contributor.save()
        invite_url = request.build_absolute_uri(reverse('register_contributor') + '?token=' + invitation_token)
        send_mail(
            'Invitation to memorial app',
            f'You have been invited to contribute to a memorial on our app. To accept the invitation, please register using this link: {invite_url}',
            'ifiokudoh77@gmail.com',
            [email],
            fail_silently=False,
        )
        return redirect('invite_contributor')
    else:
        return render(request, 'invite_contributor.html')

'''
from django.conf import settings


@login_required(login_url='auth_memorial')
def invite_contributor(request):

    if request.method == 'POST':

        email = request.POST['email']
        name = request.POST['name']
        memorials =request.POST['memorials']
        deceased = Deceased.objects.get(id = memorials)
        print(deceased)
        invitation_token = generate_token()
        contributor = Contributor(email=email,name = name, invitation_token=invitation_token, invited_by=request.user,memorials = deceased)
        contributor.save()
        invite_url = request.build_absolute_uri(reverse('register_contributor') + '?token=' + invitation_token)


        send_mail(
            'Invitation to memorial app',
            f'You have been invited to contribute to a memorial on our app. To accept the invitation, please register using this link: {invite_url}',
            'ifiokudoh77@gmail.com',
            [email],
            fail_silently=False,
        )
    return JsonResponse({'status': 'ok'})


'''@login_required
def invite_contributor(request):
    if request.method == 'POST':
        email = request.POST['email']
        name = request.POST['name']
        memorials =request.POST['memorials']
        deceased = Deceased.objects.get(id = memorials)
        print(deceased)
        invitation_token = generate_token()
        contributor = Contributor(email=email,name = name, invitation_token=invitation_token, invited_by=request.user,memorials = deceased)
        contributor.save()
        invite_url = request.build_absolute_uri(reverse('register_contributor') + '?token=' + invitation_token)

        print(email)
        message = Mail(
            from_email='ifiokudoh77@gmail.com',
            to_emails= [email],
            subject='Invitation to memorial app',
            html_content=f'<strong>You have been invited to contribute to a memorial on our app. To accept the invitation, please register using this link: {invite_url}</strong>'
            )
        messages.success(request, 'Email has been sent successfully!.')
        try:
            sg = SendGridAPIClient('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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.message)
    return JsonResponse({'status': 'ok'})
'''


def register_contributor(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            token = request.GET.get('token')
            contributor = Contributor.objects.get(invitation_token=token)
            #contributor.save()
            user = form.save()

            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email = email,password = raw_password)
            login(request,user)
            contributor.contributor_user = user
            contributor.save()
            return redirect('home')
    else:
        form = UserForm()
    return render(request, 'FuneralApp/signup.html', {'form': form})





def home(request):
    return render(request,'FuneralApp/home.html')




from django.contrib.auth.views import LoginView
from allauth.account.forms import LoginForm
class Login(LoginView):
    template_name = 'FuneralApp/login.html'
    form_class = LoginForm

from django.contrib.auth import logout
def Logout(request):
    logout(request)
    return redirect('account_logout')


def create_memorial(request):
    if request.method == 'POST':
        form = DeceasedForm(request.POST)
        print(request.POST, request.FILES,form.errors)
        if form.is_valid():
            print(request.user.is_authenticated)
            if request.user.is_authenticated:
                data = form.save()
                deceased = Deceased.objects.get(id = data.id)
                deceased.user = request.user
                deceased.save()
                return redirect('memorials')
            else:
                data = form.save()
                return redirect('register',data.id)



    else:
        form = DeceasedForm()
    return render(request, 'FuneralApp/memorial.html', {'form': form})


#@login_required(login_url='login')
def create_biography(request,pk):
    deceased = Deceased.objects.get(id = pk)
    recent_bio = Biography.objects.all()
    #new
    current_user = deceased.user
    post = Post.objects.filter(author = current_user)

    if request.user.is_authenticated and Profile.objects.filter(user = request.user).exists() :
        #f_profile = Profile.objects.get(user = request.user)
        if Profile.objects.filter(user = current_user).exists():
            f_profile = Profile.objects.get(user = current_user)
            #print('sssr',f_profile.followers.filter(id =request.user.id).exists())
            is_following = f_profile.followers.filter(id =request.user.id).exists()

        else:
            Profile.objects.create(user = current_user)
            f_profile = Profile.objects.get(user = current_user)
            is_following = f_profile.followers.filter(id =request.user.id).exists()

    else:
        is_following = False



    if Profile.objects.filter(user = current_user).exists():
        profile = Profile.objects.get(user =current_user)
        followers_count = profile.followers.count()
            # Count the number of followings
        followings_count = profile.user.following.count()
        print('hkkkk',profile.followers.all())
    else:
        Profile.objects.create(user = current_user)
        profile = Profile.objects.get(user =current_user)
        #profile = False
        followers_count = profile.followers.count()
        followings_count = profile.user.following.count()









    #deceased = Deceased.objects.get(id = pk,user = request.user)

    age = deceased.year_death - deceased.year_birth
    total_likes = PhotoAlbum.objects.filter(deceased=deceased).annotate(num_likes=Count('likes')).aggregate(total_likes=Sum('num_likes'))['total_likes']
    num_comments = Comments.objects.filter(photo__deceased = deceased).count()
    num_tributes = Tribute.objects.filter(deceased = deceased).count()
    event = Event.objects.filter(deceased = deceased.id).exists()
    event_list = Event.objects.filter(deceased = deceased.id)
    #if event:
        #event_list = Event.objects.filter(deceased = deceased.id)
        #event_parent = Event.objects.filter(deceased = deceased.id)
    #else:
        #event_list = ''
    #parent = Biography.objects.get(user = request.user,deceased = deceased.id)
    try:
        user_candle = Candle.objects.filter(user=request.user,deceased = deceased).exists()
    except:
        user_candle = False
    else:
        user_candle = Candle.objects.filter(user=request.user,deceased = deceased).exists()
    biography_facts = ''
    parent = ''
    album = ''
    candle_list = Candle.objects.filter(deceased = deceased.id,lit=True)
    try:
        album = PhotoAlbum.objects.filter(deceased = deceased.id)
    except:
        print('no album!')
    else:
        album =  PhotoAlbum.objects.filter(deceased = deceased.id).order_by('date')

    try:
        #parent = Biography.objects.get(user = request.user,deceased = deceased.id)
        #biography_facts = BiographyFacts.objects.filter(user = request.user,deceased = deceased.id)
        parent = Biography.objects.get(deceased = deceased.id)
        biography_facts = BiographyFacts.objects.filter(deceased = deceased.id)
    except:
        print('doenst exist..')
    else:
        parent = Biography.objects.get(deceased = deceased.id)
        biography_facts = BiographyFacts.objects.filter(deceased = deceased.id)

    contributor_count = 0
    try:
        contributor_count = Contributor.objects.filter(memorials = pk).count()
    except:
        print('doenst exist..')
    else:
        contributor_count = Contributor.objects.filter(memorials = pk).count()

    try:
        contributor_count = Contributor.objects.filter(memorials = pk).count()
    except:
        print('doenst exist..')
    else:
        contributor_count = Contributor.objects.filter(memorials = pk).count()
    if Relationship.objects.filter(deceased = deceased).exists():
       relationship = Relationship.objects.filter(deceased = deceased)
    else:
        relationship = []
    if request.method == 'POST':
        if parent:
            form = BiographyForm(request.POST,request.FILES,instance=parent)
        else:
            form = BiographyForm(request.POST,request.FILES)


        if form.is_valid():
            form.save()
            messages.success(request, 'Your data has been saved.')
            return redirect('create_biography' ,pk = deceased.id)
    else:
        if parent:
            form = BiographyForm(instance=parent)
        else:
            form = BiographyForm()


    return render(request, 'FuneralApp/biography.html', {'recent_bio':recent_bio,'followings_count':followings_count,'followers_count':followers_count,'profile':profile,'current_user':current_user,'age':age,'relationship': relationship,'candle_list':candle_list,'user_candle':user_candle,'deceased':deceased,'biography_facts':biography_facts,'form':form,'parent':parent,'album':album,'inviteForm':ContributorForm,'contributor_count':contributor_count,'EventForm':EventForm,'event_list':event_list,'num_comments': num_comments,'num_tributes': num_tributes,'total_likes':total_likes})





#@login_required(login_url = 'login')
def DeceasedList(request):

    memorials = ''
    data = ''
    try:
        data =  Deceased.objects.filter(user = request.user)
    except:
        print('doesnt exist')
    else:
        data =  Deceased.objects.filter(user = request.user)
    try:
        contributor = Contributor.objects.get(contributor_user = request.user)
    except:
        print('doesnt exist')
    else:
        contributor = Contributor.objects.get(contributor_user = request.user)
        memorials = contributor.memorials


    return render(request, 'FuneralApp/deceased-list.html', {'data': data,'memorials':memorials})




from django.db import transaction
@login_required(login_url='auth_memorial')
def create_photo(request,pk):
    #deceased = Deceased.objects.get(id = pk,user = request.user)
    deceased = Deceased.objects.get(id = pk)


    if request.method == 'POST':
        formset =  PhotosFormset(request.POST, request.FILES,instance=deceased)#,instance=deceased

        if formset.is_valid():
            formset.save()
            #return redirect('home')
            messages.success(request, 'Your data has been saved.')
            return redirect('create_biography' ,pk = deceased.id)
    else:
        formset =  PhotosFormset(initial=[{'user': request.user,}],instance=deceased)#
        #formset = FactsFormset(queryset=biography, initial=[{'user': request.user,'deceased':deceased.id}])# for deceased in biography
    return render(request, 'FuneralApp/create-photo.html', {'formset': formset,'deceased':deceased,})


@login_required(login_url='auth_memorial')
def delete_photo(request, formset_id):

    formset = PhotoAlbum.objects.get(id=formset_id)
    formset.delete()
    return JsonResponse({'message': 'Formset deleted successfully.'})



@login_required(login_url='auth_memorial')
def create_facts(request,pk):
    #deceased = Deceased.objects.get(id = pk,user = request.user)
    deceased = Deceased.objects.get(id = pk)

    if request.method == 'POST':
        formset =  FactsFormset(request.POST, request.FILES,instance=deceased)#,instance=deceased
        if formset.is_valid():
            formset.save()
            #return redirect('home')
            messages.success(request, 'Your data has been saved.')
            return redirect('create_biography' ,pk = deceased.id)
    else:
        formset =  FactsFormset(instance=deceased,initial=[{'user': request.user,}])#
        #formset = FactsFormset(queryset=biography, initial=[{'user': request.user,'deceased':deceased.id}])# for deceased in biography
    return render(request, 'FuneralApp/biography-facts.html', {'formset': formset,'deceased':deceased,})



from django.http import JsonResponse
@login_required(login_url='auth_memorial')
def delete_facts(request, formset_id):

    formset = BiographyFacts.objects.get(id=formset_id)
    print('hello',formset)
    formset.delete()
    return JsonResponse({'message': 'Formset deleted successfully.'})



from django.shortcuts import get_object_or_404
#@login_required(login_url='login')
def add_tribute(request, deceasedId):
    deceased = get_object_or_404(Deceased, id=deceasedId)
    if request.user.is_authenticated:
        if request.method == 'POST':
            comment_content = request.POST['comment_content']
            parent_reply_id = request.POST['parent_reply_id']  # Get the parent reply ID from the form
            if parent_reply_id:  # If parent reply ID is present, it's a reply to a reply
                parent_reply = get_object_or_404(TributeReply, id=parent_reply_id)
                reply = TributeReply(tribute=parent_reply.tribute, text=comment_content, user=request.user, parent=parent_reply)
                reply.save()
            else:  # It's a new comment or a reply to a comment
                comment_id = request.POST.get('comment_id')  # Get the comment ID from the form

                if comment_id:  # If comment ID is present, it's a reply to a comment
                    comment = get_object_or_404(Tribute, id=comment_id)
                    reply = TributeReply(tribute=comment, text=comment_content, user=request.user)
                    reply.save()

                else:  # It's a new comment
                    comment = Tribute(deceased=deceased, text=comment_content, user=request.user)
                    comment.save()
            return JsonResponse({'status': 'ok'})
    else:
       return JsonResponse({'error': 'Unauthorized'}, status=500)


def list_tribute(request, deceasedId):
    comments = Tribute.objects.filter(deceased_id=deceasedId)
    deceased = Deceased.objects.get(id = deceasedId)
    reply_count = TributeReply.objects.filter(tribute__deceased=deceased).count()
    comments_data = []

    for comment in comments:
        profile = Profile.objects.filter(user = comment.user).exists()

        if comment.likes.filter(id=request.user.id).exists():
            liked  = True
        else:
            liked = False
        if comment.heart.filter(id=request.user.id).exists():
            heart  = True
        else:
            heart = False

        if profile:
            if comment.user.profile.image:
                image = comment.user.profile.image.url
            else:
                image = '/static/images/ribbon.png'
        else:
            image = '/static/images/ribbon.png'


        comment_data = {
            'liked': liked,
            'count_likes': comment.likes.count(),
            'heart': heart,
            'count_heart': comment.heart.count(),
            'text': comment.text,
            'first_name': comment.user.first_name,
            'last_name': comment.user.last_name,
            'date': comment.get_time_since_comment(),
            'comment_id': comment.id,
            'login_user': request.user.id,
            'comment_by': comment.user.id,
            'replies': [],
            'image':image,
            'tribute_count': reply_count + comments.count()
        }

        replies = TributeReply.objects.filter(tribute=comment)

        for reply in replies:

            if reply.likes.filter(id=request.user.id).exists():
                liked  = True
            else:
                liked = False
            if reply.heart.filter(id=request.user.id).exists():
                heart  = True
            else:
                heart = False
            reply_data = {
                'liked': liked,
                'count_likes': reply.likes.count(),
                'heart': heart,
                'count_heart': reply.heart.count(),
                'text': reply.text,
                'first_name': reply.user.first_name,
                'last_name': reply.user.last_name,
                'date': reply.get_time_since_comment(),
                'reply_id': reply.id,
                'login_user': request.user.id,
                'reply_by': reply.user.id
            }
            comment_data['replies'].append(reply_data)

        comments_data.append(comment_data)

    return JsonResponse(comments_data, safe=False)



#@login_required(login_url='login')
def delete_tribute(request,commentId):
    if request.user.is_authenticated:
        if request.method == 'POST':
            #comment = Comments.objects.get(id=commentId, user=request.user)

            tribute = Tribute.objects.get(id=commentId)
            tribute.delete()
            return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse(status=500)


@login_required(login_url='login')
def delete_tribute_reply(request, replyId):
    if request.method == 'POST':
        print('replyid',replyId)
        try:
            reply = TributeReply.objects.get(id=replyId)
        except TributeReply.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Reply does not exist.'}, status=404)
        reply.delete()


    return JsonResponse({'status': 'ok'})


#@login_required(login_url='login')

def add_comment(request, photoId):
    photo = get_object_or_404(PhotoAlbum, id=photoId)

    if request.user.is_authenticated:
        if request.method == 'POST':
            print(request.POST)
            comment_content = request.POST['comment_content']
            parent_reply_id = request.POST['parent_reply_id']  # Get the parent reply ID from the form

            if parent_reply_id:  # If parent reply ID is present, it's a reply to a reply
                print('yes')
                parent_reply = get_object_or_404(CommentReply, id=parent_reply_id)
                reply = CommentReply(comment=parent_reply.comment, text=comment_content, user=request.user, parent=parent_reply)
                reply.save()
            else:  # It's a new comment or a reply to a comment
                comment_id = request.POST.get('comment_id')  # Get the comment ID from the form
                print('hurray',comment_id)
                if comment_id:  # If comment ID is present, it's a reply to a comment
                    comment = get_object_or_404(Comments, id=comment_id)
                    reply = CommentReply(comment=comment, text=comment_content, user=request.user)
                    reply.save()
                    print('done')
                else:  # It's a new comment
                    comment = Comments(photo=photo, text=comment_content, user=request.user)
                    comment.save()


            return JsonResponse({'status': 'ok'})
    else:
       return JsonResponse({'error': 'Unauthorized'}, status=500)

def photo_comments(request, photo_id):
    comments = Comments.objects.filter(photo_id=photo_id)
    photo = PhotoAlbum.objects.get(pk=photo_id)
    # Count the comments for the photo
    comment_count = Comments.objects.filter(photo=photo).count()
    # Count the replies for the photo
    reply_count = CommentReply.objects.filter(comment__photo=photo).count()
    comments_data = []

    for comment in comments:
        profile = Profile.objects.filter(user = comment.user).exists()

        if comment.likes.filter(id=request.user.id).exists():
            liked  = True
        else:
            liked = False
        if comment.heart.filter(id=request.user.id).exists():
            heart  = True
        else:
            heart = False

        if profile:
            if comment.user.profile.image:
                image = comment.user.profile.image.url
            else:
                image = '/static/images/ribbon.png'
        else:
            image = '/static/images/ribbon.png'


        comment_data = {
            'liked': liked,
            'count_likes': comment.likes.count(),
            'heart': heart,
            'count_heart': comment.heart.count(),
            'text': comment.text,
            'first_name': comment.user.first_name,
            'last_name': comment.user.last_name,
            'date': comment.get_time_since_comment(),
            'comment_id': comment.id,
            'login_user': request.user.id,
            'comment_by': comment.user.id,
            'replies': [],
            'image':image,
             'comment_count':reply_count + comment_count,
        }

        replies = CommentReply.objects.filter(comment=comment)

        for reply in replies:

            if reply.likes.filter(id=request.user.id).exists():
                liked  = True
            else:
                liked = False
            if reply.heart.filter(id=request.user.id).exists():
                heart  = True
            else:
                heart = False
            reply_data = {
                'liked': liked,
                'count_likes': reply.likes.count(),
                'heart': heart,
                'count_heart': reply.heart.count(),
                'text': reply.text,
                'first_name': reply.user.first_name,
                'last_name': reply.user.last_name,
                'date': reply.get_time_since_comment(),
                'reply_id': reply.id,
                'login_user': request.user.id,
                'reply_by': reply.user.id
            }
            comment_data['replies'].append(reply_data)

        comments_data.append(comment_data)

    return JsonResponse(comments_data, safe=False)



def like_list(request, photoId):
    photo = PhotoAlbum.objects.get(id=photoId)
    reply_count = CommentReply.objects.filter(comment__photo=photo).count()
    comments = Comments.objects.filter(photo_id=photoId).count()
    tributes_num = Tribute.objects.filter(deceased_id=photo.deceased.id).count()
    gift = Gift.objects.filter(recipient= photo.deceased)

    deceased = Deceased.objects.get(id = photo.deceased.id)
    followers = deceased.followers.count()
    tribute_reply  = TributeReply.objects.filter(tribute__deceased=deceased).count()
    if photo.likes.filter(id=request.user.id).exists():
        #liked = False
        liked = True
    else:
        liked = False

    if deceased.followers.filter(id=request.user.id).exists():
        #liked = False
        followed = True
    else:
        followed = False
    data = {
        'followed':followed,
        'followers':followers,
        'liked': liked,
        'count': photo.likes.count(),
        'comment_count':reply_count + comments,
        'tributes_num':tributes_num + tribute_reply,
        'gift_num':gift.count(),
    }
    return JsonResponse(data)

@login_required(login_url='auth_memorial')
def delete_comment(request,commentId):
    if request.method == 'POST':
        #comment = Comments.objects.get(id=commentId, user=request.user)

        comment = Comments.objects.get(id=commentId)
        comment.delete()

    return JsonResponse({'status': 'ok'})




#@login_required(login_url='login')
def like_photo(request,photoId):

    if request.method == 'POST':
        photo = PhotoAlbum.objects.get(id=photoId)
        if photo.likes.filter(id=request.user.id).exists():
            print(photo.likes.remove(request.user))
            photo.likes.remove(request.user)

            liked = False
        else:
            print(photo.likes.add(request.user))
            photo.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': photo.likes.count(),
        }
        return JsonResponse(data)

@login_required(login_url='auth_memorial')
def like_cover(request,photoId):
    if request.method == 'POST':
        photo = Biography.objects.get(id=photoId)

        if photo.likes.filter(id=request.user.id).exists():
            print(photo.likes.remove(request.user))
            photo.likes.remove(request.user)

            liked = False
        else:
            print(photo.likes.add(request.user))
            photo.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': photo.likes.count(),

        }
    return JsonResponse(data)


def cover_like_list(request, photoId):
    photo = Biography.objects.get(id=photoId)
    gift = Gift.objects.filter(recipient= photo.deceased)
    tributes_num = Tribute.objects.filter(deceased_id=photo.deceased.id).count()
    deceased = Deceased.objects.get(id = photo.deceased.id)
    followers = deceased.followers.count()
    tribute_reply  = TributeReply.objects.filter(tribute__deceased=deceased).count()

    if photo.likes.filter(id=request.user.id).exists():
        #liked = False
        liked = True
    else:
        liked = False

    if deceased.followers.filter(id=request.user.id).exists():
        #liked = False
        followed = True
    else:
        followed = False

    data = {
        'followed':followed,
        'followers':followers,
        'liked': liked,
        'count': photo.likes.count(),
        'tributes_num': tributes_num + tribute_reply,
        'gift_num':gift.count(),
    }
    return JsonResponse(data)




@login_required(login_url='auth_memorial')
def account(request,pk):
    user = myuser.objects.get(id = pk)
    profile = Profile.objects.filter(user = request.user).exists()

    if request.method == 'POST':
        if profile:
            profile = Profile.objects.get(user = request.user)
            form1 = ProfileForm(request.POST,request.FILES,instance=profile)
        else:
            form1 = ProfileForm(request.POST,request.FILES)
        if form1.is_valid():
            form1.save()
            #form2.save()
            messages.success(request, 'Your data has been saved.')

    else:
        if profile:
            profile = Profile.objects.get(user = request.user)
            form1 = ProfileForm(instance=profile)
        else:
            form1 = ProfileForm()

    return render(request,'FuneralApp/account.html',{'form1':form1,'user':user,'profile':profile})





def waitlist(request):
    form = waitlistForm()
    return render(request,'FuneralApp/wait-list.html',{'form':form})


def waitlist_form(request):
    if request.method == 'POST':
        print(request.POST)
        form = waitlistForm(request.POST)
        print(form.is_valid())
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors})




def light_candle(request):
    if request.method == 'POST':
        print(request.POST.get('deceased'))
        deceased = Deceased.objects.get(id = request.POST.get('deceased'))
        candle = Candle.objects.create(user=request.user, deceased=deceased, lit=True)
        data = {'candle_id': candle.id}
        return JsonResponse(data)






def show_candle(request,name,pk):
    print(pk)
    deceased = Deceased.objects.get(id = pk)
    return render(request,'FuneralApp/candle.html',{'deceased':deceased})



def add_relationship(request,pk):
    deceased = Deceased.objects.get(id  = pk)

    if request.method == 'POST':
        form = RelationshipForm(request.POST)

        if form.is_valid():
            print('status:',Relationship.objects.filter(user__id=request.POST['user'], deceased=deceased).exists())
            if Relationship.objects.filter(user__id=request.POST['user'], deceased=deceased).exists():
                family = Relationship.objects.get(user__id = request.POST['user'])
                messages.error(request, f"{family.user} is already added to family & friends!")
            else:
                form.save()
                family = Relationship.objects.get(user__id = request.POST['user'])
                messages.success(request, f"Successfully added {family.user} to family & friends!")
                return redirect('create_biography' ,pk = deceased.id)
    else:
        form = RelationshipForm()

    return render(request,'FuneralApp/family.html',{'form':form,'deceased':deceased})



def search_users(request):
    query = request.GET.get('q', '')
    print( query)
    users = myuser.objects.filter(Q(first_name__icontains=query) | Q(last_name__icontains=query)).values('id', 'first_name','last_name')

    return JsonResponse(list(users), safe=False)







@login_required(login_url='account_login')
def User_Profile(request,pk,name):
    current_user = myuser.objects.get(id = pk)
    post = Post.objects.filter(author = current_user)
    print('hh', current_user.email)

    if Profile.objects.filter(user = request.user).exists():
        #f_profile = Profile.objects.get(user = request.user)
        if Profile.objects.filter(user = current_user).exists():
            f_profile = Profile.objects.get(user = current_user)
            #print('sssr',f_profile.followers.filter(id =request.user.id).exists())
            is_following = f_profile.followers.filter(id =request.user.id).exists()

        else:
            Profile.objects.create(user = current_user)
            f_profile = Profile.objects.get(user = current_user)
            is_following = f_profile.followers.filter(id =request.user.id).exists()

    else:
        is_following = False



    if Profile.objects.filter(user = current_user).exists():
        profile = Profile.objects.get(user =current_user)
        followers_count = profile.followers.count()
            # Count the number of followings
        followings_count = profile.user.following.count()
        print('hkkkk',profile.followers.all())
    else:
        Profile.objects.create(user = current_user)
        profile = Profile.objects.get(user =current_user)
        #profile = False
        followers_count = profile.followers.count()
        followings_count = profile.user.following.count()



    if request.method == 'POST':
        form = PostForm(request.POST,request.FILES)
        print(form.errors)
        if form.is_valid():
            print('valid')
            form.save()

    else:
        form = PostForm()

    return render(request,'FuneralApp/profile.html',{'post':post,'form': form,'followings_count':followings_count,'followers_count':followers_count,'current_user':current_user,'profile':profile,'is_following':is_following})


@login_required
def follow_user(request, pk):
    user_to_follow = myuser.objects.get(id = pk)
    profile = Profile.objects.get(user=user_to_follow)

    if request.user == user_to_follow:
        #messages.success(request, "You cannot follow yourself!")
        return JsonResponse({'status': 'error'})

    if request.user in profile.followers.all():
        profile.followers.remove(request.user)
        return JsonResponse({'status': 'unfollowed'})
    else:
        profile.followers.add(request.user)
        if not Profile.objects.filter(user = request.user).exists():
            Profile.objects.create(user = request.user)
            print('profile created!')
            print(request.user)


        return JsonResponse({'status': 'followed'})





def follow_deceased(request, deceasedId):

    if request.user.is_authenticated:
        profile = Deceased.objects.get(id = deceasedId)

        if request.user in profile.followers.all():
            profile.followers.remove(request.user)
            status = 'unfollowed'

        else:
            profile.followers.add(request.user)
            status = 'followed'

        followers_count = profile.followers.count()

        return JsonResponse({'status': status, 'followers_count': followers_count})
    else:

        return JsonResponse({'status': 'error'})



def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')  # Redirect to the desired page after successful post creation
    else:
        form = PostForm()
    return render(request, 'create_post.html', {'form': form})




def FAQ(request):
    return render(request,'FuneralApp/FAQ.html')



def Heart_comment(request,commentId):
    print('hrrrrrrrrr')
    if request.method == 'POST':
        comment = Comments.objects.get(id=commentId)
        if comment.heart.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            comment.heart.remove(request.user)

            heart = False
        else:
            #print(photo.likes.add(request.user))
            comment.heart.add(request.user)
            heart = True
        data = {
            'heart': heart,
            'count': comment.heart.count(),
        }
        return JsonResponse(data)


def Heart_reply(request,replyId):

    if request.method == 'POST':
        reply = CommentReply.objects.get(id=replyId)
        if reply.heart.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            reply.heart.remove(request.user)

            heart = False
        else:
            #print(photo.likes.add(request.user))
            reply.heart.add(request.user)
            heart = True
        data = {
            'heart': heart,
            'count': reply.heart.count(),
        }
        return JsonResponse(data)

def Like_comment(request,commentId):

    if request.method == 'POST':
        comment = Comments.objects.get(id=commentId)
        if comment.likes.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            comment.likes.remove(request.user)

            liked = False
        else:
            #print(photo.likes.add(request.user))
            comment.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': comment.likes.count(),
        }
        return JsonResponse(data)



def Like_reply(request,replyId):

    if request.method == 'POST':
        reply = CommentReply.objects.get(id=replyId)
        if reply.likes.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            reply.likes.remove(request.user)

            liked = False
        else:
            #print(photo.likes.add(request.user))
            reply.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': reply.likes.count(),
        }
        return JsonResponse(data)





#@login_required(login_url='login')
def Heart_tribute(request,tributeId):
    print('hrrrrrrrrr')
    if request.method == 'POST':
        comment = Tribute.objects.get(id=tributeId)
        if comment.heart.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            comment.heart.remove(request.user)

            heart = False
        else:
            #print(photo.likes.add(request.user))
            comment.heart.add(request.user)
            heart = True
        data = {
            'heart': heart,
            'count': comment.heart.count(),
        }
        return JsonResponse(data)


def Heart_tribute_reply(request,replyId):
    print('hrrrrrrrrr')
    if request.method == 'POST':
        reply = TributeReply.objects.get(id=replyId)
        if reply.heart.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            reply.heart.remove(request.user)

            heart = False
        else:
            #print(photo.likes.add(request.user))
            reply.heart.add(request.user)
            heart = True
        data = {
            'heart': heart,
            'count': reply.heart.count(),
        }
        return JsonResponse(data)

def Like_tribute(request,tributeId):

    if request.method == 'POST':
        comment = Tribute.objects.get(id=tributeId)
        if comment.likes.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            comment.likes.remove(request.user)

            liked = False
        else:
            #print(photo.likes.add(request.user))
            comment.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': comment.likes.count(),
        }
        return JsonResponse(data)



def Like_tribute_reply(request,replyId):
    if request.method == 'POST':
        reply = TributeReply.objects.get(id=replyId)
        if reply.likes.filter(id=request.user.id).exists():
            #print(photo.likes.remove(request.user))
            reply.likes.remove(request.user)

            liked = False
        else:
            #print(photo.likes.add(request.user))
            reply.likes.add(request.user)
            liked = True
        data = {
            'liked': liked,
            'count': reply.likes.count(),
        }
        return JsonResponse(data)





#delete reply
@login_required(login_url='login')
def delete_reply(request, replyId):
    if request.method == 'POST':
        print('replyid',replyId)
        try:
            reply = CommentReply.objects.get(id=replyId)
        except CommentReply.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Reply does not exist.'}, status=404)
        reply.delete()


    return JsonResponse({'status': 'ok'})




##stars views starts
def calculate_price(stars):
    if stars == 2.0:
        return 45.00
    elif stars == 3.5:
        return 90.00
    elif stars == 5.0:
        return 135.00
    else:
        # Handle any other cases or custom pricing logic
        return 0.0
@csrf_exempt
@login_required(login_url='auth_memorial')
def purchase_stars(request):
    if request.method == 'POST':
        price = float(request.POST.get('stars'))
          # Implement a function to calculate the price based on the pricing tiers


        stripe.api_key = settings.STRIPE_SECRET_KEY

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'Stars',
                        },
                        'unit_amount': int(price * 100),
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=request.build_absolute_uri(reverse('payment-success')),
            cancel_url=request.build_absolute_uri(reverse('payment-cancel')),
        )
        request.session['stripe_id'] = session.id
        return redirect(session.url)



    return redirect('recent_memorial')  #


@login_required(login_url='auth_memorial')
def payment_success(request):
    session_id = request.session.get('stripe_id')

    stripe.api_key = settings.STRIPE_SECRET_KEY

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        payment_intent_id = session.payment_intent


        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)

        if payment_intent.status == 'succeeded':

            # Payment is successful, update wallet and record purchase
            stars = calculate_price(session.amount_total / 100)  # Implement a function to calculate stars from the price


            if Wallet.objects.filter(user=request.user).exists():
                wallet = Wallet.objects.get(user=request.user)
            else:
                wallet = Wallet.objects.create(user=request.user)

            wallet.add_funds(stars)

            Purchase.objects.create(user=request.user, stars=stars, amount_paid=session.amount_total / 100)

            request.session.pop('stripe_id', None)
            return render(request, 'FuneralApp/payment_success.html')
        else:
            # Payment failed, handle the failure scenario
            return render(request, 'FuneralApp/payment_failure.html')
    except stripe.error.InvalidRequestError as e:
        print('error',str(e))

        # Invalid session ID, handle the failure scenario
        return render(request, 'FuneralApp/payment_failure.html')


def payment_cancel(request):
    return render(request, 'FuneralApp/payment_cancel.html')



def sendGifts(request,recipientId,giftPrice,giftType):
    print(giftType)
    if request.method == 'POST':

        recipient_id = recipientId
        stars = int(giftPrice)

        deceased = Deceased.objects.get(id=recipient_id)
        gift = Gift.objects.filter(recipient=deceased)
        sender_wallet = Wallet.objects.get(user=request.user)
        if sender_wallet.balance >= stars:
            sender_wallet.deduct_funds(stars)

            Gift.objects.create(sender=request.user, recipient=deceased, stars=stars, gift_type = giftType)
            #messages.success(request, 'Gift sent successfully.')
            data = {'success': True, 'message': 'Gift sent successfully.','balance': sender_wallet.balance,'deceased_bal':gift.count()}

        else:
            #messages.error(request, 'Insufficient balance to send the gift.')
            data = {'success': False, 'message': 'Insufficient balance to send the gift.','balance': sender_wallet.balance,'deceased_bal':gift.count()}


    return JsonResponse(data)

