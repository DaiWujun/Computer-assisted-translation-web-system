
const express = require('express');
const multer = require('multer');
const mammoth = require('mammoth');
const pdf = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const fileType = file.originalname.split('.').pop();
    switch (fileType) {
        case 'docx':
            mammoth.extractRawText({ path: file.path })
                .then(result => {
                    fs.unlinkSync(file.path); // Delete file after processing
                    res.json({ text: result.value });
                })
                .catch(err => {
                    res.status(500).send('Error processing Word file');
                });
            break;
        case 'pdf':
            const dataBuffer = fs.readFileSync(file.path);
            pdf(dataBuffer)
                .then(data => {
                    fs.unlinkSync(file.path); // Delete file after processing
                    res.json({ text: data.text });
                })
                .catch(err => {
                    res.status(500).send('Error processing PDF file');
                });
            break;
        case 'xlsx':
            const workbook = xlsx.readFile(file.path);
            const sheetNameList = workbook.SheetNames;
            let text = '';
            sheetNameList.forEach(sheetName => {
                const XL_row_object = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                text += JSON.stringify(XL_row_object);
            });
            fs.unlinkSync(file.path); // Delete file after processing
            res.json({ text: text });
            break;
        default:
            res.status(400).send('Unsupported file type');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
