import { FC, useState } from 'react'
import { INote } from '../features/models/types'
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../features/notes/api'
// MUI imports
import { styled } from '@mui/system'
import {
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Container } from '@mui/system'

// styled components

const MyTextField = styled(TextField)({
  marginBottom: 20,
  outlined: 'none',
  display: 'block',
})

const MyForm = styled('form')({
  marginTop: 20,
  padding: 15,
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  maxWidth: 500,
  margin: '1rem auto',
})

const MyButtonsBox = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
})

const MyGridContainer = styled(Grid)({
  width: '95vw',
  maxWidth: 1200,
  margin: '0 auto',
})

const MyPaper = styled(Paper)({
  width: 250,
  padding: 10,
})

const TitleBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
})

// interfaces
interface IAllNotesPageProps {
  notes: INote[]
}

const AllNotesPage: FC<IAllNotesPageProps> = ({ notes }) => {
  const [tempNote, setTempNote] = useState<INote | {}>({})
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [titleError, setTitleError] = useState<boolean>(false)
  const [contentError, setContentError] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const [createNote] = useCreateNoteMutation()
  const [updateNote] = useUpdateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()

  // create Note handlers
  const submitCreateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title === '') setTitleError(true)

    if (content === '') setContentError(true)

    if (title && content) {
      setTitleError(false)
      setContentError(false)
      createNote({ title, content } as INote)
      setTitle('')
      setContent('')
    }
  }

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (title !== '') setTitleError(false)
  }

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    if (content !== '') setContentError(false)
  }

  // update Note handlers

  const updateHandler = (note: INote) => {
    setIsUpdate(true)
    setTempNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const submitUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateNote({ ...tempNote, title, content } as INote)
    setTitle('')
    setContent('')
  }

  // delete Note handler

  const deleteHandler = (note: INote) => {
    deleteNote({ ...note })
  }

  return (
    <Container>
      {!isUpdate ? (
        // create new note
        <MyForm noValidate autoComplete='off' onSubmit={submitCreateHandler}>
          <MyTextField
            label='Title'
            fullWidth
            required
            error={titleError}
            value={title}
            onChange={titleHandler}
          />
          <MyTextField
            label='Take a note'
            required
            error={contentError}
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={contentHandler}
          />
          <MyButtonsBox>
            <Button type='submit'>create</Button>
          </MyButtonsBox>
        </MyForm>
      ) : (
        // update note
        <form noValidate autoComplete='off' onSubmit={submitUpdateHandler}>
          <MyTextField
            label='Title'
            fullWidth
            required
            error={titleError}
            value={title}
            onChange={titleHandler}
          />
          <MyTextField
            label='Take a note'
            required
            error={contentError}
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={contentHandler}
          />
          <Button type='submit'>update</Button>
        </form>
      )}

      {/* all notes display */}
      <MyGridContainer container spacing={2} sx={{ marginTop: 3 }}>
        {notes.map((note) => (
          <Grid item key={note.id}>
            <MyPaper>
              <TitleBox>
                <Typography variant='h6'>{note.title}</Typography>
                <Box>
                  <IconButton onClick={() => updateHandler(note)}>
                    <ModeEditOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteHandler(note)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </TitleBox>
              <Typography variant='body1' align='left'>
                {note.content}
              </Typography>
              {/* <Typography>{note.category}</Typography> */}
            </MyPaper>
          </Grid>
        ))}
      </MyGridContainer>
    </Container>
  )
}

export default AllNotesPage
