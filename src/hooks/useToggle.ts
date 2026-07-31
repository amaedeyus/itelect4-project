import { useState } from "react";

function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState(initialValue);

    const toggle = (): void => {
        setValue(prev => !prev);
    };

    return [value, toggle];
}

export default useToggle;