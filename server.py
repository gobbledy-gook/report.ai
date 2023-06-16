import os
import openai
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps


load_dotenv()
app = Flask(__name__)
cors = CORS(app)


api_key = os.environ.get("API_KEY")
mongo_pass = os.environ.get("MONGO")
openai.api_key = api_key

mongo_uri = "mongodb+srv://mohdansah10:" + mongo_pass + "@cluster0.dsdb23w.mongodb.net/"
print(mongo_uri)

client = MongoClient(mongo_uri)
ratings_collection = client["report"]["rating"]

print(ratings_collection)


def openai_summarizer(text):
    """summarizer function"""
    prompt = f"summarize the following text in paragraphs:\n{text}"
    response = openai.Completion.create(
        engine="curie",
        prompt=prompt,
        max_tokens=300,  # adjust to control length of summary
        n=1,
        stop=None,
        temperature=0.5,  # adjust to control creativity of summary
    )
    summary = response.choices[0].text.strip()
    return summary


def GPT_ask(text):
    """Ask Question feature implementation"""
    prompt = f"""write regarding, {text}, in the context of previous text."""
    response = openai.Completion.create(
        engine="curie",
        prompt=prompt,
        max_tokens=100,  # adjust to control length of summary
        n=1,
        temperature=0.5,  # adjust to control creativity of summary
    )
    answer = response.choices[0].text.strip()
    return answer


@app.route("/summarize", methods=["POST"])
def summarize():
    """Summarizer"""
    text_data = request.get_json()

    # Adding CORS headers to the response
    response = jsonify({"status": "success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response = jsonify({"summary": openai_summarizer(text_data)})
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

    response = jsonify({"answer": GPT_ask(text_data)})
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


# app.route('/save')
if __name__ == "__main__":
    app.run(debug=True)
