import json
from flask import Flask, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv
import openai

load_dotenv()
app = Flask(__name__)
cors = CORS(app)


api_key = os.environ.get('API_KEY')
openai.api_key = api_key
print(api_key)


def openai_summarizer(text):
    prompt = f"Summarize this text and give a brief note on it:\n{text[:2000]}"
    response = openai.Completion.create(
        engine="curie",
        prompt=prompt,
        max_tokens=100,  # adjust to control length of summary
        n=1,
        stop=None,
        temperature=0.5,  # adjust to control creativity of summary
    )
    summary = response.choices[0].text.strip()
    return summary


@app.route('/summarize', methods=['POST'])
def summarize():
    req_data = request.get_json()
    text_data = req_data['text_data']
    # text_data = req_data.get('text_data')
    # print(req_data)
    # generated_text = response.choices[0].text
    # return generated_text

    # Add CORS headers to the response
    response = jsonify({'status': 'success'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')

    print(openai_summarizer(text_data))
    response = jsonify({'summary': openai_summarizer(text_data)})
    print(response)
    return response


@ app.route('/save_entry', methods=['POST'])
def save_entry():
    req_data = request.get_json()


app.route('/save')
if __name__ == '__main__':
    app.run(debug=True)
