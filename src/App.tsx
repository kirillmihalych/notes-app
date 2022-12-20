import { FC } from 'react'
import { useGetAllNotesQuery } from './features/notes/api'
import { Appbar } from './components'

const App: FC = () => {
  const { data: notes = [], isLoading, isError } = useGetAllNotesQuery([])

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>There is an error</>
      ) : notes ? (
        <>
          <Appbar />
          {notes.map((note) => (
            <article key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <h4>{note.category}</h4>
            </article>
          ))}
        </>
      ) : null}
    </>
  )
}

export default App
