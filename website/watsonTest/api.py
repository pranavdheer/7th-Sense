import requests
files = {'images_file': open('fruitbowl.jpg', 'rb')}
r = requests.post("https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=aecef0acc91694417267d5385d9bcb2c7305c729&version=2016-05-20", files=files)
print(r.text)
