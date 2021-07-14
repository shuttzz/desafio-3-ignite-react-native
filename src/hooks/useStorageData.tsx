import React, {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageDataContextData {
    getItem: () => Promise<string | null>;
    setItem: (data: string) => void;
}

const StorageDataContext = createContext({} as StorageDataContextData);

const StorageDataProvider: React.FC = ({ children }) => {
    const keyStorage = '@passmanager:logins';

    const getItem = async () => {
        return await AsyncStorage.getItem(keyStorage);
    }

    const setItem = async (data: string) => {
        await AsyncStorage.setItem(keyStorage, data);
    }

    return (
        <StorageDataContext.Provider value={{ getItem, setItem }}>
            {children}
        </StorageDataContext.Provider>
    )
}

function useStorageData() {
    const context = useContext(StorageDataContext);

    if (!context) {
        throw new Error('storageData must be used within a StorageDataProvider');
    }

    return context;
}

export { StorageDataProvider, useStorageData };