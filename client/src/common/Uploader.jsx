import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

export const Uploader = () => {
  const { request, loading, setError } = useHttp()
  const history = useHistory()
  const { token } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null)

  const fetchData = useCallback(async () => {
    if (file) {
      try {
        const data = new FormData()
        data.append('sheet', file)

        const config = {
          headers: {
            'content-type': 'multipart/form-data: boundary=hzbudhszbduhzsbdhGUVgfYFcTdc',
          },
        }
        axios.post('/api/data', data, config).then(data => {
          console.log('fetchData -> data', data)

          history.push('/sdsd')
        })
      } catch (e) {
        setError(e)
      }
    }
  }, [token, request, file])

  useEffect(() => {
    fetchData()
  }, [file])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSave = files => {
    setFile(files[0])
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Загрузить файл</Button>
      <DropzoneDialog
        open={isOpen}
        onSave={handleSave}
        maxFileSize={5000000}
        onClose={handleClose}
        showPreviews={false}
        showPreviewsInDropzone={true}
        filesLimit={1}
        acceptedFiles={['.xlsx', '.csv']}
      />
    </div>
  )
}
