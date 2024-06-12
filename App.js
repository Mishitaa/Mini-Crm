import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AudienceCreation from './components/AudienceCreation';
import Campaigns from './components/Campaigns';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/create-audience" component={AudienceCreation} />
                    <Route path="/campaigns" component={Campaigns} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
