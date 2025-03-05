import './index.css';

import { Toaster } from 'sonner';

import Sidebar from './components/Sidebar';
import Tasks from './components/Task';

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
