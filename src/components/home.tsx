import * as React from 'react';
import './home.css';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import history from 'src/history';
import { stickMan } from './stickman';

interface IProps {
    setName: (name: string) => any;
}

interface IState {
    name: string;
}

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#4a4a4a',
            main: '#4a4a4a'
        },
        secondary: {
            light: '#4a4a4a',
            main: '#4a4a4a'
        },
        text: {
            primary: '#4a4a4a',
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
                <div className="ibm__large-text" id="animated-text">hello, {this.state.name}</div>
                {stickMan()}
                <form className="ibm__text-wrapper" id="animated-form" onSubmit={this.submitName}>
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
        event.preventDefault();
        this.props.setName(this.state.name);
        const stickman = document.getElementById('stickman') as HTMLElement;
        const text = document.getElementById('animated-text') as HTMLElement;
        const input = document.getElementById('animated-form') as HTMLElement;
        stickman.classList.add('walk', 'in');
        setTimeout(() => {
            stickman.classList.remove('walk', 'in');
            stickman.classList.add('wave');
        }, 5000);
        setTimeout(() => {
            stickman.classList.remove('wave')
            stickman.classList.add('walk', 'static');
            text.classList.add('move', 'out');
            input.classList.add('move', 'out');
        }, 7000);
        setTimeout(() => {
            stickman.classList.remove('static')
            stickman.classList.add('out');
        }, 12000);
        setTimeout(() => history.push('/photo'), 17000);
    };
}

export default Home;

