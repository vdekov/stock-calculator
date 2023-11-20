import './App.css';

import { QueryForm } from './components/QueryForm';

const App = () => {
  return (
    <>
      <div className="app-header">
        <h1>Stock Calculator v1</h1>
      </div>
      <div className="app-container">
        <QueryForm />
      </div>
    </>
  );
};

export default App;
