import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Times } from './pages/SelecaoTime/Times';
import { Jogadores } from './pages/Jogadores/Jogadores';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					<BrowserRouter>
						<Routes>
							<Route Component={Times} path='' />
							<Route Component={Jogadores} path='/times/:id' />
						</Routes>
					</BrowserRouter>
				</SnackbarProvider>
			</ThemeProvider>
		</div>
	)
}

export default App
