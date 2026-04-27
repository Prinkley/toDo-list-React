import React, { useEffect, useRef, useState} from "react";

import styles from "./index.module.scss";


interface InputTaskProps {
    id: string;
    title: string;
    completed: boolean;
    onDone: (id: string) => void;
    onEdited: (id:string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    completed,
    onDone,
    onEdited,
    onRemoved,
    }) => {

    const [checked, setChecked] = useState(completed);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    const getTaskClassName = () => {
    const baseClass = styles.inputTask;
    if (completed) {
        return `${baseClass} ${styles.completed}`;
    }
    return baseClass;
    };

    const getTitleClassName = () => {
        const baseClass = styles.inputTaskTitle;
        if (completed) {
            return `${baseClass} ${styles.completedTitle}`;
        }
        return baseClass;
    };

    useEffect(() => {
        if (isEditMode){
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode])

    return (
        <div className={getTaskClassName()}>
            <label className={styles.inputTaskLabel}>
                <input 
                    type="checkbox"
                    disabled = {isEditMode || completed}
                    checked={checked}
                    name="" id=""
                    onChange={(evt) => {
                        setChecked(evt.target.checked);

                        if (evt.target.checked) {
                            onDone(id)
                        }
                    }}  
                />
                { isEditMode ? (
                    <input 
                        type="text" 
                        ref = {editTitleInputRef}
                        value={value}
                        className={styles.inputTaskTitleEdit}
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter'){
                                onEdited(id,value);
                                setIsEditMode(false);
                            }
                        }}
                        onChange={(evt) => {
                            setValue(evt.target.value);
                        }}/>
                ):(
                    <h3 className={getTitleClassName()}>
                        {title}
                    </h3>
                )}

            </label>
            {isEditMode? (
                <button
                aria-label="Save"
                className={styles.inputTaskSave}
                onClick={() => {
                   onEdited(id,value);
                   setIsEditMode(false);
                }}
            >
            </button>
            ) : (
            <button
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => {
                   setIsEditMode(true);
                }}
            >
            </button>
            )}
            <button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={() => {
                   if(confirm('Are you sure?')){
                    onRemoved(id);
                   }
                }}
            >
            </button>
        </div>
    )
}