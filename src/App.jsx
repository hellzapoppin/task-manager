import Sidebar from './components/Sidebar';
import Tasks from './components/Task';
import './index.css';

function App() {
  return (
    <div className="flex gap-9">
      <Sidebar />
      <Tasks />
    </div>
  );
}

export default App;
