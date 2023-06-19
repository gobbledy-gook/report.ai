"""
Backend server for the report.Ai extension
"""

# pylint: disable=E0401
import os
import json
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
import requests
import openai


# from transformers
# import GPTNeoForCausalLM, GPT2Tokenizer

# model = GPTNeoForCausalLM.from_pretrained("EleutherAI/gpt-neo-1.3B")
# tokenizer = GPT2Tokenizer.from_pretrained("EleutherAI/gpt-neo-1.3B")


load_dotenv()
app = Flask(__name__)
cors = CORS(app)


api_key = os.environ.get("API_KEY")
gpt_neo_key = os.environ.get("GPTNEO")
mongo_pass = os.environ.get("MONGO")
openai.api_key = api_key

mongo_uri = "mongodb+srv://mohdansah10:" + mongo_pass + "@cluster0.dsdb23w.mongodb.net/"
print(mongo_uri)

client = MongoClient(mongo_uri)
ratings_collection = client["report"]["rating"]

print(ratings_collection)


API_URL_SUM = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
API_URL_QNA = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
headers = {"Authorization": gpt_neo_key}


def openai_summarizer(text):
    """summarizer function"""

    def query(payload):
        data = json.dumps(payload)
        response = requests.request(
            "POST", API_URL_SUM, headers=headers, data=data, timeout=10
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
    # input_ids = tokenizer(prompt, return_tensors="pt").input_ids
    # response = openai.Completion.create(
    #     engine="curie",
    #     prompt=prompt,
    #     max_tokens=300,  # adjust to control length of summary
    #     n=1,
    #     stop=None,
    #     temperature=0.5,  # adjust to control creativity of summary
    # )
    # gen_tokens = model.generate(
    #         input_ids,
    #         do_sample=True,
    #         temperature=0.7,
    #         max_length=500,
    # )
    # gen_text = tokenizer.batch_decode(gen_tokens)[0]
    # return gen_text
    # summary = response.choices[0].text.strip()
    # return summary


def gpt_ask(text):
    """Ask Question feature implementation"""
    # prompt = f"""write regarding, {text}, in the context of previous text."""
    print("use of gpt_ask() is deprecated")
    # def query(payload):
    #     data = json.dumps(payload)
    #     response = requests.request("POST", API_URL_QNA, headers=headers, data=data)
    #     return json.loads(response.content.decode("utf-8"))
    # data = query(
    #     {
    #         "inputs": {
    #             "question": "What's my name?",
    #             "context": "My name is Clara and I live in Berkeley.",
    #         }
    #     }
    # )
    # response = openai.Completion.create(
    #     engine="curie",
    #     prompt=prompt,
    #     max_tokens=100,  # adjust to control length of summary
    #     n=1,
    #     temperature=0.5,  # adjust to control creativity of summary
    # )
    # answer = response.choices[0].text.strip()
    # return answer
    return text


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
    summary = openai_summarizer(text_data[:499])
    # summary = "Hello this is a test summary"

    response = jsonify({"summary": summary})
    # print(response)
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

    response = jsonify({"answer": gpt_ask(text_data)})
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
