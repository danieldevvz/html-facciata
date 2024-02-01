const express = require('express');
const multer  = require('multer');

const app = express();

// Configura multer para subir archivos al directorio 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Aquí especificas el directorio de subida
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ status: 'OK' });
});

app.listen(3000, () => console.log('Server started on port 3000'));