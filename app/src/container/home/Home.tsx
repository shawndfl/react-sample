import './home.css';

function App() {
    const menu: string[] = ['tribulation', 'Day of The Lord', "timline"];
    
    function loadPage(item : string) {
        console.debug("loading " + item);
    }
    
    return (
        <div className="Home">
            <h1>Header</h1>            
            <ul> {
                menu.map(item => (
                    <li key={item}>
                        <button onClick ={ () => {loadPage(item)}}>
                            {item}</button>
                    </li>
                ))
            } </ul>


        </div>
    );
}

export default App;
