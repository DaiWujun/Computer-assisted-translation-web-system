### 翻译记忆库数据存储模块接口

storeTranslationProject(project: TranslationProject): void - 将翻译项目存储到数据库中。

retrieveTranslationProject(projectId: string): TranslationProject - 从数据库中检索翻译项目。

deleteTranslationProject(projectId: string): void - 从数据库中删除翻译项目。

searchTranslationProject(keyword: string): TranslationProject[] - 根据关键字从数据库中检索翻译项目。

retrieveAllTranslationProjects(): TranslationProject[] - 从数据库中检索所有翻译项目。

### 术语库数据存储模块接口

storeTerminology(term: Terminology): void - 将术语存储到数据库中。

retrieveTerminology(termId: string): Terminology - 从数据库中检索术语。

deleteTerminology(termId: string): void - 从数据库中删除术语。

searchTerminology(keyword: string): Terminology[] - 根据关键字从数据库中检索术语。

retrieveAllTerminology(): Terminology[] - 从数据库中检索所有术语。

### 数据库存储组件接口

connectToDatabase(databaseUrl: string): void - 连接到数据库。

disconnectFromDatabase(): void - 断开数据库连接。

createTable(tableName: string, schema: object): void - 在数据库中创建一个新表。

insertRecord(tableName: string, record: object): void - 向数据库中的表中插入一条记录。

updateRecord(tableName: string, recordId: string, record: object): void - 更新数据库中表中的一条记录。

deleteRecord(tableName: string, recordId: string): void - 从数据库中删除表中的一条记录。

getRecordById(tableName: string, recordId: string): object - 根据记录ID从数据库中获取一条记录。

getAllRecords(tableName: string): object[] - 从数据库中获取表中的所有记录。
