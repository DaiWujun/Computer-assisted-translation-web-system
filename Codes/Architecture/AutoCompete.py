from collections import defaultdict

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

# 使用示例
autocomplete = Autocomplete()
autocomplete.train("this is a test sentence for the autocomplete system")
print(autocomplete.get_suggestions("this is a"))
