import { FC } from 'react'
import { useGetAllNotesQuery } from './features/notes/api'
import { Appbar } from './components'
import { AllNotesPage } from './pages'

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
          <AllNotesPage notes={notes} />
        </>
      ) : null}
    </>
  )
}

export default App
