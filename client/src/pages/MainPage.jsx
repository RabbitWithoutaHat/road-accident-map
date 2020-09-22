import React from 'react'
import { Map } from '../common/Map'
import { Uploader } from '../common/Uploader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: 'column'
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: 'flex-end',
  },
  map: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
  },
}))


export const MainPage = ({auth}) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.button}>
        {auth && <Uploader />}
      </div>
      <div className={classes.map}>
      <Map />
      </div>
    </div>
  )
}
