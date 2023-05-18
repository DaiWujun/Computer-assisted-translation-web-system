from langdetect import detect

def detect_language(text):
    try:
        return detect(text)
    except Exception as e:
        print("Error detecting language: ", e)

# 使用示例
language = detect_language("Hello, world!")
print("Detected language: ", language)
