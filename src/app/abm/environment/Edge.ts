import { TypeMove } from "./TypeMove";

/** Edge o arista representa la transacción */
export class Edge {

    //#####################################
    // ATRIBUTOS CLASE
    //#####################################

    private startNode!: Node;

    private endNode!: Node;

    private typeMove!: TypeMove;

    private isMoveIlegally!: boolean;

    private amount!: number;

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

    public setTypeMove(typeMove: TypeMove): this {
        this.typeMove = typeMove;
        return this;
    }

    public getTypeMove(): TypeMove {
        return this.typeMove;
    }

    public setIsMoveIlegally(isMoveIlegally: boolean): this {
        this.isMoveIlegally = isMoveIlegally;
        return this;
    }

    public getIsMoveIlegally(): boolean {
        return this.isMoveIlegally
    }

    public setAmount(amount: number): this {
        this.amount = amount;
        return this;
    }

    public getAmount(): number {
        return this.amount;
    }

}