# script to go through anilist users to see
# if they exist or not

# used this to find a range of users that exist
# for the random list btn in the search page

import requests
import time

def run_query(uri, query):
    request = requests.post(uri, json={'query': query})
    if request.status_code == 200:
        return print(request.json())
    else:
        print(f"Not found: {query}")


def query(val):
    return "{User(id: %s) {id name}}" % (val)


for i in range(200):
    val = query(i + 1)
    result = run_query('https://graphql.anilist.co', val)
