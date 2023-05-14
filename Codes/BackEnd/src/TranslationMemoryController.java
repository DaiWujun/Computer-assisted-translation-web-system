import java.sql.*;
import java.util.ArrayList;

//翻译记忆库
public class TranslationMemoryController {
    private MemoryLibrary memoryLibrary;

    public TranslationMemoryController(Connection conn) {
        this.memoryLibrary = new MemoryLibrary(conn);
    }

    // 获取所有项目列表
    public List<TranslationMemory> getAllMemories() {
        List<TranslationMemory> memories = new ArrayList<>();
        try {
            ResultSet rs = memoryLibrary.selectAllMemories();
            while (rs.next()) {
                int id = rs.getInt("id");
                String memory = rs.getString("memory");
                String definition = rs.getString("definition");
                String context = rs.getString("context");
                String source = rs.getString("source");
                String category = rs.getString("category");
                TranslationMemory tm = new TranslationMemory(id, memory, definition, context, source, category);
                memories.add(tm);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return memories;
    }

    // 添加新项目
    public void addMemory(TranslationMemory tm) {
        try {
            memoryLibrary.addMemory(tm.getMemory(), tm.getDefinition(), tm.getContext(), tm.getSource(), tm.getCategory());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 修改项目
    public void updateMemory(int id, String memory, String definition, String context, String source, String category) {
        try {
            memoryLibrary.updateMemory(id, memory, definition, context, source, category);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 删除项目
    public void deleteMemory(int id) {
        try {
            memoryLibrary.deleteMemory(id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 搜索项目
    public List<TranslationMemory> searchMemories(String keyword) {
        List<TranslationMemory> memories = new ArrayList<>();
        try {
            ResultSet rs = memoryLibrary.searchMemoryByKeyword(keyword);
            while (rs.next()) {
                int id = rs.getInt("id");
                String memory = rs.getString("memory");
                String definition = rs.getString("definition");
                String context = rs.getString("context");
                String source = rs.getString("source");
                String category = rs.getString("category");
                TranslationMemory tm = new TranslationMemory(id, memory, definition, context, source, category);
                memories.add(tm);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return memories;
    }
}
