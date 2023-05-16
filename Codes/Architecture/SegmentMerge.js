// POST /segment：将一个文档分段。请求体应该是一个 JSON 对象，包含 document 属性，该属性的值是一个字符串。服务器将返回一个数组，包含文档中的各段。
// POST /merge：将多段文本合并为一个文档。请求体应该是一个 JSON 对象，包含 segments 属性，该属性的值是一个数组，包含要合并的各段文本。服务器将返回一个 JSON 对象，包含 document 属性，该属性的值是合并后的文档。
const express = require('express');
const app = express();
app.use(express.json());

app.post('/segment', (req, res) => {
    const { document } = req.body;
    if (document) {
        const segments = document.split('\n');
        res.json(segments);
    } else {
        res.status(400).send('Bad request');
    }
});

app.post('/merge', (req, res) => {
    const { segments } = req.body;
    if (segments) {
        const document = segments.join('\n');
        res.json({ document: document });
    } else {
        res.status(400).send('Bad request');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
