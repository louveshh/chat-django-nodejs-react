from django.shortcuts import render
from rest_framework import permissions, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserSerializer,\
    AddCitySerializer, RemoveCitySerializer, CitySerializer, BiomesSerializer
from .models import City
from django.core.paginator import Paginator
import math


User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_201_CREATED)


class RetreiveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)


class AddMapView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = AddCitySerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        city = serializer.create(serializer.validated_data)
        return Response({'info': 'Added City :)', 'biome_name': city.biome_name}, status=status.HTTP_201_CREATED)


class MapView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveMapView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = RemoveCitySerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': e.detail}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer.remove(serializer.validated_data)
        return Response(status=status.HTTP_204_NO_CONTENT)


class BiomesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        biomes = City.objects.exclude(biome_name__isnull=True).order_by('biome_name').values_list(
            'biome_name', flat=True).distinct()

        paginator = Paginator(biomes, 2)
        page_number = request.query_params.get(
            'page', 2)  # Set default page number to 1
        page_obj = paginator.get_page(page_number)
        output = list(page_obj)

        total = math.ceil(biomes.count() / 2)

        return Response({'name': output, 'total': total, 'page': page_number}, status=status.HTTP_200_OK)
