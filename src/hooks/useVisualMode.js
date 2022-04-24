import { useState } from "react";

/**
 * 
 * @param {mode} initial 
 * @returns the mode and transtion and back functionality
 */
const useVisualMode = (initial) => {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = (newMode, replace = false) => {
        if (replace) {
            setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
        } else {
            setHistory((prev) => [...prev, newMode]);
        }

        setMode(newMode);
    };

    const back = () => {
        if (history.length > 1) {
            setMode(history[history.length - 2]);
            setHistory((prev) => prev.slice(0, -1));
        }
    };

    return { mode, transition, back };
}
export default useVisualMode;