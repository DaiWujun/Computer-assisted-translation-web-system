import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
//术语库的实现
public class TerminologyController {
    private MemoryLibrary db;//数据库目前使用python实现

    public TerminologyController(Connection conn) {
        db = new MemoryLibrary(conn);
    }


    //获取该用户的所有术语信息
    public List<Terminology> getAllTerminologies(String username) {
        List<Terminology> terminologies = new ArrayList<>();
        try {
            ResultSet rs = db.search_by_username(username);
            while (rs.next()) {
                int id = rs.getInt("id");
                String term = rs.getString("term");
                String definition = rs.getString("definition");
                String context = rs.getString("context");
                String source = rs.getString("source");
                String category = rs.getString("category");
                Terminology terminology = new Terminology(id, term, definition, context, source, category);
                terminologies.add(terminology);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return terminologies;
    }

    //根据关键词和用户名搜索术语记录
    public List<Terminology> searchTerminologies(String keyword, String username) {
        List<Terminology> terminologies = new ArrayList<>();
        try {
            ResultSet rs = db.search_by_term(keyword, username);
            while (rs.next()) {
                int id = rs.getInt("id");
                String term = rs.getString("term");
                String definition = rs.getString("definition");
                String context = rs.getString("context");
                String source = rs.getString("source");
                String category = rs.getString("category");
                Terminology terminology = new Terminology(id, term, definition, context, source, category);
                terminologies.add(terminology);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return terminologies;
    }

    //新建术语功能
    public int createTerminology(Terminology terminology, String username) {
        try {
            int id = db.add_term(terminology.getTerm(), terminology.getDefinition(), terminology.getContext(), terminology.getSource(), terminology.getCategory(), username);
            return id;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    //修改术语功能
    public void updateTerminology(Terminology terminology, String username) {
        try {
            db.update_term(terminology.getId(), terminology.getTerm(), terminology.getDefinition(), terminology.getContext(), terminology.getSource(), terminology.getCategory(), username);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //删除术语功能
    public void deleteTerminology(int id, String username) {
        try {
            db.delete_term(id, username);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public int getTerminologyIdByTerm(String term, String username) {
        try {
            int id = db.get_id_by_term(term, username);
            return id;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
