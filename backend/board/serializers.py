from rest_framework import serializers
from board.models import Post, PostImage, ImageTes


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ['image']


class PostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("get_images")

    def get_images(self, obj):
        image = obj.postimage_set.all()
        
        return PostImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'create_date', 'images']

    def create(self, validated_data):
        instance = Post.objects.create(**validated_data)
        image_set = self.context['request'].FILES

        for image_data in image_set.getlist('image'):
            PostImage.objects.create(post=instance, image=image_data)
        
        return instance

class ImageTesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTes
        fields = '__all__'