import React, { useEffect, useState, useContext, useCallback } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

export const Uploader = () => {
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)
  console.log('Uploader -> token', token)
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null)
  console.log('fetchData -> 111files', file)

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
        axios.post('/api/data', data, config)
      } catch (e) {}
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
        // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  )
}
