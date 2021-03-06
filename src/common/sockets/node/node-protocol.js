import {nodeVersionCompatibility, nodeVersion} from '../../../consts/const_global.js';
import {sendRequest, sendRequestWaitOnce, sendRequestSubscribe, subscribeSocketObservable} from './../sockets.js';
import {NodeLists} from './../../../node/lists/node-lists.js';


class NodeProtocol {

    async sendHello (socket ){
        // Waiting for Protocol Confirmation
        let response = await sendRequestWaitOnce(socket, "HelloNode",{
            version: nodeVersion,
        });

        console.log("RECEIVED HELLO NODE BACK", response, typeof response);

        if ((response.hasOwnProperty("version"))&&(response.version <= nodeVersionCompatibility)){

            //check if it is a unique connection, add it to the list
            let result = NodeLists.searchNodeSocketAddress(socket.address);

            // console.log("sendHello clientSockets", NodeLists.clientSockets);
            // console.log("sendHello serverSockets", NodeLists.serverSockets);
            // console.log("sendHello", result);

            if (result === null){
                socket.helloValidated = true;
                console.log("hello validated");
                return true;
            }
        }
        //delete socket;
        return false;

    }

    broadcastMessageAllSockets (request, data){

        let sockets = NodeLists.joinLists();
        for (let i=0; i < sockets.length; i++)
            sockets[i].emit(request, data)

    }

}

exports.NodeProtocol = new NodeProtocol();