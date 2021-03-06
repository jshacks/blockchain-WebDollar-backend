const axios = require('axios');
const ipaddr = require('ipaddr.js');
import {getContinentFromCountry} from './continents.js';
import {ContinentAddressObject} from './continent-address-object.js';

class GeoLocationLists {

    /*
        geoLocationContinentsLists = {}
        countGeoLocationContinentsLists = 0
     */

    constructor(){

        console.log("GeoLocations constructor");

        this.geoLocationContinentsLists = {};
        this.geoLocationLists = [];

        this.countGeoLocationContinentsLists = 0;
    }

    async includeAddress(address){

        let location = await this.getLocationFromAddress(address);
        if (location === null){
            console.log("LOCATION was not been able to get");
            return null;
        }
        location.continent = location.continent || '--';

        this.addGeoLocationContinentByAddress(address, location);

        return location;
    }

    async includeSocket(socket){

        if (socket === null) return null;

        //in case the location has been set before  (avoiding double insertion)
        if ((typeof socket.location !== 'undefined') && (socket.location !== null)) return socket.location;

        let location = await this.includeAddress(socket.address);
        socket.location = location;
        return location;
    }

    addGeoLocationContinentByAddress(address, location){

        if (this.searchGeoLocationContinentByAddress(address) === null) {

            if (typeof this.geoLocationContinentsLists[location.continent] === 'undefined') this.geoLocationContinentsLists[location.continent] = [];

            let continentAddressObject = new ContinentAddressObject(address);
            continentAddressObject.refreshLastTimeChecked();

            this.geoLocationContinentsLists[location.continent].push(continentAddressObject);
            this.countGeoLocationContinentsLists += 1;
        }

        this.printGeoLocationContinentsLists();

        return location.continent;
    }

    searchGeoLocationContinentByAddress(address){

        for (let continent in this.geoLocationContinentsLists)
            if (this.geoLocationContinentsLists.hasOwnProperty(continent))
                for (let i=0; i<this.geoLocationContinentsLists[continent].length; i++) {

                if (this.geoLocationContinentsLists[continent][i].matchAddress(address))
                    return continent;
                }

        return null;
    }

    async getLocationFromAddress(address){

        if (typeof this.geoLocationLists[address] !== 'undefined')
            return this.geoLocationLists[address];

        try{
            let data = await this.downloadFile("http://ip-api.com/json/"+address);
            if (data !== null){

                let countryCode = '';
                let country = '';
                let continent = '--';

                //console.log("location data", data);

                if (data.hasOwnProperty('country')){
                    country = data.country;
                }

                if (data.hasOwnProperty('countryCode')){
                    countryCode = data.countryCode;

                    continent = getContinentFromCountry(countryCode);
                }

                return {
                    country: country,
                    countryCode: countryCode,
                    continent: continent,
                };
            }
        }
        catch(Exception){
            console.log(Exception.toString());
            return null;
        }

    }

    async downloadFile(address){
        try{
            let response = await axios.get(address);

            let data = response.data;

            if (typeof data === 'string') data = JSON.parse(data);

            if (typeof data === 'object') return data;

            return null;
        }
        catch(Exception){
            console.log("ERROR downloading list: ", address);
            console.log(Exception.toString());
            return null;
        }
    }


    printGeoLocationContinentsLists(){

        for (let continent in this.geoLocationContinentsLists)
            if (this.geoLocationContinentsLists.hasOwnProperty(continent)) {

                let listString = '';
                for (let i = 0; i < this.geoLocationContinentsLists[continent].length; i++) {
                    listString += this.geoLocationContinentsLists[continent][i].toString()+ "   ,   ";
                }

                console.log("continent", continent, " : ",listString);
            }
    }

}

exports.GeoLocationLists =  new GeoLocationLists();