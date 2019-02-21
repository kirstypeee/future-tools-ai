import * as React from 'react';
import './home.css';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import history from 'src/history';

interface IProps { }

interface IState {
    name: string;
}

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#fff',
            main: '#fff'
        },
        secondary: {
            light: '#fff',
            main: '#fff'
        },
        text: {
            primary: '#fff',
        }
    }
});

class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: ''
        }
    }

    public render() {

        return (
            <div className="ibm__ngv_main">
                <form className="ibm__text-wrapper" onSubmit={this.submitName}>
                    <div className="ibm__label">Enter name to continue...</div>
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            required={true}
                            variant="outlined"
                        />
                    </MuiThemeProvider>
                </form>
            </div>
        );
    }

    private handleChange = (key: keyof IState) => (event: any) => {
        this.setState({
            [key]: event.target.value
        } as Pick<IState, keyof IState>);
    };

    private submitName = (event: any) => {
       console.log('submit');
       history.push('/register');
    };
}

export default Home;
