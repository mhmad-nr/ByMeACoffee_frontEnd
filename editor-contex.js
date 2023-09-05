import React, { useEffect, useMemo, useContext } from 'react';
import Editor from '../libs/editor/Editor';
import Viewport from '../libs/editor/Viewport';

const EditorContext = React.createContext();

const EditorProvider = ({ children }) => {
    const value = useMemo(() => {
        const editor = new Editor();
        const viewport = new Viewport();
        return { editor, viewport };
    }, []);

    useEffect(() => {
        return () => {
            value.editor.dispose();
            value.viewport.dispose();
        }
    }, [value]);

    if (!value) {
        return <EditorContext.Provider value={value}></EditorContext.Provider>
    }


    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

const useEditor = () => useContext(EditorContext);

export {
    EditorProvider,
    useEditor,
}
