import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import navigationReducer from "./reducers/navigation";
import serviceReducer from "./reducers/service";

const persistConfig = {
    key : 'root',
    storage
}

const reducers = combineReducers({
    navigation: navigationReducer,
    service: serviceReducer
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store =  configureStore({
    reducer: persistedReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)