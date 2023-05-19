class MemoryController:
    @staticmethod
    def add_memory(memory, definition='', context='', source='', category=''):
        """
        添加一条记忆

        参数:
        - memory: 记忆文本
        - definition: 定义
        - context: 上下文
        - source: 来源
        - category: 分类

        返回值:
        - 添加成功返回True，否则返回False
        """
        return MemoryDAO.add_memory(memory, definition, context, source, category)

    @staticmethod
    def search_by_memory(memory):
        """
        根据记忆文本查询记忆

        参数:
        - memory: 记忆文本

        返回值:
        - 查询到的记忆数据列表
        """
        return MemoryDAO.search_by_memory(memory)

    @staticmethod
    def search_by_category(category):
        """
        根据分类查询记忆

        参数:
        - category: 分类

        返回值:
        - 查询到的记忆数据列表
        """
        return MemoryDAO.search_by_category(category)

    @staticmethod
    def update_memory(memory_id, memory, definition='', context='', source='', category=''):
        """
        更新一条记忆

        参数:
        - memory_id: 记忆ID
        - memory: 记忆文本
        - definition: 定义
        - context: 上下文
        - source: 来源
        - category: 分类

        返回值:
        - 更新成功返回True，否则返回False
        """
        return MemoryDAO.update_memory(memory_id, memory, definition, context, source, category)

    @staticmethod
    def delete_memory(memory_id):
        """
        删除一条记忆

        参数:
        - memory_id: 记忆ID

        返回值:
        - 删除成功返回True，否则返回False
        """
        return MemoryDAO.delete_memory(memory_id)

    @staticmethod
    def export_backup_memory(backup_file):
        """
        导出备份

        参数:
        - backup_file: 备份文件路径

        返回值:
        - 导出成功返回True，否则返回False
        """
        return MemoryDAO.export_backup_memory(backup_file)

    @staticmethod
    def get_id_by_memory(memory):
        """
        根据记忆文本获取记忆ID

        参数:
        - memory: 记忆文本

        返回值:
        - 记忆ID，如果未找到则返回None
        """
        return MemoryDAO.get_id_by_memory(memory)
