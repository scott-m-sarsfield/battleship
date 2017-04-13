import React from 'react';

const styles = {
    absoluteFill:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    }
};

const Z_GRID_LAYER = 1,
Z_SHIP_LAYER = 2,
Z_PIN_LAYER = 3,
Z_CLICK_LAYER = 4;

class BoardLayer extends React.Component{

    constructor(){
        super();

        this.state = {height:200, width:200};
    }

    static get propTypes(){
        return {
            children: React.PropTypes.any,
            zIndex: React.PropTypes.number
        };
    }

    componentDidMount(){
        this.setState({
            height: this.refs.container.offsetHeight,
            width: this.refs.container.offsetWidth
        });
    }

    render(){

        const children = React.Children.map(this.props.children,child => React.cloneElement(child,{
            parentHeight:this.state.height,
            parentWidth:this.state.width
        }));

        return (
            <div style={{...styles.absoluteFill, zIndex:this.props.zIndex}} ref="container">
                {children}
            </div>
        );
    }
}

import PinLayer from './PinLayer';
import ShipLayer from './ShipLayer';
import ClickLayer from './ClickLayer';
import GridLayer from './GridLayer';


/*
██████   ██████   █████  ██████  ██████
██   ██ ██    ██ ██   ██ ██   ██ ██   ██
██████  ██    ██ ███████ ██████  ██   ██
██   ██ ██    ██ ██   ██ ██   ██ ██   ██
██████   ██████  ██   ██ ██   ██ ██████
*/

class Board extends React.Component{

    static get propTypes(){
        return {
            ships: React.PropTypes.object,
            shots: React.PropTypes.array,
            onShoot: React.PropTypes.func
        };
    }

    static get defaultProps(){
        return {
            onShoot: function(){}
        };
    }

    render(){
        const {ships,shots,onShoot} = this.props;

        return (
            <div style={{position:'relative',height:'300px',width:'300px',background:'#468'}}>

                <BoardLayer zIndex={Z_SHIP_LAYER}>
                    <ShipLayer ships={ships}/>
                </BoardLayer>

                <BoardLayer zIndex={Z_PIN_LAYER}>
                    <PinLayer pins={shots}/>
                </BoardLayer>

                <BoardLayer zIndex={Z_GRID_LAYER}>
                    <GridLayer height={10} width={10}/>
                </BoardLayer>

                <BoardLayer zIndex={Z_CLICK_LAYER}>
                    <ClickLayer height={10} width={10} onClickCell={onShoot}/>
                </BoardLayer>

            </div>
        );
    }
}

export default Board;
