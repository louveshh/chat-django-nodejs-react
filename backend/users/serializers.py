from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from django.core import exceptions
from .models import City
from .models import City, UserAccount
from .utils import new_biome
User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError({
                'password': serializer_errors['non_field_errors']
            })
        data['password'] = make_password(data['password'])
        return data

    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class AddCitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = City
        fields = ('email', 'name', 'x', 'y', 'weight')

    def validate(self, data):
        email = data.get('email')
        name = data.get('name')
        x = data.get('x')
        y = data.get('y')
        weight = data.get('weight')
        if not email:
            raise serializers.ValidationError("Missing data - Email")
        if not name:
            raise serializers.ValidationError("Missing data - Name")
        if not x:
            raise serializers.ValidationError("Missing data - X")
        if not y:
            raise serializers.ValidationError("Missing data - Y")
        if not weight:
            raise serializers.ValidationError("Missing data - Weight")
        user = UserAccount.objects.get(email=email)
        if not user:
            raise serializers.ValidationError("User does not exists")
        city = City.objects.filter(user=user)
        if city.exists():
            raise serializers.ValidationError("City already exists")
        return data

    def create(self, validated_data):
        x = float(validated_data['x'])
        y = float(validated_data['y'])

        city = City.objects.create(
            user=UserAccount.objects.get(email=validated_data['email']),
            x=float(validated_data['x']),
            y=float(validated_data['y']),
            name=validated_data['name'],
            weight=int(validated_data['weight']),
            biome_name=new_biome(x, y)
        )
        return city


class CitySerializer(serializers.ModelSerializer):
    user = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = City
        fields = '__all__'


class RemoveCitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = City
        fields = ('email', 'name', 'x', 'y', 'weight')

    def validate(self, data):
        email = data.get('email')
        if not City.objects.filter(user=UserAccount.objects.filter(email=email).exists()):
            raise serializers.ValidationError("City does not exists")
        return data

    def create(self, validated_data):
        city = City.objects.filter(
            user=UserAccount.objects.filter(email=validated_data["email"]))
        city.delete()
        return city
