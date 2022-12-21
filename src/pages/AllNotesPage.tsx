import { FC, useState } from 'react'
import { INote } from '../features/models/types'
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../features/notes/api'

interface IAllNotesPageProps {
  notes: INote[]
}

const AllNotesPage: FC<IAllNotesPageProps> = ({ notes }) => {
  const [tempNote, setTempNote] = useState<INote | {}>({})
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState<Boolean>(false)
  const [createNote] = useCreateNoteMutation()
  const [updateNote] = useUpdateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()

  // create Note handlers
  const submitCreateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNote({ title, content } as INote)
    setTitle('')
    setContent('')
  }

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
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
    <>
      {!isUpdate ? (
        // create new note
        <form onSubmit={submitCreateHandler}>
          <input
            type='text'
            placeholder='write title'
            value={title}
            onChange={titleHandler}
          />
          <input
            type='text'
            placeholder='write content'
            value={content}
            onChange={contentHandler}
          />
          <button type='submit'>create</button>
        </form>
      ) : (
        // update note
        <form onSubmit={submitUpdateHandler}>
          <input
            type='text'
            placeholder='write title'
            value={title}
            onChange={titleHandler}
          />
          <input
            type='text'
            placeholder='write content'
            value={content}
            onChange={contentHandler}
          />
          <button type='submit'>update</button>
        </form>
      )}

      {/* all notes display */}
      <div>
        {notes.map((note) => (
          <article key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <h4>{note.category}</h4>
            <button onClick={() => updateHandler(note)}>update</button>
            <button onClick={() => deleteHandler(note)}>delete</button>
          </article>
        ))}
      </div>
    </>
  )
}

export default AllNotesPage
