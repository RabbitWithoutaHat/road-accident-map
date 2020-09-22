import React, { useEffect, useState, useContext, useCallback } from 'react'
// import { YMaps, Map as DefaultMap, ObjectManager } from 'react-yandex-maps'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
    paddingBottom: 40,
    width: '75vw',
    height: '100vh',
  },
}))

export const Map = () => {
  const classes = useStyles()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()

  const [markers, setMarkers] = useState({})

  const getMarkers = useCallback(async () => {
    try {
      const fetched = await request(`/api/data`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setMarkers(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getMarkers()
  }, [])

  useEffect(() => {
    console.log('getMarkers -> markers.length', markers.length)
    if (markers.length) {
      window.ymaps.ready(init)
    }
  }, [markers])

  const init = () => {
    var myMap = new window.ymaps.Map(
        'map',
        {
          center: [55.746395, 49.128817],
          zoom: 10,
        },
        {
          searchControlProvider: 'yandex#search',
        },
      ),
      objectManager = new window.ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      })

    objectManager.objects.options.set('preset', 'islands#greenDotIcon')
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons')
    myMap.geoObjects.add(objectManager)

    objectManager.add({ type: 'FeatureCollection', features: markers })
  }

  const features = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 0,
        geometry: {
          type: 'Point',
          coordinates: [55.831903, 37.411961],
        },
        properties: {
          balloonContent: 'Магазин на углу',
          data: {
            organization: 'shop',
            open: '9am - 9pm',
          },
        },
      },
      {
        type: 'Feature',
        id: 1,
        geometry: {
          type: 'Point',
          coordinates: [55.763338, 37.565466],
        },
        properties: {
          // balloonContent: 'Аптека',
          data: {
            organization: 'pharmacy',
            open: '8am - 10pm',
          },
        },
      },
    ],
  }

  return <div id="map" style={{ width: '75vw', height: '70vh' }}></div>
}
