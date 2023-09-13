import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import navigationReducer from "./reducers/navigationReducer";
import serviceReducer from "./reducers/serviceReducer";
import cardsReducer from "./reducers/cardsReducer";
import cardReducer from "./reducers/cardReducer";

const persistConfig = {
    key : 'root',
    storage
}

const reducers = combineReducers({
    card: cardReducer,
    cards: cardsReducer,
    navigation: navigationReducer,
    service: serviceReducer
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store =  configureStore({
    reducer: persistedReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)