
import java.util.HashMap;

public class LanguageDetection {
    private static HashMap<String, String> languageMap = new HashMap<>();
    static {
        // 初始化语言映射表
        languageMap.put("en", "English");
        languageMap.put("zh", "Chinese");
        // ...
    }

    public static String detectLanguage(String text) {
        // 实现语言识别逻辑
        String languageCode = "en"; // 假设识别结果为英文
        return languageMap.getOrDefault(languageCode, "Unknown");
    }
}
