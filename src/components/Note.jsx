import React,{useState} from 'react';
import "./Note.scss";
import pencil from "../assets/pencil.png";
import gear from "../assets/gear.png";
import faClose from "../assets/fa-close.png";
import save from "../assets/save.png";
import { deleteFromDb } from '../notadb';

const Nota = ({title, nota, id}) => {

    //Estado para title.
    const [titulo, setTitulo] = useState(title);

    //Estado para nota.
    const [note, setNote] = useState(nota);

    // Estado para estado de edicion.
    const [edit, setEdit] = useState(false);

    function deleteCurrentNote (e) {
        e.preventDefault();
        //console.log("Delete note: " + id);
        deleteFromDb(id);
    }

    function editNote (e) {
        e.preventDefault();

        edit ?  setEdit(false) : setEdit(true);
        
    }

    function notaClass (edit) {
        if (edit) {
            return "nota edit";
        } else {
            return "nota";
        }
    }
    

    return ( 
        <div className={notaClass(edit)}>

            <div className="nota__title">
                {
                    edit ?
                     <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                     : titulo
                }

                <button className='nota__close'>
                     <img src={faClose} onClick={e => deleteCurrentNote(e)} />
                </button>
            </div>
            <div className="nota__nota">
                {
                    edit ?
                     <textarea onChange={e => setNote(e)} value={note}></textarea>
                    : note
                }
            </div>

            <div className="nota__footer">
                {
                    edit ?
                    <img src={save} title='Editar' onClick={e => editNote(e)}/>
                    : <img src={pencil} title='guardar' onClick={e => editNote(e)}/>
                }
                <img src={gear} title='Encriptar' />
            </div>

        </div>
    );
}
 
export default Nota;