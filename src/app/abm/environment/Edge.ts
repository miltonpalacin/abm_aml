/** Edge o arista representa la transacción */
export class Edge {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private startNode!: Node;

    private endNode!: Node;

    private currentTime!: number;


    //#####################################
    // CONSTUCTOR
    //#################################### 


    //#####################################
    // PROPIEDADES
    //####################################

    public setStartNode(startNode: Node): this {
        this.startNode = startNode;
        return this;
    }

    public getStartNode(): Node {
        return this.startNode;
    }

    public setEndNode(endNode: Node): this {
        this.endNode = endNode;
        return this;
    }

    public getEndNode(): Node {
        return this.endNode;
    }

}