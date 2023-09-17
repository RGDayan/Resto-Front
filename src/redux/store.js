import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import cardReducer from "./reducers/cardReducer";
import cardsReducer from "./reducers/cardsReducer";
import navigationReducer from "./reducers/navigationReducer";
import productsReducer from "./reducers/productsReducer";
import serviceReducer from "./reducers/serviceReducer";
import productReducer from "./reducers/productReducer";

const persistConfig = {
    key : 'root',
    storage
}

const reducers = combineReducers({
    card: cardReducer,
    cards: cardsReducer,
    navigation: navigationReducer,
    products: productsReducer,
    service: serviceReducer,
    product: productReducer,
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store =  configureStore({
    reducer: persistedReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)