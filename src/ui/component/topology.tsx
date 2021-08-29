import { Network } from '@/app/abm/environment/Network';
import { INodeInfo } from '@/app/abm/helper/Types';
import * as React from 'react'
import { ReactNetworkTopology } from './networkgraph';

interface IPropsDraw {
    network: number;
    setInfoNode: (node: INodeInfo) => void;
}

export default class DrawTopology extends React.Component<IPropsDraw> {
    render() {

        return (
            <>
                {this.props.network !== undefined ? (
                    <ReactNetworkTopology
                        width={1600}
                        height={1200}
                        network={this.props.network}
                        id={'net'}
                        onClick={(node: INodeInfo) => this.props.setInfoNode(node)} />
                ) : <div> <br /><br /> <h3>En espera de la generación de una red...</h3> </div>}
            </>
        );
    }
}
