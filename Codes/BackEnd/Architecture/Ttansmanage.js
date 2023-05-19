// GET /translations：获取所有的翻译
// GET /translations/:source：根据源文本获取对应的翻译
// POST /translations：保存一个新的翻译。请求体应该是一个 JSON 对象，包含 source 和 target 两个属性，分别代表源文本和目标文本。
// DELETE /translations/:source：删除一条翻译
const express = require('express');
const app = express();
app.use(express.json());

let translationMemory = {};

app.get('/translations', (req, res) => {
    res.json(translationMemory);
});

app.get('/translations/:source', (req, res) => {
    const translation = translationMemory[req.params.source];
    if (translation) {
        res.json({ source: req.params.source, target: translation });
    } else {
        res.status(404).send('Translation not found');
    }
});

app.post('/translations', (req, res) => {
    const { source, target } = req.body;
    if (source && target) {
        translationMemory[source] = target;
        res.status(201).send('Translation saved');
    } else {
        res.status(400).send('Bad request');
    }
});

app.delete('/translations/:source', (req, res) => {
    delete translationMemory[req.params.source];
    res.send('Translation deleted');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
