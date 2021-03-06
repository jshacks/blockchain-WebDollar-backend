import {NodeClient} from '../sockets/node-client.js';
import {NodeDiscoveryService} from './discovery/node-discovery-service.js';
import {NodeLists} from './../../lists/node-lists.js';
import {NodeClientsWaitlist} from '../../lists/waitlist/node-clients-waitlist.js';


class NodeClientsService {

    /*
        nodeDiscoveryService = null     //Node Discovery Service
        this.nodeClients = []
    */

    constructor(){
        console.log("NodeServiceClients constructor");

        this.nodeClients = [];
    }

    startService(){
        NodeDiscoveryService.startDiscovery();
        NodeClientsWaitlist.startConnecting();

    }




}

exports.NodeClientsService = new NodeClientsService();