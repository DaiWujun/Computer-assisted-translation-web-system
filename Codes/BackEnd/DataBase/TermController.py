class TerminologyController:
    @staticmethod
    def add_term(term, definition='', context='', source='', category=''):
        """
        添加一条术语

        参数:
        - term: 术语
        - definition: 定义
        - context: 上下文
        - source: 来源
        - category: 分类

        返回值:
        - 添加成功返回True，否则返回False
        """
        return TermDAO.add_term(term, definition, context, source, category)

    @staticmethod
    def search_by_term(term):
        """
        根据术语查询术语

        参数:
        - term: 术语

        返回值:
        - 查询到的术语数据列表
        """
        return TermDAO.search_by_term(term)

    @staticmethod
    def search_by_category(category):
        """
        根据分类查询术语

        参数:
        - category: 分类

        返回值:
        - 查询到的术语数据列表
        """
        return TermDAO.search_by_category(category)

    @staticmethod
    def update_term(term_id, term, definition='', context='', source='', category=''):
        """
        更新一条术语

        参数:
        - term_id: 术语ID
        - term: 术语
        - definition: 定义
        - context: 上下文
        - source: 来源
        - category: 分类

        返回值:
        - 更新成功返回True，否则返回False
        """
        return TermDAO.update_term(term_id, term, definition, context, source, category)

    @staticmethod
    def delete_term(term_id):
        """
        删除一条术语

        参数:
        - term_id: 术语ID

        返回值:
        - 删除成功返回True，否则返回False
        """
        return TermDAO.delete_term(term_id)

    @staticmethod
    def export_backup_term(backup_file):
        """
        导出备份

        参数:
        - backup_file: 备份文件路径

        返回值:
        - 导出成功返回True，否则返回False
        """
        return TermDAO.export_backup_term(backup_file)

    @staticmethod
    def get_id_by_term(term):
        """
        根据术语获取术语ID

        参数:
        - term: 术语

        返回值:
        - 术语ID，如果未找到则返回None
        """
        return TermDAO.get_id_by_term(term)
