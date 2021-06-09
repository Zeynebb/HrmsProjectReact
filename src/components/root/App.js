import '../root/App.css'
import Navi from '../navi/Navi';
import { Container } from 'semantic-ui-react';
import Dashboard from '../root/Dashboard.jsx';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main">
        <Dashboard/>
      </Container>
     
    </div>
  );
}

export default App;
