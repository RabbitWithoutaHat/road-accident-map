import React, { useEffect, useState, useContext, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { AuthContext } from '../context/AuthContext'
import Loader from './Loader'
import { useHttp } from '../hooks/http.hook'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
    paddingBottom: 40,
    width: '75vw',
    height: '100vh',
  },
  cardGrid: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
}))

export const Map = ({ year }) => {
  const classes = useStyles()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()

  const [markers, setMarkers] = useState({})

  const getMarkers = useCallback(async () => {
    try {
      const fetched = await request(`/api/data/${year}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setMarkers(fetched)
    } catch (e) {}
  }, [token, request, year])

  useEffect(() => {
    getMarkers()
  }, [year])

  useEffect(() => {
    console.log('getMarkers -> markers.length', markers.length)
    if (markers.length) {
      window.ymaps.ready(init)
    }
  }, [markers])

  const init = () => {
    const myMap = new window.ymaps.Map(
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
        gridSize: 30,
        clusterDisableClickZoom: true,
      })

    objectManager.objects.options.set('preset', 'islands#darkBlueIcon')
    objectManager.clusters.options.set('preset', 'islands#invertedRedClusterIcons')
    myMap.geoObjects.add(objectManager)

    objectManager.add({ type: 'FeatureCollection', features: markers })
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : !(markers.length > 0) ? (
        <Container className={classes.cardGrid}>Данные не загружены</Container>
      ) : (
        <div id="map" style={{ width: '100vw', height: '70vh' }}></div>
      )}
    </>
  )
}
