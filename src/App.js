import { useEffect, useRef, useState } from 'react'
import Form from './Form'
import TableForm from './TableForm'
import axios from 'axios'
import './app.css'

const App = () => {

  const [data, setData] = useState([])
  const [updating, setUpdating] = useState(false)

  const inputName = useRef()
  const inputEmail = useRef()
  const inputID = useRef()

  const baseURL = 'http://localhost:3333/users'

  const onFetch = (url, method, data) => {
    axios({ url, method, data })
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    onFetch(baseURL, 'GET')
  }, [])

  const handleSelect = selectdeUser => {
    inputID.current.value = selectdeUser.id
    inputName.current.value = selectdeUser.name
    inputEmail.current.value = selectdeUser.email
    inputName.current.focus()
    setUpdating(true)
  }

  const handleInsert = () => {
    const user = createUser()

    if (user.name && user.email) {
      onFetch(baseURL, 'POST', user)
      inputName.current.focus()
      clearFields()
    }
  }

  const handleUpdate = () => {
    const user = createUser()

    if (user.name && user.email) {
      onFetch(baseURL, 'PUT', user)
      setUpdating(false)
      inputName.current.focus()
      clearFields()
    }
  }

  const handleDelete = (event, id) => {
    event.stopPropagation()
    onFetch(`${baseURL}/${id}`, 'DELETE')
    inputName.current.focus()
  }

  const createUser = () => {
    const id = inputID.current.valueAsNumber
    const name = inputName.current.value
    const email = inputEmail.current.value
    return { id, name, email }
  }

  const handleClear = () => {
    clearFields()
    setUpdating(false)
  }

  const clearFields = () => {
    inputID.current.value = ''
    inputName.current.value = ''
    inputEmail.current.value = ''
  }

  return (
    <div className="container">
      <Form onInsert={handleInsert}
        onUpdate={handleUpdate}
        onClear={handleClear}
        nameRef={inputName}
        emailRef={inputEmail}
        idRef={inputID}
        updating={updating} />
      <br />
      <br />
      <TableForm data={data} onDelete={handleDelete}
        onSelect={handleSelect} />
    </div>
  )
}

export default App
