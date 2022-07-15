import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

export function ForumMessageForm({
  error,
  titleID,
  titleValue,
  textID,
  textValue
}) {
  let alert = null
  if (error) {
    alert = (
      <Alert variant='danger'>{`${error.status}: ${error.data.Error}`}</Alert>
    )
  }
  return (
    <Modal.Body>
      <Stack>
        {alert}
        <FloatingLabel controlId={titleID} label='Title' className='mb-3'>
          <Form.Control
            type='text'
            name='title'
            placeholder='Title'
            defaultValue={titleValue}
          />
        </FloatingLabel>
        <FloatingLabel controlId={textID} label='Text' className='mb-3'>
          <Form.Control
            as='textarea'
            rows={5}
            className='h-100'
            name='text'
            placeholder='Text'
            defaultValue={textValue}
          />
        </FloatingLabel>
      </Stack>
    </Modal.Body>
  )
}
