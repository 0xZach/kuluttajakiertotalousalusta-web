import {useState, useEffect} from 'react';

type KeyHandler = () => void;
export const useKeyPress = (
    targetKey: string,
    keyupHandler?: KeyHandler | null,
    keydownHandler?: KeyHandler | null,
) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const downHandler = (keydown: KeyboardEvent) => {
        if (keydown.key === targetKey) {
            setKeyPressed(true);
            keydownHandler && keydownHandler();
        }
    };
    const upHandler = (keyup: KeyboardEvent) => {
        if (keyup.key === targetKey) {
            setKeyPressed(false);
            keyupHandler && keyupHandler();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', downHandler);
        document.addEventListener('keyup', upHandler);

        return () => {
            document.removeEventListener('keydown', downHandler);
            document.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};
