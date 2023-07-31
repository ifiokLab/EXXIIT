from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('signup/',views.SignUp, name='signup'),
    path('register/<int:pk>/',views.register, name='register'),
    path('about/',views.home, name='about'),
    path('login/',views.Login.as_view(),name='login'),
    #path('logout/',views.Logout,name='logout'),
    path('accounts/logout/', LogoutView.as_view(), name='account_logout'),
    path('create_memorial/',views.create_memorial,name='create_memorial'),
    path('create_biography/<int:pk>/',views.create_biography, name='create_biography'),
    path('memorials/',views.DeceasedList,name='memorials'),

    #path('create-photo/<int:pk>/',views.create_photo, name='create-photo'),
    path('create-photo/<int:pk>/',views.create_photo, name='create-photo'),
    path('delete-photo/<int:formset_id>/', views.delete_photo, name='delete-photo'),

    path('create-facts/<int:pk>/',views.create_facts, name='create-facts'),
    path('delete-facts/<int:formset_id>/', views.delete_facts, name='delete-facts'),

    path('add-comment/<int:photoId>/', views.add_comment, name='add_comment'),
    path('photos/<int:photo_id>/comments/',views.photo_comments, name='photo_comments'),#delete_reply
    path('delete-comment/<int:commentId>/', views.delete_comment, name='delete_comment'),
    path('delete-reply/<int:replyId>/', views.delete_reply, name='delete_reply'),


    path('invite-contributor/', views.invite_contributor, name='invite_contributor'),
    path('register_contributor/', views.register_contributor, name='register_contributor'),



    path('like-photo/<int:photoId>/', views.like_photo, name='like_photo'),
    path('like-list/<int:photoId>/', views.like_list, name='like_list'),
    path('like-cover/<int:photoId>/', views.like_cover, name='like_cover'),
    path('cover-like-list/<int:photoId>/', views.cover_like_list, name='cover_like_list'),

    path('create-event/',views.create_event,name= 'create-event'),
    path('edit-event/<int:pk>/',views.edit_event,name= 'edit-event'),
    path('account/<int:pk>/',views.account, name = 'account'),
    path('delete-event/<int:eventId>/', views.delete_event, name='delete-event'),
    path('',views.recent_memorial,name='recent_memorial'),
    path('Auth-memorial/',views.Auth_memorial,name='auth_memorial'),
    path('search-memorials/',views.search_memorials,name='search_memorials'),

    path('add-tribute/<int:deceasedId>/', views.add_tribute, name='add-tribute'),
    path('tribute/<int:deceasedId>/list/',views.list_tribute, name='list-tribute'),
    path('delete-tribute/<int:commentId>/', views.delete_tribute, name='delete_tribute'),
    path('waitlist/',views.waitlist, name = 'waitlist'),
    path('waitlist_form/',views.waitlist_form, name = 'waitlist_form'),
    path('light-candle/',views.light_candle, name = 'light_candle'),
    path('candle/<str:name>/<int:pk>/',views.show_candle,name='show_candle'),

    path('add-relationship/<int:pk>/',views.add_relationship, name = 'add_relationship'),
    path('search-users/', views.search_users, name='search'),
    path('profile/<int:pk>/<str:name>/',views.User_Profile, name='profile'),

    path('follow/<int:pk>/', views.follow_user, name='follow_user'),
    path('faq/',views.FAQ, name='faq'),


    path('heart-comment/<int:commentId>/', views.Heart_comment, name='heart-comment'),
    path('heart-reply/<int:replyId>/', views.Heart_reply, name='heart-reply'),
    path('like-comment/<int:commentId>/', views.Like_comment, name='like-comment'),
    path('like-reply/<int:replyId>/', views.Like_reply, name='like-reply'),


    path('heart-tribute/<int:tributeId>/', views.Heart_tribute, name='heart-tribute'),
    path('heart-tribute-reply/<int:replyId>/', views.Heart_tribute_reply, name='heart-tribute-reply'),
    path('like-tribute/<int:tributeId>/', views.Like_tribute, name='like-tribute'),
    path('like-tribute-reply/<int:replyId>/', views.Like_tribute_reply, name='like-tribute-reply'),
    path('delete-tribute-reply/<int:replyId>/', views.delete_tribute_reply, name='delete-tribute-reply'),
    path('purchase-stars/',views.purchase_stars, name='purchase-stars'),
    path('payment-success/',views.payment_success, name='payment-success'),
    path('payment-cancel/',views.payment_cancel, name='payment-cancel'),
    path('send-gift/<int:recipientId>/<int:giftPrice>/<str:giftType>/',views.sendGifts, name='send-gift'),
    path('follow-deceased/<int:deceasedId>/',views.follow_deceased, name='follow-deceased'),


]

# element_index.querySelector('.num-tributes').textContent = data.tributes_num;
# tributes_num = Tribute.objects.filter(deceased_id=photo.deceased.id).count()