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
        biome = new_biome(x, y)
        weight = data.get('weight')
        user = UserAccount.objects.filter(email=email).first()

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

        if not user:
            raise serializers.ValidationError("User does not exist")

        if City.objects.filter(user=user).exists():
            raise serializers.ValidationError("Your city already exists")

        if str(biome) == str("sea"):
            raise serializers.ValidationError(
                "You cannot set a City on the Sea!")
        return data

    def create(self, validated_data):
        x = float(validated_data['x'])
        y = float(validated_data['y'])
        biome = new_biome(x, y)
        city = City.objects.create(
            user=UserAccount.objects.get(email=validated_data['email']),
            x=float(validated_data['x']),
            y=float(validated_data['y']),
            name=validated_data['name'],
            weight=int(validated_data['weight']),
            biome_name=biome
        )
        return city


class CitySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(source='user.email', read_only=True)

    class Meta:
        model = City
        fields = '__all__'


class RemoveCitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = City
        fields = ('email',)

    def validate(self, data):
        email = data.get('email')
        if not email:
            raise serializers.ValidationError("Missing data - Email")

        user = UserAccount.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError("User does not exist")

        city = City.objects.filter(user=user)
        if not city.exists():
            raise serializers.ValidationError("City does not exist")

        return data

    def remove(self, validated_data):
        email = validated_data["email"]
        user = UserAccount.objects.get(email=email)
        city = City.objects.filter(user=user)
        city.delete()
        return city


class BiomesSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('biome_name', )
