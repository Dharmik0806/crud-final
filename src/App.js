import Layout from './comopnet/Layout/Layout';
import User from './container/User/User';
// import {Switch , Route} from 'react-router-dom'
import {Switch , Route} from 'react-router-dom'
import Medicine from './container/Medicine';
import Contect from './container/Contect';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={"/User"} component={User}/>
        <Route exact path={"/Medicine"} component={Medicine}/>
        <Route exact path={"/Contect"} component={Contect}/>
      </Switch>
      {/* <Switch>
      <Route exact path={"/User"}  component={User}/>
      </Switch> */}
    </Layout>
  );
}

export default App;
