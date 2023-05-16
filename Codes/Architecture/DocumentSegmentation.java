package src;

public class DocumentSegmentation {
    private static final String REGEX_PATTERN = "[.!?]\\s+";

    public static String[] segmentDocument(String document) {
        return document.split(REGEX_PATTERN);
    }
}
