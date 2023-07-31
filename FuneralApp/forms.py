from django.contrib.auth.forms import UserCreationForm, UserChangeForm,AuthenticationForm
from django.forms import ModelForm,BaseInlineFormSet,inlineformset_factory
from .models import *
from django import forms
from django.utils.translation import gettext_lazy as _
from datetime import date
from calendar import monthrange



class UserForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'onfocus':'Swap_text()','id':'my_email','type':'email','autofocus':False })
        self.fields['first_name'].widget.attrs.update({'onfocus':'Swap_text2()','id':'first_name'})
        self.fields['last_name'].widget.attrs.update({'onfocus':'Swap_text3()','id':'last_name'})
        self.fields['password1'].widget.attrs.update({'onfocus':'Swap_text4()','id':'pass_word1'})

        self.fields['password2'].widget.attrs.update({'onfocus':'Swap_text5()','id':'pass_word2'})
        #self.fields['password2'].widget.attrs['id'] = 'password2'


    class Meta:
        model = myuser
        fields = ('email','first_name','last_name','password1','password2')


from allauth.account.forms import LoginForm
#class LoginForm(AuthenticationForm):
'''class LoginForm(AuthenticationForm):
    username = forms.EmailField(label='Email',widget=forms.TextInput(attrs={'id': 'my_email','autofocus':False,'type':'email','onfocus':'Swap_text()'}))
    password = forms.CharField(max_length=32, widget=forms.PasswordInput(attrs={'id': 'pass_word','onfocus':'Swap_text2()'}))
'''




class DeceasedForm(ModelForm):
    year_birth = forms.ChoiceField(choices=[(year, year) for year in range(date.today().year, 1900, -1)])
    year_death = forms.ChoiceField(choices=[(year, year) for year in range(date.today().year, 1900, -1)])
    day_birth = forms.ChoiceField(choices=[(day, day) for day in range(1, 32)])
    day_death = forms.ChoiceField(choices=[(day, day) for day in range(1, 32)])



    def __init__(self, *args, **kwargs):
        super(DeceasedForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['middle_name'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['last_name'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['day_birth'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['year_birth'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['day_death'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['year_death'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['location'].widget.attrs.update({"oninput":"this.className = ''"})
        self.fields['death_cause'].widget.attrs.update({"oninput":"this.className = ''"})




    class Meta:
        model = Deceased
        fields = '__all__'
        #widgets = {
            #'photos': forms.ClearableFileInput(attrs={'multiple': True}),
        #}


class FactsForm(ModelForm):

    class Meta:
        model  = BiographyFacts
        fields=('facts', 'description','user','deceased','id')
        #exclude = ('id',)



#FactsFormset = inlineformset_factory(Deceased, BiographyFacts, form=FactsForm, extra=1,)

FactsFormset = inlineformset_factory(Deceased, BiographyFacts, fields=('facts', 'description','user'), extra=1,
widgets={'description': forms.TextInput(attrs={
            'class': 'desc',
            'placeholder': 'Description'
        })
    })





class PhotosForm(ModelForm):

    class Meta:
        model  = PhotoAlbum
        fields=('image', 'title','user','deceased','id','date')
        #exclude = ('id',)



#FactsFormset = inlineformset_factory(Deceased, BiographyFacts, form=FactsForm, extra=1,)

PhotosFormset = inlineformset_factory(Deceased, PhotoAlbum, fields=('image', 'title','user','date'), extra=1,
widgets={'title': forms.TextInput(attrs={
            'class': 'desc',
            'placeholder': 'Brief title...'

        }),
        'date': forms.TextInput(attrs={
            'class': 'desc',
            'title': 'when was this photo taken?',
            'type':'date',

        }),

    })







class BiographyForm(ModelForm):

    class Meta:
        model  = Biography
        fields= '__all__'



class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'

class ContributorForm(forms.ModelForm):
    class Meta:
        model = Contributor
        fields = ['name', 'email','memorials',]


class EventForm(forms.ModelForm):
    date = forms.CharField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}))
    class Meta:
        model = Event
        fields ='__all__'


"""class waitlistForm(forms.ModelForm):
    class Meta:
        model = Waitlist
        fields = '__all__'
"""

class waitlistForm(forms.ModelForm):
    class Meta:
        model = Waitlist
        fields = '__all__'



class CandleForm(forms.ModelForm):
    class Meta:
        model = Candle
        fields = '__all__'





class RelationshipForm(forms.ModelForm):
    class Meta:
        model = Relationship
        fields = '__all__'



class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

