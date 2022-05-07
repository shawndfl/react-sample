import logo from './logo.svg';
import './App.css';
import Login from'./container/login/Login'
import Header from './container/header/Header'

function App() {
  const menu=['tribulation', 'Day of The Lord', "timline"];

  function loadPage(item) {
    console.debug("loading " + item);
  }
  return (
    <div className="App">
     <h1>Header</h1>
     <Header/>
     <Login/>
     <ul>
       {menu.map(item => (
         <li key={item}>
           <button onClick ={ () => {loadPage(item)}}> {item}</button>
         </li>
       ))}
     </ul>


    </div>
  );
}

export default App;
