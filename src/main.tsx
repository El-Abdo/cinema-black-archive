import { render } from 'preact'
import App  from './app'
import { DataProvider } from "./context/DataContext";


render(
    <DataProvider>
        <App />
    </DataProvider>,
   document.getElementById('app')!
);