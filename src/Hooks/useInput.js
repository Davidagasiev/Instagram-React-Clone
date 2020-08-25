import {useState} from "react";

function useInput(initialValue) {
    const [state, setState] = useState(initialValue);

    function handleChange(e) {
        setState(e.target.value);
    }

    function reset() {
        setState("");
    }

    return [state, handleChange, reset];
}

export default useInput;