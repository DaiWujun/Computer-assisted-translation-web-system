// POST /projects：新建一个翻译项目。请求体应该是一个 JSON 对象，包含 id、name 和 documents 三个属性，分别代表项目 ID、项目名称和项目包含的文档列表。
// GET /projects/:id：根据 ID 获取一个翻译项目的详细信息。
// GET /projects：获取所有翻译项目的列表。
const express = require('express');
const app = express();
app.use(express.json());

let projects = {};

app.post('/projects', (req, res) => {
    const { id, name, documents } = req.body;
    if (id && name && documents) {
        projects[id] = { name: name, documents: documents };
        res.status(201).send('Project created');
    } else {
        res.status(400).send('Bad request');
    }
});

app.get('/projects/:id', (req, res) => {
    const project = projects[req.params.id];
    if (project) {
        res.json(project);
    } else {
        res.status(404).send('Project not found');
    }
});

app.get('/projects', (req, res) => {
    res.json(projects);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});