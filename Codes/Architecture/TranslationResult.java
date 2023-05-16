
public class TranslationResult {
    private String sourceText;
    private String translatedText;
    private String targetLanguage;

    public TranslationResult(String sourceText, String translatedText, String targetLanguage) {
        this.sourceText = sourceText;
        this.translatedText = translatedText;
        this.targetLanguage = targetLanguage;
    }

    public String getSourceText() {
        return this.sourceText;
    }

    public String getTranslatedText() {
        return this.translatedText;
    }

    public String getTargetLanguage() {
        return this.targetLanguage;
    }
}
