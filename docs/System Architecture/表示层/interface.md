### 主界面组件接口

dragAndDrop(file: File): void - 拖拽文件并将其放入翻译界面。

selectLanguage(lang: string): void - 选择翻译结果语言。

openTranslationMemory(): void - 跳转到翻译记忆库管理界面。

openTerminology(): void - 跳转到术语库管理界面。

### 翻译记忆库管理界面组件接口

showTranslationHistory(projects: TranslationProject[]): void - 展示历史翻译项目。

searchTranslationProject(keyword: string): void - 搜索翻译项目。

openMain(): void - 跳转到主界面。

openTerminology(): void - 跳转到术语库管理界面。

deleteTranslationProject(projectId: string): void - 删除翻译项目。

openTranslation(projectId: string): void - 进入翻译界面。

### 术语库管理界面组件接口

openMain(): void - 跳转到主界面。

openTranslationMemory(): void - 跳转到翻译记忆库管理界面。

deleteTerminology(termId: string): void - 删除术语。

editTerminology(termId: string): void - 编辑术语。

addTerminology(term: Terminology): void - 添加术语。

searchTerminology(keyword: string): void - 搜索术语。

### 翻译界面组件接口

splitDocument(doc: Document): void - 文档分段。

mergeDocument(docs: Document[]): void - 文档合并。

selectMTEngine(engine: MT): void - 选择MT引擎接口。

spellCheck(doc: Document): void - 拼写检查。

autoComplete(): void - 自动完成。
