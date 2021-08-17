import React, { Fragment } from 'react';
import "./app.scss";
import "bootswatch/dist/minty/bootstrap.min.css";
// import { TypeMove } from '@/app/abm/environment/TypeMove';
// import { Place } from '@/app/abm/environment/Place';
import { State } from "@/app/abm/agent/State"
import { TypeFinantialEntity } from '@/app/abm/data/TypeFinantialEntity';
// import { Alphabet } from '@/app/abm/agent/Alphabet';
// import { HashMap } from '@/app/abm/helper/HashMap';
// import { StateAlphabet } from '@/app/abm/agent/StateAlphabet';
// import { ArrayList } from '@/app/abm/helper/ArrayList';
// //import { CoreAgent } from '@/app/abm/agent/CoreAgent';
import { IHash } from "@/app/abm/helper/IHash";
import { TypePlace } from '@/app/abm/data/TypePlace';

// let move = TypeMove.NONE;
// const location = Place.U240202
const state01 = new State("01", "milto");
const state02 = new State("01s", "milto");
const state03 = state02;
// const xxx = new Alphabet("01", "milto");
// const map: HashMap<StateAlphabet, State> = new HashMap();
// map.set(new StateAlphabet(state01, xxx, true), state02);
// const arr: ArrayList<State> = ArrayList.create();

// arr.push(state01);
// arr.push(state02);
// console.log("arr: " + arr[1].hash() + "---.---" + (new StateAlphabet(state01, xxx, true).hash()));

// // if (state01.equals(xxx))
let valtemp = "NADA";
if (state01.equals(state01))
    valtemp = "entro";

//console.log(TypeFinantialEntity.data.getByIndex(10).toString())
// //if (arr.contains(new State("01ss","mIlto")))
// if (map.has(new StateAlphabet(state01, xxx, true)))
//move = TypeMove.DEPOSIT;

// {move + "." + move.toString() + "." + move.valueOf()}

const App = () => {
    return (
        <Fragment>
            <div className="ecample">
                {valtemp}
            </div>
            <main className="container-fluid" id="productForm">
                <div className="row">
                    <div className="col-md-6 p-4 my-auto">
                        <form className="card card-body gap-3">
                            <div className="form-group">
                                <input type="text" id="name" placeholder="Product's name" className="form-control" autoFocus />
                            </div>
                            <div className="form-group">
                                <input type="number" id="price" placeholder="Product's price" step="any" className="form-control" />
                            </div>
                            <div className="form-group">
                                <textarea id="description" placeholder="Product's description" className="form-control"></textarea>
                            </div>
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <div id="products"></div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}


export default App;
