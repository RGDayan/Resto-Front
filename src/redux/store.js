import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import cardReducer from "./reducers/cardReducer";
import cardsReducer from "./reducers/cardsReducer";
import commandReducer from "./reducers/commandReducer";
import navigationReducer from "./reducers/navigationReducer";
import productReducer from "./reducers/productReducer";
import productsReducer from "./reducers/productsReducer";
import ratingsTVAReducer from "./reducers/ratingsTVAReducer";
import serviceReducer from "./reducers/serviceReducer";

const persistConfig = {
    key : 'root',
    storage
}

const reducers = combineReducers({
    card: cardReducer,
    cards: cardsReducer,
    command: commandReducer,
    navigation: navigationReducer,
    product: productReducer,
    products: productsReducer,
    ratingsTVA: ratingsTVAReducer,
    service: serviceReducer,
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store =  configureStore({
    reducer: persistedReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)