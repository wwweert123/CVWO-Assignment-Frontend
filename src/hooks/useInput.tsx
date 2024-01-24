import useLocalStorage from "./useLocalStorage";

const useInput = (key: string, initValue: string) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    // reset function
    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    };

    return [value, reset, attributeObj];
};

export default useInput;
