import React, { useEffect, useRef, useState } from 'react';
import ToDo_Items from './ToDo_Items';
import { db } from '../firebase-config/firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";

const ToDo = () => {
    const [toDoList, setTodoList] = useState([]);
    const inputRef = useRef();

    // Método para agregar una tarea (POST)
    const add = async () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }

        const newToDo = {
            text: inputText,
            isComplete: false,
            createdAt: Date.now(),
        };

        try {
            const docRef = await addDoc(collection(db, "tasks"), newToDo); // Guarda en Firestore
            setTodoList((prev) => [...prev, { id: docRef.id, ...newToDo }]); // Actualiza el estado
            inputRef.current.value = "";
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Método para eliminar una tarea (DELETE)
    const deleteToDo = async (id) => {
        try {
            const docRef = doc(db, "tasks", id); // Referencia al documento
            await deleteDoc(docRef); // Elimina el documento en Firestore

            setTodoList((prevToDo) => prevToDo.filter((todo) => todo.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    // Método para alternar el estado de una tarea (UPDATE)
    const toggle = async (id) => {
        const updatedToDo = toDoList.find((todo) => todo.id === id);
        if (!updatedToDo) return;

        try {
            const docRef = doc(db, "tasks", id); // Referencia al documento
            await updateDoc(docRef, { isComplete: !updatedToDo.isComplete }); // Actualiza Firestore

            setTodoList((prevToDo) =>
                prevToDo.map((todo) =>
                    todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
                )
            );
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    // Método para cargar las tareas desde Firestore (GET)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(collection(db, "tasks"), orderBy("createdAt", "asc")); // Consulta ordenada
                const querySnapshot = await getDocs(q);

                const tasks = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setTodoList(tasks); // Actualiza el estado con los datos de Firestore
            } catch (e) {
                console.error("Error fetching tasks: ", e);
            }
        };

        fetchTasks();
    }, []); // Solo se ejecuta una vez al cargar el componente

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-2xl	">
            {/*------- título -------*/}
            <section className="flex items-center mt-7 gap-2">
                <h1 className="text-3xl font-sans font-bold">To Do List</h1>
            </section>

            {/*------- input -------*/}
            <section className="flex item-center my-7 bg-slate-100 rounded-full">
                <input
                    ref={inputRef}
                    className="bg-transparent border-o outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
                    type="text"
                    placeholder="Añade una tarea :)"
                    onKeyDown={(e) => e.key === 'Enter' && add()} // Detecta la tecla Enter
                />
                <button
                    className="border-none rounded-full bg-gradient-to-r from-green-800 to-green-600 w-32 h-14 text-white text-large font-medium cursor-pointer transition-all duration-300 hover:from-pink-500 hover:to-orange-500"
                    onClick={add}
                >
                    AÑADIR +
                </button>
            </section>

            {/*------- toDo -------*/}
            <section>
                {toDoList.map((item) => (
                    <ToDo_Items
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteToDo={deleteToDo}
                        toggle={toggle}
                    />
                ))}
            </section>
        </div>
    );
};

export default ToDo;
