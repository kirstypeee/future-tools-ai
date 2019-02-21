import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IStoreState, ITile, IBanner, IForm } from '../types';
import { classify } from '../actions/classify';
import Home from 'src/components/home';
import './App.css';
import PhotoCapture from 'src/components/photo';

interface IDispatchProps {
  actions: {
    classify: (imgFile: any) => any;
  };
}
interface IProps {
  tiles: ITile[];
  banner: IBanner;
  loading: boolean;
  forms: IForm[];
}

class App extends React.Component<IProps & IDispatchProps, {}> {

  public render() {
    return (
      <div id="root">
        <Switch>
          <Route exact={true} path="/" render={(props) => <Home {...props} />} />
          <Route exact={true} path="/register" render={(props) => <PhotoCapture {...props} classify={this.props.actions.classify}/>} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState) {
  const { tiles, banner, loading, forms } = state;
  return { tiles, banner, loading, forms };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    actions: bindActionCreators(
      {
        classify,
      },
      dispatch
    )
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App) as any);
