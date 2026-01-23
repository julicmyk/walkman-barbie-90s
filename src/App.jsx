import { Walkman } from './components/Walkman';
import { playlist } from './data/playlist';

function App() {
  return <Walkman playlist={playlist} />;
}

export default App;
