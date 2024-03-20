import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer'

function App() {
  return (
    <div className="App">
      {/* <Timer/> */}
      <Timer timeInput={1710878800000}/>
    </div>
  );
}

export default App;
