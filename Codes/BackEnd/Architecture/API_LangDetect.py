from flask import Flask, jsonify, request
from langdetect import detect

app = Flask(__name__)

@app.route('/detect-language', methods=['POST'])
def detect_language():
    data = request.get_json()
    text = data['text']
    try:
        language = detect(text)
        return jsonify({'language': language})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
