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


@app.route('/summarize', methods=['POST'])
def summarize():
    req_data = request.get_json()
    text_data = req_data.get('text')
    print(req_data)
    # generated_text = response.choices[0].text
    # return generated_text

    # Add CORS headers to the response
    response = jsonify({'status': 'success'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    app.run(debug=True)
