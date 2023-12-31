import { useEffect, useState} from 'react';

class GSCNote {
    constructor(id, title, content, date) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.id = id;
    }

    encriptar(){
        return this.content;
    }
}

const fetchData = async (setData) => {
    const response = await fetch('src/data.json');
    const json = await response.json();
    setData(json);
};

const setDb = (value) => {

    let data = [];

    const dbName = "gsc-notes-db";

    if(localStorage){

        //Obtiene el valor del localStorage
        data = localStorage.getItem(dbName);

        //Si no hay nada en el localStorage, crea un array vacio
        const currentData = data ? JSON.parse(data) : [];

        //Agrega el nuevo valor al array
        currentData.push(value);

        // actualizo modelo: data
        data = currentData;

        //Convierte el array a JSON
        const json = JSON.stringify(currentData);

        //Guarda el JSON en el localStorage
        localStorage.setItem(dbName, json);

    }else{
        data = new Error('Su navegador no tiene localStorage');
    }
    
    return data;
}

const getDb = () => {

    let data = [];

    const dbName = "gsc-notes-db";

    if(localStorage){

        //Obtiene el valor del localStorage
        const storedData = localStorage.getItem(dbName);

        //Si no hay nada en el localStorage, crea un array vacio
        const currentData = storedData ? JSON.parse(storedData) : [];

        data = currentData;

    }else{
        data = new Error('Su navegador no tiene localStorage');
    }
    
    return data;
}

const deleteFromDb = (id) => {
    const dbName = "gsc-notes-db";
    const currentData = getDb();
    

    // Filtrar los datos para excluir el elemento con el id especificado
    const newData = currentData.filter(item => item.id !== id);

    localStorage.setItem(dbName, JSON.stringify(newData));
    
    return newData;
}

const NotaDb = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{      

        const data = getDb();
        setData(data);

    },[data]);

    return data;
}
 
export {NotaDb, GSCNote, fetchData, setDb, getDb, deleteFromDb};

