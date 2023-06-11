from flask import Flask, jsonify, request
from langdetect import detect
from gevent import pywsgi

app = Flask(__name__)


@app.route('/detect_language', methods=['GET'])
def detect_language():
    data = request.get_json()
    text = data['text']

    try:
        language = detect(text)
        return jsonify({'language': language})
    except Exception as e:
        return jsonify({'error': str(e)}), 500




