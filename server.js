// // const express = require('express')
// import express from 'express';
// // const path = require('path')
// import path from 'path';

// const app = express()
// // const multer  = require('multer')
// import multer from 'multer';

// // const {mergePdfs}  = require('./testpdf')
// import mergePdfs from '../testpdf'

// const express = require('express')
// const path = require('path')
// const multer  = require('multer')
// const {mergePdfs}  = require('./testpdf')


import express from 'express';
import path from 'path';
// import { dirname } from 'path';
const __dirname = path.resolve();

import multer from 'multer';
import mergePdfs from './testpdf.js'
const app = express()



const upload = multer({ dest: 'uploads/' })
// const staticPath = path.join(__dirname, "./public");
// app.use(express.static(staticPath));
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"./templates/index.html"));
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  let d= await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})