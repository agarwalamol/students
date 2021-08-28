const express = require('express')
const fs = require("fs");
const fastcsv = require("fast-csv");
const upload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000

app.use(upload())
const { models, sequelize } = require('./models/initSequelize')

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Students Node.js utlity.</h1><br><a href='/upload'>upload from csv</a>
        <br><a href='/all'>Get all students</a>
        <br><a href='/students?resultStatus=true'>Get Passed students</a><br>
        <a href='/students?resultStatus=false'>Get Failed students</a>`)
})

app.get('/all', (req, res) => {
  models.students.findAll()
    .then((ob) => {
      res.send(ob)
    })
})
app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/upload.html')
})

app.post('/', (req, res) => {

  if (req.files) {
    let count = 0
    let file = req.files.file
    let filename = file.name
    //console.log(filename)

    file.mv('./uploads/' + filename, function (err) {
      if (err) {
        res.send(err)
      }
      else {
        console.log('file uploaded successfully.')
        //res.send('File uploaded')
      }
    })
    let path = (__dirname + '/uploads/' + filename)
    let stream = fs.createReadStream(path);
    let csvData = [];
    let csvStream = fastcsv
      .parse()

      .on("data", function (data) {
        csvData.push(data);
      })

      .on("end", function () {
        csvData.shift();      // remove the first line: header      
        let fileExt = filename.split('.').pop();
        if (fileExt.toLowerCase() === 'csv') {
          insert(csvData)
            .then((ob) => {
              res.send(`Inserted ${ob} rows successfully.`)
            })
            .catch((e) => {
              res.send('Could not insert data', e)
            })
        }
        else {
          res.send('Please upload only .csv files in correct format!')
        }
      })


    const insert = async (data) => {
      try {
        for (let a of data) {
          const query = `INSERT INTO students (id, name, age, mark1, mark2, mark3) 
                  VALUES (${a[0]},'${a[1]}',${a[2]},${a[3]},${a[4]},${a[5]})`

          const [results, numberOfRowsInserted] = await sequelize.query(query)

          count = count + numberOfRowsInserted

          if (count == data.length) {
            return count
          }

        }
      }
      catch (error) {
        console.log(error)
      }
    }

    stream.pipe(csvStream);

  }
  else{
    res.send('No file selected')
  }
})

app.get('/students/:id', (req, res) => {
  const getResult = async () => {
    let id = req.params.id;
    let query = `select mark1, mark2, mark3 from students where id=${id}`
    let marksObj = await sequelize.query(query)
    let mark = marksObj[0]
    let mark1 = mark[0].mark1
    let mark2 = mark[0].mark2
    let mark3 = mark[0].mark3
    res.send(`<style>
      .demo {
        padding:5px;
      }
      .demo th {
        padding:5px;
      }
      .demo td {
        padding:5px;
      }
    </style>
    <table class="demo">
      <caption>Marks Search Result</caption>
      <thead>
      <tr>
        <th>Mark 1</th>
        <th>Mark 2</th>
        <th>Mark 3</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${mark1}</td>
        <td>${mark2}</td>
        <td>${mark3}</td>
      </tr>
      
      </tbody>
              </table>`)

  }
  getResult().then((o) => {
    console.log('done')
  })
    .catch((e) => {
      console.log('error', e)
    })
})

app.get('/students', (req, res) => {
  const getR = async () => {
    let st = req.query.resultStatus
    let query = ''
    if (st == true) {
      query = `select id, name from students where mark1 >40 and mark2 >40 and mark3 >40`
    }
    else {
      query = `select * from students where mark1 <40 or mark2 <40 or mark3 <40`
    }
    let marksObj = await sequelize.query(query)
    res.send((marksObj[0]))
  }

  getR().then((o) => {
    console.log('done')
  })
    .catch((e) => {
      console.log('error', e)
    })

})

app.listen(port, () => {
  console.log(`Students app listening at http://localhost:${port}`)
})