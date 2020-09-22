import React from 'react'
import { YMaps, Map as DefaultMap } from 'react-yandex-maps'
import { makeStyles } from '@material-ui/core/styles'

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

  return (
    <YMaps>
      <DefaultMap
        className={classes.container}
        defaultState={{ center: [55.75, 37.57], zoom: 11 }}
      />
    </YMaps>
  )
}
