import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';
import FavProvider from './contexts/FavContext';

function App() {

  const element = useRoutes(routes);


  return (
    <FavProvider>
      <div className="App">
        <Navbar />
        {element}
      </div>
    </FavProvider>
  );
}

export default App;
