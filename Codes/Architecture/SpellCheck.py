from spellchecker import SpellChecker

def check_spelling(text):
    spell = SpellChecker()
    misspelled = spell.unknown(text.split())
    for word in misspelled:
        # Get the one `most likely` answer
        print(f'Misspelled word: {word}, Suggestion: {spell.correction(word)}')

# 使用示例
check_spelling("speling errurs")
