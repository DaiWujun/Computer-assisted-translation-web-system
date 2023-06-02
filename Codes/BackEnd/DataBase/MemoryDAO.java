import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemoryDAO
{
    private Connection connection;

    public MemoryDAO(Connection connection)
    {
        this.connection = connection;
    }

    // 增加一条记忆
    public boolean addMemory(String memory, String definition, String context, String source, String category)
    {
        String addQuery = "INSERT INTO memorys (memory, definition, context, source, category) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(addQuery))
        {
            statement.setString(1, memory);
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

    // 根据记忆查询
    public List<String[]> searchByMemory(String memory)
    {
        List<String[]> results = new ArrayList<>();
        String searchQuery = "SELECT * FROM memorys WHERE memory = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, memory);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next())
            {
                String[] result = new String[6];
                result[0] = String.valueOf(resultSet.getInt("id"));
                result[1] = resultSet.getString("memory");
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
        String searchQuery = "SELECT * FROM memorys WHERE category = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, category);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next())
            {
                String[] result = new String[6];
                result[0] = String.valueOf(resultSet.getInt("id"));
                result[1] = resultSet.getString("memory");
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

    // 更新一条记忆
    public boolean updateMemory(int memoryId, String memory, String definition, String context, String source,
            String category)
    {
        String updateQuery = "UPDATE memorys SET memory=?, definition=?, context=?, source=?, category=? WHERE id=?";
        try (PreparedStatement statement = connection.prepareStatement(updateQuery))
        {
            statement.setString(1, memory);
            statement.setString(2, definition);
            statement.setString(3, context);
            statement.setString(4, source);
            statement.setString(5, category);
            statement.setInt(6, memoryId);
            statement.executeUpdate();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 删除一条记忆
    public boolean deleteMemory(int memoryId)
    {
        String deleteQuery = "DELETE FROM memorys WHERE id=?";
        try (PreparedStatement statement = connection.prepareStatement(deleteQuery))
        {
            statement.setInt(1, memoryId);
            statement.executeUpdate();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    // 导出备份
    public boolean exportBackupMemory(String backupFile)
    {
        String selectQuery = "SELECT * FROM memorys";
        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(selectQuery);
                PrintWriter writer = new PrintWriter(new FileWriter(backupFile)))
        {
            writer.println("id,memory,definition,context,source,category");
            while (resultSet.next())
            {
                int id = resultSet.getInt("id");
                String memory = resultSet.getString("memory");
                String definition = resultSet.getString("definition");
                String context = resultSet.getString("context");
                String source = resultSet.getString("source");
                String category = resultSet.getString("category");
                writer.println(id + "," + memory + "," + definition + "," + context + "," + source + "," + category);
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
    public Integer getIdByMemory(String memory)
    {
        String searchQuery = "SELECT id FROM memorys WHERE memory = ?";
        try (PreparedStatement statement = connection.prepareStatement(searchQuery))
        {
            statement.setString(1, memory);
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
