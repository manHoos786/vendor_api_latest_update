import requests
import json
r=requests.get('https://polar-lake-69736.herokuapp.com/verify')
h = json.loads(r.text)
print(json.dumps(h[0]["_id"], indent=4))