import json


def convertFromJsonToDict(request):
    return json.loads(request.body.decode("utf-8"))


def convertFromDictToJson(data):
    return json.dumps(data)
