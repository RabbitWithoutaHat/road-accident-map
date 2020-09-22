const { Router } = require('express')
const XLSX = require('xlsx')
const upload = require('../middleware/upload.middleware')
const Accident = require('../models/Accident')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const accidentList = await Accident.find()
    res.status(200).json(accidentList)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить данные',
    })
  }
})

router.post('/', upload, async (req, res) => {
  try {
    const workbook = XLSX.readFile(`./data/${req.file.filename}`)
    XLSX.utils.sheet_to_json
    const sheet_name_list = workbook.SheetNames
    const data = []
    console.time('writedata')

    sheet_name_list.forEach(function(y) {
      const worksheet = workbook.Sheets[y]
      const headers = {}
      for (z in worksheet) {
        if (z[0] === '!') continue
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
        if (headers[col] === 'latitude' && (value > 56.716176 || value < 53.94944)) {
          continue
        }
        if (headers[col] === 'longitude' && (value > 54.344333 || value < 47.148289)) {
          continue
        }

        if (!data[row]) data[row] = {}
        data[row][headers[col]] = value
      }
      data.forEach(async (item, index) => {
        try {
          const { latitude, longitude, location, ...rest } = item
          const acceptedGeometry =
            latitude < 56.716176 &&
            latitude > 53.94944 &&
            longitude < 54.344333 &&
            longitude > 47.148289

          if (index > 1 && acceptedGeometry) {
            const accident = new Accident({
              location: location,
              date: new Date(item['Дата']),
              id: item['Номер'],
              died: item['Погибло'],
              injured: item['Ранено'],
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [latitude, longitude] },
              properties: {
                balloonContent: rest,
              },
            })
            await accident.save()
          }
        } catch (error) {}
      })
    })

    console.log('data.length', data.lenth)
    console.timeEnd('writedata')
    return res.status(200)
  } catch (error) {
    return res.status(500).json({
      message: 'Данные не загружены',
    })
  }
})

module.exports = router
