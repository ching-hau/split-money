import './css/App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { CountProvider } from './Context/CountContext';


function App() {
  return (
    <>
        <Header />
        <Main />
        <Footer />
    </>
  );
}

export default App;
