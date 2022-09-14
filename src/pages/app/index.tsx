import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function App() {
  const navigate = useNavigate()

  return (
    <Button variant="primary" onClick={() => navigate('/home')} style={{ marginTop: "100px" }}>
      Home
    </Button>
  );
}

export default App;