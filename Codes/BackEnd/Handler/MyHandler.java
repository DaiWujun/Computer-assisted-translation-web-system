import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.UUID;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class MyHandler implements HttpHandler {
    private static final String UPLOAD_DIR = "/uploads";
    private static final String PROJECTS_DIR = "/projects";
    private static final String TERMS_DIR = "/terms";
    private static final Gson gson = new Gson();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String requestMethod = exchange.getRequestMethod();
        String requestPath = exchange.getRequestURI().getPath();
        String response = "";

        switch (requestPath) {
            case "/api/users/register":
                if (requestMethod.equalsIgnoreCase("POST")) {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    UserCredentials userCredentials = gson.fromJson(requestBody, UserCredentials.class);
                    boolean success = registerUser(userCredentials);
                    String message = success ? "User registered successfully." : "Failed to register user.";
                    response = gson.toJson(new ApiResponse(success, message));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/users/login":
                if (requestMethod.equalsIgnoreCase("POST")) {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    UserCredentials userCredentials = gson.fromJson(requestBody, UserCredentials.class);
                    User user = authenticateUser(userCredentials);
                    if (user != null) {
                        String token = generateToken(user);
                        response = gson.toJson(new LoginResponse(true, "Login successful.", token));
                        sendResponse(exchange, 200, response);
                    } else {
                        response = gson.toJson(new ApiResponse(false, "Invalid username or password."));
                        sendResponse(exchange, 401, response);
                    }
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/files/upload":
                if (requestMethod.equalsIgnoreCase("POST")) {
                    String fileId = UUID.randomUUID().toString();
                    Path uploadPath = Paths.get(UPLOAD_DIR, fileId);
                    exchange.getRequestHeaders().entrySet().stream()
                            .filter(e -> e.getKey().equalsIgnoreCase("Content-Type"))
                            .findFirst()
                            .ifPresent(e -> {
                                String contentType = e.getValue().get(0);
                                if (contentType.startsWith("multipart/form-data")) {
                                    try {
                                        InputStream is = exchange.getRequestBody();
                                        byte[] data = is.readAllBytes();
                                        Files.write(uploadPath, data);
                                        String message = "File uploaded successfully.";
                                        response = gson.toJson(new FileUploadResponse(true, message, fileId));
                                        sendResponse(exchange, 200, response);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                        sendResponse(exchange, 500, "Internal server error.");
                                    }
                                } else {
                                    sendResponse(exchange, 400, "Bad request.");
                                }
                            });
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/projects":
                if (requestMethod.equalsIgnoreCase("GET")) {
                    List<Project> projects = getProjects();
                    response = gson.toJson(new ProjectsResponse(true, "Projects retrieved successfully.", projects));
                    sendResponse(exchange, 200, response);
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    ProjectRequest projectRequest = gson.fromJson(requestBody, ProjectRequest.class);
                    boolean success = saveProject(projectRequest);
                    String message = success ? "Project saved successfully." : "Failed to save project.";
                    response = gson.toJson(new ApiResponse(success, message));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/projects/search":
                if (requestMethod.equalsIgnoreCase("GET")) {
                    String keyword = exchange.getRequestURI().getQuery().split("=")[1];
                    List<Project> projects = searchProjects(keyword);
                    response = gson.toJson(new ProjectsResponse(true, "Projects retrieved successfully.", projects));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/projects/":
                if (requestMethod.equalsIgnoreCase("DELETE")) {
                    String projectId = requestPath.substring(requestPath.lastIndexOf("/") + 1);
                    boolean success = deleteProject(projectId);
                    String message = success ? "Project deleted successfully." : "Failed to delete project.";
                    response = gson.toJson(new ApiResponse(success, message));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/terms":
                if (requestMethod.equalsIgnoreCase("GET")) {
                    List<Term> terms = getTerms();
                    response = gson.toJson(new TermsResponse(true, "Terms retrieved successfully.", terms));
                    sendResponse(exchange, 200, response);
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    TermRequest termRequest = gson.fromJson(requestBody, TermRequest.class);
                    boolean success = addTerm(termRequest);
                    String message = success ? "Term addedsuccessfully." : "Failed to add term.";
                    response = gson.toJson(new ApiResponse(success, message));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/terms/search":
                if (requestMethod.equalsIgnoreCase("GET")) {
                    String keyword = exchange.getRequestURI().getQuery().split("=")[1];
                    List<Term> terms = searchTerms(keyword);
                    response = gson.toJson(new TermsResponse(true, "Terms retrieved successfully.", terms));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/terms/":
                if (requestMethod.equalsIgnoreCase("DELETE")) {
                    String termId = requestPath.substring(requestPath.lastIndexOf("/") + 1);
                    boolean success = deleteTerm(termId);
                    String message = success ? "Term deleted successfully." : "Failed to delete term.";
                    response = gson.toJson(new ApiResponse(success, message));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/files/":
                if (requestMethod.equalsIgnoreCase("GET")) {
                    String fileId = requestPath.substring(requestPath.lastIndexOf("/") + 1);
                    Path filePath = Paths.get(UPLOAD_DIR, fileId);
                    if (Files.exists(filePath)) {
                        String fileContent = new String(Files.readAllBytes(filePath));
                        response = gson.toJson(new FileContentResponse(true, "File content retrieved successfully.", fileContent));
                        sendResponse(exchange, 200, response);
                    } else {
                        sendResponse(exchange, 404, "File not found.");
                    }
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            case "/api/translate":
                if (requestMethod.equalsIgnoreCase("POST")) {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    TranslationRequest translationRequest = gson.fromJson(requestBody, TranslationRequest.class);
                    String translatedContent = translateContent(translationRequest.getContent(), translationRequest.getSourceLang(), translationRequest.getTargetLang());
                    response = gson.toJson(new TranslationResponse(true, "Content translated successfully.", translatedContent));
                    sendResponse(exchange, 200, response);
                } else {
                    sendResponse(exchange, 405, "Method not allowed.");
                }
                break;
            default:
                sendResponse(exchange, 404, "Endpoint not found.");
                break;
        }
    }
}