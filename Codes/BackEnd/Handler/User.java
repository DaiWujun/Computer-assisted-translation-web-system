import java.sql.*;
//记录用户信息
public class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    //用户身份验证
    public static boolean validateUser(String username, String password) {
        String sql = "SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ?";
        try (Connection conn = DriverManager.getConnection("待定", "username", "password");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    int count = rs.getInt("count");
                    return count == 1;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
