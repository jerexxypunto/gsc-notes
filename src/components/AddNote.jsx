import React, { useCallback, useMemo, useState } from 'react';
import "./AddNote.scss";
import save from "../assets/save.png";
import gear from "../assets/gear.png";
import { GSCNote,  getDb,  setDb } from '../notadb';

const AddNote = () => {

    // Crea un estado para la nota
    // Sera un objeto con dos propiedades: title y note
    const [nota, setNota] = useState({title:"", note:""});

    const handdleTitle = (e) => {

        // Obtengo el valor actual.
        const before = {...nota};

        // Modifico el valor de title.
        before.title = e.target.value;

        setNota(before);

    };

    const handdleNota = (e) => {
        
        // Obtengo el valor actual.
        const before = {...nota};

        // Modifico el valor de note.
        before.note = e.target.value;

        setNota(before);

    };

    const saveNote = (e) => {
        e.preventDefault();

        if(nota.title != "", nota.note != ""){

            // Tamaño actual del array..
            let size =  getDb().length;

            const notaRaw = new GSCNote(size, nota.title, nota.note, new Date().toISOString());        
            const status = setDb(notaRaw);
    
            console.log(status);

            // Limpio el estado.
            setNota({title:"", note:""});
        }else{
            alert("No se puede guardar una nota vacia.");
        }

       
    }


    return ( 
        <div className='nota add-nota'>
            <div className='add-nota__title' >
                <input type="text" placeholder="Titulo de la nota"  value={nota.title} onChange={e => handdleTitle(e)}/>

            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="Escribe tu nota" onChange={e => handdleNota(e)} value={nota.note}></textarea>

            <div className="add-nota__footer">
                <button onClick={e => saveNote(e)}>
                    <img src={save} />              
                </button>
                <button>
                    <img src={gear} />              
                </button>
            </div>
        </div>
    );
}
 
export default AddNote;