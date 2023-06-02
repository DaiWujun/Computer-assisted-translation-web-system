import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class TermDAO
{
    private Connection connection;

    public TermDAO(Connection connection)
    {
        this.connection = connection;
    }

    // 增加一条术语
    public boolean addTerm(String term, String definition, String context, String source, String category)
    {
        String addQuery = "INSERT INTO terms (term, definition, context, source, category) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(addQuery))
        {
            statement.setString(1, term);
            statement.setString(2, definition);
            statement.setString(3, context);
            statement.setString(4, source);
            statement.setString(5, category);
            statement.executeUpdate();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 根据术语查询
    public List<String[]> searchByTerm(String term)
    {
        List<String[]> results = new ArrayList<>();
        String searchQuery = "SELECT * FROM terms WHERE term = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, term);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next())
            {
                String[] result = new String[6];
                result[0] = String.valueOf(resultSet.getInt("id"));
                result[1] = resultSet.getString("term");
                result[2] = resultSet.getString("definition");
                result[3] = resultSet.getString("context");
                result[4] = resultSet.getString("source");
                result[5] = resultSet.getString("category");
                results.add(result);
            }
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
        return results;
    }

    // 根据分类查询
    public List<String[]> searchByCategory(String category)
    {
        List<String[]> results = new ArrayList<>();
        String searchQuery = "SELECT * FROM terms WHERE category = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, category);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next())
            {
                String[] result = new String[6];
                result[0] = String.valueOf(resultSet.getInt("id"));
                result[1] = resultSet.getString("term");
                result[2] = resultSet.getString("definition");
                result[3] = resultSet.getString("context");
                result[4] = resultSet.getString("source");
                result[5] = resultSet.getString("category");
                results.add(result);
            }
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
        return results;
    }

    // 更新一条术语
    public boolean updateTerm(int termId, String term, String definition, String context, String source,
            String category)
    {
        String updateQuery = "UPDATE terms SET term=?, definition=?, context=?, source=?, category=? WHERE id=?";
        try (PreparedStatement statement = connection.prepareStatement(updateQuery))
        {
            statement.setString(1, term);
            statement.setString(2, definition);
            statement.setString(3, context);
            statement.setString(4, source);
            statement.setString(5, category);
            statement.setInt(6, termId);
            statement.executeUpdate();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 删除一条术语
    public boolean deleteTerm(int termId)
    {
        String deleteQuery = "DELETE FROM terms WHERE id=?";
        try (PreparedStatement statement = connection.prepareStatement(deleteQuery))
        {
            statement.setInt(1, termId);
            statement.executeUpdate();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 导出备份
    public boolean exportBackupTerm(String backupFile)
    {
        String selectQuery = "SELECT * FROM terms";
        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(selectQuery);
                PrintWriter writer = new PrintWriter(new FileWriter(backupFile)))
        {
            writer.println("id,term,definition,context,source,category");
            while (resultSet.next())
            {
                int id = resultSet.getInt("id");
                String term = resultSet.getString("term");
                String definition = resultSet.getString("definition");
                String context = resultSet.getString("context");
                String source = resultSet.getString("source");
                String category = resultSet.getString("category");
                writer.println(id + "," + term + "," + definition + "," + context + "," + source + "," + category);
            }
            System.out.println("Backup exported to " + backupFile);
            return true;
        } catch (SQLException | IOException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 根据条目查找id
    public Integer getIdByTerm(String term)
    {
        String searchQuery = "SELECT id FROM terms WHERE term = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, term);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next())
            {
                return resultSet.getInt("id");
            }
            else
            {
                return null;
            }
        } catch (SQLException e)
        {
            e.printStackTrace();
            return null;
        }
    }
}
