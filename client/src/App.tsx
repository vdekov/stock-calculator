import './App.css';
import { InputDateTime } from './components/InputDateTime';
import { formatDate } from './utils/date';

const App = () => {
  const maxInputDate = formatDate(new Date());
  return (
    <div>
      <InputDateTime label="From date:" maxDate={maxInputDate} />
      <InputDateTime label="To date:" maxDate={maxInputDate} />
      <button>Check</button>
    </div>
  );
};

export default App;
