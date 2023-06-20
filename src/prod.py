"""
Backend server for the report.Ai extension
"""

# pylint: disable=E0401
# pylint: disable=R0801
import os
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
import requests


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


gpt_neo_key = os.environ.get("GPTNEO")
mongo_pass = os.environ.get("MONGO")

mongo_uri = "mongodb+srv://mohdansah10:" + mongo_pass + "@cluster0.dsdb23w.mongodb.net/"
headers = {"Authorization": gpt_neo_key}

client = MongoClient(mongo_uri)
ratings_collection = client["report"]["rating"]


def summarizer(text):
    """summarizer function"""
    api_url_summarizer = (
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    )

    def query(payload):
        data = json.dumps(payload)
        response = requests.request(
            "POST", api_url_summarizer, headers=headers, data=data, timeout=10
        )
        return json.loads(response.content.decode("utf-8"))

    output = query(
        {
            "inputs": text,
            "parameters": {"do_sample": False},
        }
    )
    print(output)
    return output[0]["summary_text"]


def ask_qna(text):
    """Question answer handler"""
    api_url_qna = (
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
    )
    print(text)

    def query(payload):
        data = json.dumps(payload)
        response = requests.request(
            "POST", api_url_qna, headers=headers, data=data, timeout=10
        )
        return json.loads(response.content.decode("utf-8"))

    data = query(
        {
            "inputs": {
                "question": text["question"],
                "context": text["context"],
            }
        }
    )
    return data


@app.route("/summarize", methods=["POST"])
def summarize():
    """Summarizer"""
    text_data = request.get_json()
    print(text_data)
    # Adding CORS headers to the response
    response = jsonify({"status": "success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    summary = summarizer(text_data[:499])
    response = jsonify({"summary": summary})
    return response


@app.route("/save_entry", methods=["POST"])
def save_entry():
    """Rating saver"""
    req_data = request.get_json()
    print(req_data)
    url = req_data["url"]
    curr_rating = req_data["rating"]
    res = ratings_collection.find_one({"url": url})

    if res:
        new_rating = (res["rating"] * res["freq"] + curr_rating) / (res["freq"] + 1)
        update = {"$set": {"rating": new_rating, "freq": res["freq"] + 1}}
        ratings_collection.update_many({"url": url}, update)
    else:
        new_doc = {"url": url, "rating": curr_rating, "freq": 1}
        ratings_collection.insert_one(new_doc)

    return jsonify({"status": "success"})


@app.route("/get_rating", methods=["POST"])
def get_rating_():
    """Rating fetcher"""
    req_data = request.get_json()
    url = req_data["url"]
    res = ratings_collection.find_one({"url": url})
    if res:
        response = jsonify({"rating": res["rating"]})
    else:
        response = jsonify({"rating": 0})
    return response


@app.route("/ask-question", methods=["POST"])
def ask():
    """Question handler"""
    text_data = request.get_json()
    # Add CORS headers to the response
    response = jsonify({"status": "success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")

    response = jsonify({"answer": ask_qna(text_data)})
    return response


@app.route("/top_ratings")
def top_ratings():
    """Fetching the top ratings"""
    tops = ratings_collection.find().sort("rating", -1)
    tops_list = []
    for top in tops:
        tops_list.append(dumps(top))

    response = {"top": tops_list}
    return jsonify(response)


@app.route("/")
def home():
    """Home page"""
    return "Server is working, //[REPORT.AI]"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
