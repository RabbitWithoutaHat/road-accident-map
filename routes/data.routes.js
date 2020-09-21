const { Router } = require('express')
const XLSX = require('xlsx')
const upload = require('../middleware/upload.middleware')
const Accident = require('../models/Accident')

const router = Router()

router.post('/', upload, async (req, res) => {
  console.log('req', req.body)
  console.log('req')

  try {
    const workbook = XLSX.readFile(`./data/${req.file.filename}`)
    XLSX.utils.sheet_to_json
    const sheet_name_list = workbook.SheetNames
    console.log('sheet_name_list', sheet_name_list.length)
    const data = []

    sheet_name_list.forEach(function(y) {
      const worksheet = workbook.Sheets[y]
      const headers = {}
      for (z in worksheet) {
        if (z[0] === '!') continue
        //parse out the column, row, and value
        let tt = 0
        for (let i = 0; i < z.length; i++) {
          if (!isNaN(z[i])) {
            tt = i
            break
          }
        }
        const col = z.substring(0, tt)
        const row = parseInt(z.substring(tt))
        const value = worksheet[z].v

        //store header names
        if (row == 1 && value) {
          headers[col] = value
          continue
        }

        if (!data[row]) data[row] = {}
        data[row][headers[col]] = value
      }
      console.log(data[2])
      data.forEach(async (item, index) => {
        try {
          const { latitude, longitude, location, ...rest } = item
          if (index > 1) {
            const accident = new Accident({
              lat: latitude,
              lon: longitude,
              location: location,
              date: item['Дата'],
              number: item['Номер'],
              died: item['Погибло'],
              injured: item['Ранено'],
              info: rest,
            })
            await accident.save()
          }
        } catch (error) {
          console.log('error', error)
        }
      })
      console.log('test')
    })
    return res.status(200).json({
      test: data[3],
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      message: 'Ошибка авторизации',
    })
  }
})

module.exports = router
