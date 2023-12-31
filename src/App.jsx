import AddNote from './components/AddNote';
import Nota from './components/Note';
import {NotaDb} from './notadb';


function App() {

  const notaRaw = NotaDb();

  return (
    <>
      <div className='nota-container'>
        <div className="nota-container__head">
          <h1>GSC Notes</h1>
          <h3>by GSC Criptografo</h3>
        </div>
        <AddNote />
        {
          notaRaw.length > 0 ?
          notaRaw.map((e, i) => <Nota key={i} title={e.title} nota={e.content} id={e.id}/> )
          : ""
        }
      </div>
    </>
  )
}

export default App
