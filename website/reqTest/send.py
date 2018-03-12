import requests
files = {'file': open('imgqweqw.jpg', 'rb')}
data = {'type':"pic", "id":"5aa43ac070f66759c63b51d4","class":"dog"}
r = requests.post("https://projectmitsy.herokuapp.com/upload", files=files, data=data)
print(r.text)
