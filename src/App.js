import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import DetailPage from './components/DetailPage/DetailPage';
import ListPage from './components/ListPage/ListPage';

const App = () => {

  return (
    <div>
      <Router>
        <Route path="/" exact component={ListPage} />
        <Route path="/detailpage"   component={DetailPage} />
      </Router>
    </div>
  )
}
export default App;
