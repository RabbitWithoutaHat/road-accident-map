const { Router } = require('express')
const XLSX = require('xlsx')
const upload = require('../middleware/upload.middleware')
const Accident = require('../models/Accident')

const router = Router()

router.get('/:year', async (req, res) => {
  const year = req.params.year
  if (year === 'All') {
    const accidentList = await Accident.find()
    res.status(200).json(accidentList)
  }
  const startDate = new Date(`01.01.${year}`)
  const endDate = new Date(`12.31.${year}`)
  try {
    const accidentList = await Accident.find({ date: { $gte: startDate, $lt: endDate } })
    res.status(200).json(accidentList)
  } catch (error) {
    console.log('error', error)
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

        if (!data[row]) data[row] = {}
        data[row][headers[col]] = value
      }
      data.forEach(async (item, index) => {
        try {
          const { latitude, longitude, location, ...rest } = item
          const acceptedGeometry =
            latitude < 57 && latitude > 53 && longitude < 56 && longitude > 45

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
                iconContent: item['Погибло'],
              },
              info: rest,
            })
            await accident.save()
          }
        } catch (error) {}
      })
    })

    console.timeEnd('writedata')
    console.log(data.length)
    return res.status(200).json({
      message: 'Данные загружены',
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Данные не загружены',
    })
  }
})

module.exports = router
