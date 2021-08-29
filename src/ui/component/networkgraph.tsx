import { BaseOperationAgent } from "@/app/abm/agent/BaseOperationAgent";
import { IndividualAgent } from "@/app/abm/agent/IndividualAgent";
import { IntermediaryAgent } from "@/app/abm/agent/IntermediaryAgent";
import { NoProfitBusinessAgent } from "@/app/abm/agent/NoProfitBusinessAgent";
import { ProfitBusinessAgent } from "@/app/abm/agent/ProfitBusinessAgent";
import { ShellTypeBusinessAgent } from "@/app/abm/agent/ShellTypeBusinessAgent";
import { TrustFundBusinessAgent } from "@/app/abm/agent/TrustFundBusinessAgent";
import { Network } from "@/app/abm/environment/Network";
import { INodeInfo } from "@/app/abm/helper/Types";
import { Simulation } from "@/app/abm/simulation/Simulation";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import React, { useEffect } from "react";
import './networkgraph.css';

const d3 = Object.assign({}, require('d3-selection'), require('d3-force'), require('d3-drag'));

export enum NodeType {
    NODE_EDGE = 'NODE_EDGE',
    NODE_ROUTER = 'NODE_ROUTER',
    NODE_SWITCH = 'NODE_SWITCH',
    NODE_UNKNOWN = 'NODE_UNKNOWN',
}

let iconSize = 10;

class HostNode implements SimulationNodeDatum {
    nodeName: string = 'unknown';
    nodeType: NodeType = NodeType.NODE_UNKNOWN;
    nodeInfo!: INodeInfo;

    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    constructor(name: string, idx: number, type: NodeType, nodeInfo: INodeInfo) {
        this.nodeName = name;
        this.index = idx;
        this.nodeType = type;
        this.nodeInfo = nodeInfo;
    }


}

class HostLink implements SimulationLinkDatum<SimulationNodeDatum>{
    source: number = 0;
    target: number = 0;
    distance: number = 100;
}

function tick() {
    d3.selectAll(".link")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

    d3.selectAll(".circle")
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

    d3.selectAll(".rect")
        .attr("x", (d: any) => d.x - iconSize * 1.5)
        .attr("y", (d: any) => d.y - iconSize);

    d3.selectAll(".text")
        .attr("x", (d: any) => d.x - 25)
        .attr("y", (d: any) => d.y + 20);
}

function drawTopology(props: INodeLink) {

    if (StaticTopology.stopUpdateTopologia) return;

    const svg = d3.select(`#${props.id}`);
    svg.selectAll("*").remove();

    const nodes: HostNode[] = [];
    const links: HostLink[] = [];

    let counter = 0;
    const network = Simulation.networkCurrent;
    network.nodes.forEach(n => {
        n.agent.idPivot = counter++;

        const isInter = n.agent.isAgent(IntermediaryAgent);
        const agent = isInter ? undefined : (n.agent as BaseOperationAgent);
        const nodeInfo: INodeInfo = {
            code: n.agent.code,
            codeShort: n.agent.codeShort,
            placeAgent: n.agent.place.toString(),
            placeNode: n.location.toString(),
            amountIn: isInter ? 0 : agent!.ledger.totalIn,
            amountOut: isInter ? 0 : agent!.ledger.totalOut,
            totalIllegalIn: isInter ? 0 : agent!.ledger.totalIllegalIn,
            totalIllegalOut: isInter ? 0 : agent!.ledger.totalIllegalOut,
            isFrozen: isInter ? false : agent!.isFrozenAccounts,
            entityFinantial: isInter ? (n.agent as IntermediaryAgent).finantialEntity.toString() : "-",
        };
        nodes.push(
            new HostNode(
                n.agent.codeShort,
                n.agent.idPivot,
                (isInter ? NodeType.NODE_ROUTER : (n.agent.isAgent(IndividualAgent) ? NodeType.NODE_EDGE : NodeType.NODE_SWITCH)),
                nodeInfo));

    });

    network.edges.forEach(e => {

        const link: HostLink = {
            source: e.oneNode.agent.idPivot,
            target: e.twoNode.agent.idPivot,
            distance: 100
        };
        links.push(link);

    });

    const edges = [];
    const routers = [];
    const switches = [];

    for (const node of nodes) {
        switch (node.nodeType) {
            case NodeType.NODE_EDGE:
                edges.push(node);
                break;
            case NodeType.NODE_ROUTER:
                routers.push(node);
                break;
            case NodeType.NODE_SWITCH:
                switches.push(node);
                break;
            case NodeType.NODE_UNKNOWN:
                break;
        }
    }

    svg
        .selectAll(".link")
        .data(links)
        .join("line")
        .classed("link", true);

    //svg.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2");
    //svg.append("circle").attr("cx", 200).attr("cy", 160).attr("r", 6).style("fill", "#404080");
    svg.append("circle").attr("cx", 100).attr("cy", 100).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 120).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 140).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 160).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 180).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 200).attr("r", 5).style("fill", "#325d88");
    svg.append("circle").attr("cx", 100).attr("cy", 220).attr("r", 5).style("fill", "#325d88");

    svg.append("text").attr("x", 110).attr("y", 100).
        text("Enlaces/Conexiones: " + network.edges.length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 120).
        text("Individuos normales: " + network.nodes.filter(n => n.agent.isAgent(IndividualAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 140).
        text("Intermediarios financieros: " + network.nodes.filter(n => n.agent.isAgent(IntermediaryAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 160).
        text("Empresa con fines de lucro: " + network.nodes.filter(n => n.agent.isAgent(ProfitBusinessAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 180).
        text("Empresa sin fines de lucro: " + network.nodes.filter(n => n.agent.isAgent(NoProfitBusinessAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 200).
        text("Empresa fondo fiduciario: " + network.nodes.filter(n => n.agent.isAgent(TrustFundBusinessAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x", 110).attr("y", 220).
        text("Empresa fantasma: " + network.nodes.filter(n => n.agent.isAgent(ShellTypeBusinessAgent)).length).style("font-size", "12px").attr("alignment-baseline", "middle");



    const t1: any = svg
        .selectAll("g1")
        .data(edges).enter()
        .append("g");
    t1
        .append("circle")
        .attr("r", iconSize)
        .attr("class", "circle")
        .classed("node edge", true);
    t1
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d: HostNode) { return d.nodeName })
        .classed("node text", true);


    const t2: any = svg
        .selectAll("g2")
        .data(routers).enter()
        .append("g");
    t2
        .append("rect")
        .attr("width", iconSize * 3)
        .attr("height", iconSize * 1.5)
        .attr("class", "rect")
        .classed("node router", true);
    t2
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d: HostNode) { return d.nodeName })
        .classed("node text", true);

    const t3: any = svg
        .selectAll("g3")
        .data(switches).enter()
        .append("g");
    t3
        .append("rect")
        .attr("width", iconSize * 3)
        .attr("height", iconSize * 1.5)
        .attr("class", "rect")
        .classed("node switch", true);
    t3
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d: HostNode) { return d.nodeName })
        .classed("node text", true)


    const simulation = d3
        .forceSimulation()
        .nodes(nodes)
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(props.width / 2, props.height / 2))
        .force("link", d3.forceLink(links).distance(function (d: HostLink) { return d.distance }))
        .on("tick", tick);

    const drag = d3
        .drag()
        .on("drag", function (event: any, d: any) {
            d.fx = clamp(event.x, 0, props.width);
            d.fy = clamp(event.y, 0, props.height);
            simulation.alpha(1).restart();
        });

    t1
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (props.onClick !== undefined) props.onClick(d.nodeInfo);
        });

    t2
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (props.onClick !== undefined) props.onClick(d.nodeInfo);
        });

    t3
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (props.onClick !== undefined) props.onClick(d.nodeInfo);
        });

}

function clamp(x: number, lo: number, hi: number) {
    return x < lo ? lo : x > hi ? hi : x;
}


interface INodeLink {
    width: number;
    height: number;
    id: string;
    size?: number;
    network: number;
    onClick?: (host: INodeInfo) => void;

}

let totaLinks = 0;
let totChanges = 20;

function ReactNetworkTopology(props: INodeLink) {

    useEffect(() => {
        totChanges++;
        if (totChanges >= 20 && Simulation.networkCurrent && totaLinks !== Simulation.networkCurrent.edges.length) {
            totChanges = 1;
            totaLinks = Simulation.networkCurrent.edges.length;
            console.log("D)entro," + Simulation.networkCurrent.nodes.length + "." + Simulation.networkCurrent.edges.length);
            drawTopology(props);
        }
    });
    return (
        <>
            <svg id={props.id} width={props.width} height={props.height} />
        </>
    );
}

class StaticTopology {
    static stopUpdateTopologia: boolean = false;
}

export { ReactNetworkTopology, StaticTopology }