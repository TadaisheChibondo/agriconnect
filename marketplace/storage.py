import os
from django.core.files.storage import Storage
from imagekitio import ImageKit

class ImageKitStorage(Storage):
    def __init__(self):
        # Initialize ImageKit with keys from Render's environment
        self.imagekit = ImageKit(
            private_key=os.environ.get('IMAGEKIT_PRIVATE_KEY', '')
        )

    def _save(self, name, content):
        # 1. Read the image data bytes
        file_data = content.read()
        
        # 2. Upload to ImageKit
        response = self.imagekit.files.upload(
            file=file_data,
            file_name=name
        )
        
        # 3. Return the exact secure URL. Django will save this in your database!
        return response.url

    def url(self, name):
        # Because we saved the full URL as the name, we just hand it right back
        return name

    def exists(self, name):
        # Tell Django not to worry about duplicate names (ImageKit handles this)
        return False