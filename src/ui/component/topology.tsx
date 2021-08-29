import { Network } from '@/app/abm/environment/Network';
import * as React from 'react'
import { ReactNetworkTopology } from './networkgraph';

interface IPropsDraw {
    network: Network | undefined;
}

export default class DrawTopology extends React.Component<IPropsDraw> {
    render() {

        return (
            <>
                {this.props.network !== undefined ? (
                    <ReactNetworkTopology
                        width={2024}
                        height={2024}
                        network={this.props.network}
                        id={'net'}
                        onClick={(node: string) => console.log('Node clicked : ' + node)} />
                ) : <div> <br /><br /> <h3>En espera de la generación de una red...</h3> </div>}
            </>
        );
    }
}
