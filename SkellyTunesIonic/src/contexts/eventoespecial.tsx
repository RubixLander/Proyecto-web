import React, { createContext, useContext, useState, useEffect } from 'react';

interface EventContextType {
    isShiny: boolean;
    toastShown: boolean;
    setToastShown: (shown: boolean) => void; // Función para cambiar el estado de toastShown
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isShiny, setIsShiny] = useState(false);
    const [toastShown, setToastShown] = useState(false); // Estado para controlar si el toast se ha mostrado

    useEffect(() => {
        const randomNum = Math.random();
        setIsShiny(randomNum < 0.5); // 50% de probabilidad
    }, []);

    return (
        <EventContext.Provider value={{ isShiny, toastShown, setToastShown }}>
            {children}
        </EventContext.Provider>
    );
};

export const useLogo = (): EventContextType => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useLogo must be used within an EventProvider');
    }
    return context;
};
