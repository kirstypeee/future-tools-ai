import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IStoreState } from '../types';
import { classify, setName, saveData } from '../actions/classify';
import Home from 'src/components/home';
import './App.css';
import PhotoCapture from 'src/components/photo';
import Map from 'src/components/map';

interface IDispatchProps {
  actions: {
    classify: (imgFile: any) => any;
    setName: (name: string) => any;
    saveData: (name: string) => any;
  };
}
interface IProps {
  classification: any;
  loading: boolean;
  router: any;
  user: any;
}

class App extends React.Component<IProps & IDispatchProps, {}> {

  public render() {
    return (
      <div id="root">
        <Switch>
          <Route exact={true} path="/" render={(props) => <Home {...props} setName={this.props.actions.setName} />} />
          <Route exact={true} path="/photo" render={(props) => <PhotoCapture {...props} classify={this.props.actions.classify} saveData={this.props.actions.saveData}/>} />
          <Route exact={true} path="/map" render={(props) => <Map {...props} classification={this.props.classification} loading={this.props.loading} user={this.props.user}/>} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState) {
  const { classification, router, user } = state;
  return { classification, router, user };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    actions: bindActionCreators(
      {
        classify,
        setName,
        saveData
      },
      dispatch
    )
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App) as any);
