from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins, viewsets


class UserCustomViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin,
                        mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
