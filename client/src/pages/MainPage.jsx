import React , {useState} from 'react'
import { Map } from '../common/Map'
import { Uploader } from '../common/Uploader'
import Dropdown from '../common/Dropdown'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: 'column'
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
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
  const [year, setYear] = useState(2018)
  console.log('log->: MainPage -> year', year)
  const onChange =(date) => {
    setYear(date)
  }
  return (
    <div className={classes.container}>
      <div className={classes.button}>
        <Dropdown onChange={onChange} value/>
        {auth && <Uploader />}
      </div>
      <div className={classes.map}>
      <Map year={year}/>
      </div>
    </div>
  )
}
