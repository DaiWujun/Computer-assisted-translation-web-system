from collections import defaultdict

from flask import Flask, jsonify, request

app = Flask(__name__)

class Autocomplete:
    def __init__(self, n=3):
        self.n = n
        self.ngrams = defaultdict(list)

    def train(self, text):
        text = text.split(' ')
        for i in range(len(text) - self.n):
            seq = ' '.join(text[i:i+self.n])
            self.ngrams[seq].append(text[i+self.n])

    def get_suggestions(self, text, num_suggestions=5):
        suggestions = self.ngrams[text]
        top_suggestions = sorted(suggestions, key=suggestions.count, reverse=True)[:num_suggestions]
        return top_suggestions

autocomplete = Autocomplete()

@app.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    text = data['text']
    autocomplete.train(text)
    return jsonify({'message': 'Training completed'})

@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    text = request.args.get('text')
    num_suggestions = int(request.args.get('num_suggestions', 5))
    suggestions = autocomplete.get_suggestions(text, num_suggestions)
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run()
