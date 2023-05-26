import java.sql.*;
//登录界面
public class LoginController {
    private User currentUser;

    public boolean login(String username, String password) {
        if (User.validateUser(username, password)) {
            return true;
        } else {
            return false;
        }
    }

    public User getCurrentUser() {
        return currentUser;
    }
}
