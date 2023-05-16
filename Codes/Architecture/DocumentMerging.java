package src;

public class DocumentMerging {
    public static String mergeDocuments(String[] documents) {
        StringBuilder mergedDocument = new StringBuilder();
        for (String document : documents) {
            mergedDocument.append(document.trim()).append(" ");
        }
        return mergedDocument.toString().trim();
    }
}
