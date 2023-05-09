### 翻译管理组件

创建翻译项目：createTranslation(sourceText: str, targetLanguage: str) -> str，创建一个新的翻译项目，参数为源语言文本和目标语言。

删除翻译项目：deleteTranslation(translationId: str) -> bool，删除指定id的翻译项目，返回删除操作是否成功的布尔值。

修改翻译项目：updateTranslation(translationId: str, sourceText: str, targetLanguage: str) -> bool，修改指定id的翻译项目，返回修改操作是否成功的布尔值。

查询翻译项目：getTranslation(translationId: str) -> dict，查询指定id的翻译项目，返回该项目的详细信息，包括源语言文本和目标语言。

### 术语管理组件

创建术语：createTerminology(term: str, definition: str) -> str，创建一个新的术语，参数为术语名称和定义。

删除术语：deleteTerminology(termId: str) -> bool，删除指定id的术语，返回删除操作是否成功的布尔值。

修改术语：updateTerminology(termId: str, term: str, definition: str) -> bool，修改指定id的术语，返回修改操作是否成功的布尔值。

查询术语：getTerminology(termId: str) -> dict，查询指定id的术语，返回该术语的详细信息，包括名称和定义。

搜索术语：searchTerminology(query: str) -> List[dict]，根据查询词返回符合条件的术语列表，每个术语的详细信息包括名称和定义。

### 翻译处理组件

调用MT引擎接口：callMT(sourceText: str, targetLanguage: str, engine: str) -> str，调用指定MT引擎进行翻译，返回翻译后的目标语言文本。

分段文本：splitText(sourceText: str, maxSegmentSize: int) -> List[str]，将文本分段，每段的大小不超过maxSegmentSize，返回分段后的文本列表。

合并文本：mergeText(segmentList: List[str]) -> str，将文本段列表合并成一个完整的文本，返回合并后的文本。

拼写检查：spellCheck(text: str) -> List[str]，对指定文本进行拼写检查，返回可能存在拼写错误的单词列表。

自动完成：autoComplete(query: str) -> List[str]，根据查询词返回可能的自动完成建议列表。

### 翻译记忆库组件

创建翻译记忆库：createTM(sourceLanguage: str, targetLanguage: str) -> str，创建一个新的翻译记忆库，参数为源语言和目标语言

删除翻译记忆库：deleteTM(tmId: str) -> bool，删除指定id的翻译记忆库，返回删除操作是否成功的布尔值。

添加翻译条目：addTMEntry(tmId: str, sourceText: str, targetText: str) -> str，向指定id的翻译记忆库中添加一条翻译条目，参数为源语言文本和目标语言文本。

删除翻译条目：deleteTMEntry(tmId: str, tmEntryId: str) -> bool，删除指定id的翻译记忆库中指定id的翻译条目，返回删除操作是否成功的布尔值。

修改翻译条目：updateTMEntry(tmId: str, tmEntryId: str, sourceText: str, targetText: str) -> bool，修改指定id的翻译记忆库中指定id的翻译条目，返回修改操作是否成功的布尔值。

查询翻译条目：getTMEntry(tmId: str, tmEntryId: str) -> dict，查询指定id的翻译记忆库中指定id的翻译条目，返回该条目的详细信息，包括源语言文本和目标语言文本。

搜索翻译条目：searchTM(tmId: str, query: str) -> List[dict]，在指定id的翻译记忆库中根据查询词返回符合条件的翻译条目列表，每个条目的详细信息包括源语言文本和目标语言文本。
