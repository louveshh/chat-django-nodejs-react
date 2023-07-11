from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        user = self.create_user(
            first_name,
            last_name,
            email,
            password=password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email


class City(models.Model):
    user = models.OneToOneField(
        UserAccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    x = models.FloatField()
    y = models.FloatField()
    weight = models.IntegerField()
    biome_name = models.CharField(max_length=255)
    selected_start = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email}, \
        {self.name}, \
        {self.biome_name}"
