import requests
r=requests.get('http://f926903b605c.ngrok.io/')
a=r.text
b=a.split()
print(b)
print(int(b[1])/100) 