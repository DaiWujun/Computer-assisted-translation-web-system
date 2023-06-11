

class TermDAO:
    # 增加一条术语
    def add_term(term, definition='', context='', source='', category=''):
        add_query = ("INSERT INTO terms "
                    "(term, definition, context, source, category) "
                    "VALUES (%s, %s, %s, %s, %s)")
        data = (term, definition, context, source, category)
        cursor.execute(add_query, data)
        cnx.commit()
        return True

    # 根据术语查询
    def search_by_term(term):
        search_query = ("SELECT * FROM terms "
                        "WHERE term = %s")
        data = (term,)
        cursor.execute(search_query, data)
        result = cursor.fetchall()
        return result


    # 根据分类查询
    def search_by_category(category):
        search_query = ("SELECT * FROM terms "
                        "WHERE category = %s")
        data = (category,)
        cursor.execute(search_query, data)
        result = cursor.fetchall()
        return result


    # 更新一条术语
    def update_term(term_id, term, definition='', context='', source='', category=''):
        update_query = ("UPDATE terms "
                        "SET term=%s, definition=%s, context=%s, source=%s, category=%s "
                        "WHERE id=%s")
        data = (term, definition, context, source, category, term_id)
        cursor.execute(update_query, data)
        cnx.commit()
        return True

    # 删除一条术语
    def delete_term(term_id):
        delete_query = ("DELETE FROM terms "
                        "WHERE id=%s")
        data = (term_id,)
        cursor.execute(delete_query, data)
        cnx.commit()
        return True

    # 导出备份
    def export_backup_term(backup_file):
        with open(backup_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
        writer.writerow(['id', 'term', 'definition', 'context', 'source', 'category'])
        search_query = "SELECT * FROM terms"
        cursor.execute(search_query)
        results = cursor.fetchall()
        for result in results:
            writer.writerow(result)
        print(f"Backup exported to {backup_file}")
        return True

    #  根据条目查找id
    def get_id_by_term(term):
        search_query = ("SELECT id FROM terms "
                        "WHERE term = %s")
        data = (term,)
        cursor.execute(search_query, data)
        result = cursor.fetchone()
        if result:
            return result
        else:
            return None
