// GET /glossary：获取所有的术语
// GET /glossary/:term：根据术语获取对应的翻译
// POST /glossary：保存一个新的术语及其翻译。请求体应该是一个 JSON 对象，包含 term 和 translation 两个属性。
// DELETE /glossary/:term：删除一条术语及其翻译
const express = require('express');
const app = express();
app.use(express.json());

let glossary = {};

app.get('/glossary', (req, res) => {
    res.json(glossary);
});

app.get('/glossary/:term', (req, res) => {
    const translation = glossary[req.params.term];
    if (translation) {
        res.json({ term: req.params.term, translation: translation });
    } else {
        res.status(404).send('Term not found');
    }
});

app.post('/glossary', (req, res) => {
    const { term, translation } = req.body;
    if (term && translation) {
        glossary[term] = translation;
        res.status(201).send('Term saved');
    } else {
        res.status(400).send('Bad request');
    }
});

app.delete('/glossary/:term', (req, res) => {
    delete glossary[req.params.term];
    res.send('Term deleted');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
