import java.util.ArrayList;
import java.util.List;

@Service
public class MemoryLibrary
{
    private final MemoryDAO memoryDAO;

    public MemoryLibrary(MemoryDAO memoryDAO)
    {
        this.memoryDAO = memoryDAO;
    }

    public boolean addMemory(String memory, String definition, String context, String source, String category)
    {
        // 调用 MemoryDAO 的 add_memory 方法
        return memoryDAO.addMemory(memory, definition, context, source, category);
    }

    public List<Memory> searchByMemory(String memory)
    {
        // 调用 MemoryDAO 的 search_by_memory 方法
        List<String[]> results = memoryDAO.searchByMemory(memory);

        // 将结果转换为 Memory 对象列表
        List<Memory> memories = new ArrayList<>();
        for (Object[] result : results)
        {
            Memory memoryObj = new Memory();
            memoryObj.setId((Long) result[0]);
            memoryObj.setMemory((String) result[1]);
            memoryObj.setDefinition((String) result[2]);
            memoryObj.setContext((String) result[3]);
            memoryObj.setSource((String) result[4]);
            memoryObj.setCategory((String) result[5]);
            memories.add(memoryObj);
        }

        return memories;
    }

    public List<Memory> searchByCategory(String category)
    {
        // 调用 MemoryDAO 的 search_by_category 方法
        List<String[]> results = memoryDAO.searchByCategory(category);

        // 将结果转换为 Memory 对象列表
        List<Memory> memories = new ArrayList<>();
        for (Object[] result : results)
        {
            Memory memoryObj = new Memory();
            memoryObj.setId((Long) result[0]);
            memoryObj.setMemory((String) result[1]);
            memoryObj.setDefinition((String) result[2]);
            memoryObj.setContext((String) result[3]);
            memoryObj.setSource((String) result[4]);
            memoryObj.setCategory((String) result[5]);
            memories.add(memoryObj);
        }

        return memories;
    }

    public boolean updateMemory(int memoryId, String memory, String definition, String context, String source,
            String category)
    {
        // 调用 MemoryDAO 的 update_memory 方法
        return memoryDAO.updateMemory(memoryId, memory, definition, context, source, category);
    }

    public boolean deleteMemory(int memoryId)
    {
        // 调用 MemoryDAO 的 delete_memory 方法
        return memoryDAO.deleteMemory(memoryId);
    }

    public boolean exportBackupMemory(String backupFile)
    {
        // 调用 MemoryDAO 的 export_backup_memory 方法
        return memoryDAO.exportBackupMemory(backupFile);
    }

    public int getIdByMemory(String memory)
    {
        // 调用 MemoryDAO 的 get_id_by_memory 方法
        Object result = memoryDAO.getIdByMemory(memory);
        if (result != null)
        {
            return (int) result;
        }
        else
        {
            return -1;
        }
    }
}
