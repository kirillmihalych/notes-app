import { FC } from 'react'
import { useGetAllNotesQuery } from './features/notes/api'
import { AllNotesPage } from './pages'
import { Navbar } from './components'

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
          <Navbar />
          <AllNotesPage notes={notes} />
        </>
      ) : null}
    </>
  )
}

export default App
