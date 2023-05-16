// POST /translations：新建一个翻译。请求体应该是一个 JSON 对象，包含 text 和 translation 两个属性，分别代表原文和译文。
// GET /translations/:id：根据 ID 获取一个翻译的详细信息。
// PUT /translations/:id：根据 ID 更新一个翻译。请求体应该是一个 JSON 对象，包含 text 和 translation 两个属性，分别代表新的原文和译文。
// DELETE /translations/:id：根据 ID 删除一个翻译。
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/translationDB', { useNewUrlParser: true, useUnifiedTopology: true });

const translationSchema = new mongoose.Schema({
    text: String,
    translation: String
});

const Translation = mongoose.model('Translation', translationSchema);

app.post('/translations', async (req, res) => {
    const { text, translation } = req.body;
    const newTranslation = new Translation({ text, translation });
    await newTranslation.save();
    res.status(201).send('Translation created');
});

app.get('/translations/:id', async (req, res) => {
    const translation = await Translation.findById(req.params.id);
    if (translation) {
        res.json(translation);
    } else {
        res.status(404).send('Translation not found');
    }
});

app.put('/translations/:id', async (req, res) => {
    const { text, translation } = req.body;
    const updatedTranslation = await Translation.findByIdAndUpdate(req.params.id, { text, translation }, { new: true });
    if (updatedTranslation) {
        res.json(updatedTranslation);
    } else {
        res.status(404).send('Translation not found');
    }
});

app.delete('/translations/:id', async (req, res) => {
    const deletedTranslation = await Translation.findByIdAndDelete(req.params.id);
    if (deletedTranslation) {
        res.status(204).send('Translation deleted');
    } else {
        res.status(404).send('Translation not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
