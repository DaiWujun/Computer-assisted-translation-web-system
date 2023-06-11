from flask import Flask, jsonify, request
from spellchecker import SpellChecker

app = Flask(__name__)

@app.route('/check-spelling', methods=['POST'])
def check_spelling():
    data = request.get_json()
    text = data['text']
    spell = SpellChecker()
    misspelled = spell.unknown(text.split())
    suggestions = []
    for word in misspelled:
        correction = spell.correction(word)
        suggestions.append({'misspelled_word': word, 'suggestion': correction})
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run()
