import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

export function ModalBodySpinner() {
  return (
    <Modal.Body className='d-flex justify-content-center m-5'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Modal.Body>
  )
}

export function ModalBodyError({ children }) {
  return (
    <Modal.Body>
      <Alert variant='danger'>{children}</Alert>
    </Modal.Body>
  )
}

export function ModalButtons({
  submitID,
  cancelID,
  hideModalDispatch,
  isLoading,
  buttonVariant,
  buttonText,
  buttonType,
  buttonOnClick
}) {
  const submitButtonContent = (
    <>
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
        hidden={!isLoading}
      />
      <span className='mx-2'>{buttonText}</span>
    </>
  )

  return (
    <Modal.Footer>
      <Button
        variant='secondary'
        id={cancelID}
        onClick={hideModalDispatch}
        disabled={isLoading}>
        Cancel
      </Button>
      <Button
        type={buttonType}
        variant={buttonVariant}
        id={submitID}
        onClick={buttonOnClick}
        disabled={isLoading}>
        {submitButtonContent}
      </Button>
    </Modal.Footer>
  )
}

ModalButtons.defaultProps = {
  buttonText: 'Save',
  buttonVariant: 'primary',
  buttonType: 'submit'
}

export function DeleteConfirmModal({
  show,
  hideDispatch,
  title,
  children,
  cancelID,
  confirmID,
  handleConfirm,
  confirmButton,
  prefetchResult,
  deleteResult
}) {
  if (
    (prefetchResult?.isLoading || prefetchResult?.isFetching,
    prefetchResult?.isUninitialized)
  ) {
    return (
      <Modal show={show} onHide={hideDispatch}>
        <Modal.Header closeButton>Loading Forum Thread</Modal.Header>
        <ModalBodySpinner />
      </Modal>
    )
  }

  if (prefetchResult?.isError) {
    return (
      <Modal show={show} onHide={hideDispatch}>
        <Modal.Header closeButton>Error Loading Forum Thread</Modal.Header>

        <ModalBodyError>
          {prefetchResult.error.status}: {prefetchResult.error.data?.Error}
        </ModalBodyError>
      </Modal>
    )
  }

  const alert = deleteResult.isError ? (
    <Alert variant='danger'>
      Error {deleteResult.error.status}:{' '}
      {JSON.stringify(deleteResult.error.data)}
    </Alert>
  ) : null

  return (
    <Modal show={show} onHide={hideDispatch}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert}
        {children}
      </Modal.Body>
      <ModalButtons
        submitID={confirmID}
        cancelID={cancelID}
        hideModalDispatch={hideDispatch}
        isLoading={deleteResult.isLoading}
        buttonVariant='danger'
        buttonText={confirmButton}
        buttonType='button'
        buttonOnClick={handleConfirm}
      />
    </Modal>
  )
}
