import { Toaster } from 'sonner';
import Sidebar from './components/Sidebar';
import Tasks from './components/Task';
import './index.css';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
    </div>
  );
}

export default App;
