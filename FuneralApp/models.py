
from django.db import models
#from ckeditor_uploader.fields import RichTextUploadingField
from django.shortcuts import reverse
from django.contrib.auth.models import User
from django.conf import settings
#from django_countries.fields import CountryField

#from .fields import OrderField
from .manager import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

'''deceased>>memorial>>biography'''


class myuser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=40,blank=False)
    last_name = models.CharField(max_length=40,blank=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name',]
    objects = CustomUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'








class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='Profile/',blank=True,null=True)
    address = models.CharField(max_length=100,blank=True,null=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='following',blank=True,null=True)
    phone_number = models.CharField(max_length=11,blank=True,null=True)

    def __str__(self):
        return f'{self.user.first_name}'




month_choices = [
    ('January','January'),
    ('February','February'),
    ('March','March'),
    ('April','April'),
    ('May',',May'),
    ('June','June'),
    ('July','July'),
    ('August','August'),
    ('September','September'),
    ('October','October'),
    ('November','November'),
    ('December','December'),
]

from django.core.validators import MinValueValidator

class Deceased(models.Model):
    TYPE_CHOICES = (
        ('friend', 'Friend'),
        ('family', 'Family'),
        ('other', 'Other'),
    )
    Audience_CHOICES = (
        ('Public', 'Public'),
        ('Private', 'Private'),

    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null =True,blank = True)
    #contributors = models.ManyToManyField(Contributor, blank=True,null=True)
    first_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255,blank=True,null=True)
    last_name = models.CharField(max_length=255)
    death_cause = models.CharField(max_length=255,blank=True,null=True)
    month_birth = models.CharField(max_length=100,choices=month_choices)
    day_birth = models.IntegerField()
    year_birth = models.IntegerField(blank=True,null=True)

    #year_birth = models.IntegerField(
        #validators=[MinValueValidator(1901)],
        #error_messages={'invalid': ('Year must be greater than or equal to 1901',)}
    #)

    month_death = models.CharField(max_length=100,choices=month_choices,blank=True,null=True)
    day_death= models.IntegerField(blank=True,null=True)
    year_death = models.IntegerField(blank=True,null=True)
    location = models.CharField(max_length=100,blank=True,null=True)
    relationship_type = models.CharField(choices=TYPE_CHOICES, max_length=20,blank=True,null=True)
    audience = models.CharField(choices=Audience_CHOICES, max_length=20,default = "Public")
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='deceasedfollowing',blank=True)



    def __str__(self):
        return self.first_name




class Contributor(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    invitation_token = models.CharField(max_length=100, unique=True)
    invited_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contributor_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='contributors_user',blank=True,null=True)
    memorials = models.ForeignKey(Deceased,on_delete=models.CASCADE, related_name='contributors',null=True,blank=True)



facts_choices = [
    ('1','Place of birth'),
    ('2','Most recently lived in'),
    ('3','favorite hobbies'),
    ('4','favorite foods'),
    ('5','Favorite bands and musical artists'),
    ('6','Interesting facts about'),
    ('7','If you could tell anything today, what would you say?'),
    ('8','loved nothing more than'),
    ('9','Favorite place in the world'),
    ('10','Favorite sports'),
    ('11','Favorite movies'),
    ('12',"profession(s)"),
    ('13',"superpower"),
    ('14',"proudest accomplishments"),
    ('15',"pets in life"),
    ('17',"Favorite ice cream flavor"),
    ('18',"Places traveled to"),

    ('19',"Name of High School attended"),
    ('20',"Name of college attended"),
    ('21',"Name of  parents"),
    ('22',"Name of siblings"),
    ('23',"Name of children"),
    ('24',"Name of grandchildren"),
]


ceremony = [
    ('1','Funeral'),
    ('2','Graveside Service'),
    ('3','Viewing Service'),
    ('4','Visitation Service'),
    ('5','Memorial Service'),
    ('6','Celebration of Life'),
    ('7','Wake'),
    ('8','Other'),
]
class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE)
    celebration_type = models.CharField(max_length=100,choices=ceremony)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    streaming_link = models.CharField(max_length=100,blank=True,null=True)
    host_image = models.ImageField(upload_to='host-image/',blank=True,null=True)

    def __str__(self):
        return f'{self.celebration_type}'

    class Meta:
        ordering = ['-id']


class BiographyFacts(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE)
    #biography = models.TextField(blank=True,null=True)
    facts = models.CharField(max_length=100,choices=facts_choices,blank=True,null=True)
    description = models.CharField(max_length=100,null=True,blank=True)

    def __str__(self):
        return self.facts

    class Meta:
        ordering = ('id',)



class PhotoAlbum(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE)
    title = models.CharField(max_length=100,null=True,blank=True)
    date = models.DateField(blank=True,null=True)
    image = models.FileField(upload_to='Albums/',null=True,blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_photos', blank=True)

    def __str__(self):
        return self.title




from ckeditor.fields import RichTextField

class Biography(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE,related_name='biography')
    body_text = RichTextField(null=True, blank=True)
    #new
    introduction = models.TextField(blank =True,null=True)
    early_life = models.TextField(blank =True,null=True)
    career = models.TextField(blank =True,null=True)
    personal_life = models.TextField(blank =True,null=True)
    Awards = models.TextField(blank =True,null=True)

    cover_photo = models.ImageField(null=True, blank=True,upload_to = 'CoverPhoto/')
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_cover', blank=True)

    def __str__(self):
        return self.deceased.first_name

    class Meta:
        ordering = ['-id']



from django.utils import timezone
class Comments(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = models.ForeignKey(PhotoAlbum,on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_comment', blank=True)
    heart = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='heart_comment', blank=True)

    def get_time_since_comment(self):
        time_difference = timezone.now() - self.date

        if time_difference.total_seconds() < 60:  # Less than a minute
            return f"{int(time_difference.total_seconds())} sec ago"
        elif time_difference.total_seconds() < 3600:  # Less than an hour
            minutes = int(time_difference.total_seconds() / 60)
            return f"{minutes} mins ago"
        elif time_difference.total_seconds() < 86400:  # Less than a day
            hours = int(time_difference.total_seconds() / 3600)
            return f"{hours} hours ago"
        elif time_difference.total_seconds() < 604800:  # Less than a week
            days = int(time_difference.total_seconds() / 86400)
            return f"{days} days ago"
        elif time_difference.total_seconds() < 2592000:  # Less than a month
            weeks = int(time_difference.total_seconds() / 604800)
            return f"{weeks} weeks ago"
        elif time_difference.total_seconds() < 31536000:  # Less than a year
            months = int(time_difference.total_seconds() / 2592000)
            return f"{months} months ago"
        else:
            years = int(time_difference.total_seconds() / 31536000)
            return f"{years} years ago"



class Tribute(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_tribute', blank=True)
    heart = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='heart_tribute', blank=True)

    def get_time_since_comment(self):
        time_difference = timezone.now() - self.date

        if time_difference.total_seconds() < 60:  # Less than a minute
            return f"{int(time_difference.total_seconds())} sec ago"
        elif time_difference.total_seconds() < 3600:  # Less than an hour
            minutes = int(time_difference.total_seconds() / 60)
            return f"{minutes} mins ago"
        elif time_difference.total_seconds() < 86400:  # Less than a day
            hours = int(time_difference.total_seconds() / 3600)
            return f"{hours} hours ago"
        elif time_difference.total_seconds() < 604800:  # Less than a week
            days = int(time_difference.total_seconds() / 86400)
            return f"{days} days ago"
        elif time_difference.total_seconds() < 2592000:  # Less than a month
            weeks = int(time_difference.total_seconds() / 604800)
            return f"{weeks} weeks ago"
        elif time_difference.total_seconds() < 31536000:  # Less than a year
            months = int(time_difference.total_seconds() / 2592000)
            return f"{months} months ago"
        else:
            years = int(time_difference.total_seconds() / 31536000)
            return f"{years} years ago"



    class Meta:
        ordering = ['-id']



class TributeReply(models.Model):
    tribute = models.ForeignKey(Tribute, on_delete=models.CASCADE, related_name='tribute_replies')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='tribute_liked_reply', blank=True)
    heart = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='tribute_heart_reply', blank=True)


    def get_time_since_comment(self):
        time_difference = timezone.now() - self.date

        if time_difference.total_seconds() < 60:  # Less than a minute
            return f"{int(time_difference.total_seconds())} sec ago"
        elif time_difference.total_seconds() < 3600:  # Less than an hour
            minutes = int(time_difference.total_seconds() / 60)
            return f"{minutes} mins ago"
        elif time_difference.total_seconds() < 86400:  # Less than a day
            hours = int(time_difference.total_seconds() / 3600)
            return f"{hours} hours ago"
        elif time_difference.total_seconds() < 604800:  # Less than a week
            days = int(time_difference.total_seconds() / 86400)
            return f"{days} days ago"
        elif time_difference.total_seconds() < 2592000:  # Less than a month
            weeks = int(time_difference.total_seconds() / 604800)
            return f"{weeks} weeks ago"
        elif time_difference.total_seconds() < 31536000:  # Less than a year
            months = int(time_difference.total_seconds() / 2592000)
            return f"{months} months ago"
        else:
            years = int(time_difference.total_seconds() / 31536000)
            return f"{years} years ago"




class Waitlist(models.Model):
    email = models.EmailField()

    def __str__(self):
        return f'{self.email}'



class Candle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deceased = models.ForeignKey(Deceased,on_delete=models.CASCADE)
    lit = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.deceased}'






class Relationship(models.Model):
    TYPE_CHOICES = (
        ('friend', 'Friend'),
        ('family', 'Family'),
        ('other', 'Other'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='from_user')
    relationship_type = models.CharField(choices=TYPE_CHOICES, max_length=20)
    deceased = models.ForeignKey('Deceased', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user}'





class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Post/')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title}'





class CommentReply(models.Model):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE, related_name='replies')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_reply', blank=True)
    heart = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='heart_reply', blank=True)


    def get_time_since_comment(self):
        time_difference = timezone.now() - self.date

        if time_difference.total_seconds() < 60:  # Less than a minute
            return f"{int(time_difference.total_seconds())} sec ago"
        elif time_difference.total_seconds() < 3600:  # Less than an hour
            minutes = int(time_difference.total_seconds() / 60)
            return f"{minutes} mins ago"
        elif time_difference.total_seconds() < 86400:  # Less than a day
            hours = int(time_difference.total_seconds() / 3600)
            return f"{hours} hours ago"
        elif time_difference.total_seconds() < 604800:  # Less than a week
            days = int(time_difference.total_seconds() / 86400)
            return f"{days} days ago"
        elif time_difference.total_seconds() < 2592000:  # Less than a month
            weeks = int(time_difference.total_seconds() / 604800)
            return f"{weeks} weeks ago"
        elif time_difference.total_seconds() < 31536000:  # Less than a year
            months = int(time_difference.total_seconds() / 2592000)
            return f"{months} months ago"
        else:
            years = int(time_difference.total_seconds() / 31536000)
            return f"{years} years ago"




##wallet starts
import decimal
class Wallet(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def add_funds(self, stars):
        self.balance += decimal.Decimal(stars)
        self.save()

    def deduct_funds(self, stars):
        if self.balance >= decimal.Decimal(stars):
            self.balance -= decimal.Decimal(stars)
            self.save()
            return True
        return False

    def __str__(self):
        return f"Wallet for {self.user.first_name} {self.user.last_name}"



class Purchase(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stars = models.PositiveIntegerField()
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Purchase by {self.user.first_name} - {self.stars} stars"


class Gift(models.Model):
    GIFT_CHOICES = [
        ('Ribbon', 'Ribbon'),
        ('Candle', 'Candle'),
        ('Donations & Charity', 'Donations & Charity'),
        ('Tulip Flower', 'Tulip Flower'),
        ('Rose flower', 'Rose flower'),
        ('Tree', 'Tree'),

        # Add more choices as needed
    ]
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_gifts')
    recipient = models.ForeignKey(Deceased, on_delete=models.CASCADE, related_name='received_gifts')
    stars = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    gift_type = models.CharField(max_length=20, choices=GIFT_CHOICES,null=True, blank=True)

    def __str__(self):
        return f"Gift from {self.sender.first_name} to {self.recipient.first_name}"

