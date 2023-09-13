import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from "react-query";
import Loader from "./ui_components/divers/loaders/loader";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const client = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={client}>
        <Provider store={store}>
            <PersistGate loading={<Loader/>}
                         persistor={persistor}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </LocalizationProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>,
    document.getElementById('root')
);