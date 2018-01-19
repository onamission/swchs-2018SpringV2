
var jsonCLient = new( require( "../clients/JsonData"))();
var className;

class BaseModel{
    constructor(){
        this.className = this.constructor.name.toLowerCase();
    }

    /**
     * gets a data object based on a key value parameter.
     *
     * @param {string} key
     * @param {string} field Optional: if passed it will return only the value of the field requested
     * @returns either an object or a single value depending on what parameters are passed in
     * @memberof BaseModel
     */
    get( key, field ){
            if( !key ){
                return new Error( 'No Key Provided' );
            }
            var returnedItem = jsonCLient.getDataFromFile( this.className )[ key ];
            if( !field ){
                // if there is no field parameter, then return the whole object
                return returnedItem;
            }
            // otherwise, just return the value of the field for that object
            return returnedItem[ field ];
        }

    /**
     * gets a data object based on one of the fields within the object
     *
     * @param {string} keyField the name of the field to "key" off of
     * @param {string} keyValue Optional: the value we are looking for
     * @param {string} field Optional: the name of the field to return
     * @returns a single value, a single item or the whole set depending on the parameters passed to it
     * @memberof BaseModel
     */
    getBy( keyField, keyValue, field){
        if( !keyField ){
            return new Error( 'No Key Field Provided' );
        }
        var allCards = jsonCLient.getDataFromFile( this.className )
        var retVal = keyValue ? "" : {};
        Object.values( allCards ).forEach( item => {
            if(  !item[ keyField ] ){
                retVal = false;
                return;
            }
            if( !keyValue ){
                // if there isn't a keyValue parameter, then return all of the cards with the keyField as key
                retVal[ item[ keyField ] ] = item;
                return;
            }
            // otherwise, just the one card that matches the criteria
            if( item[ keyField ] === keyValue ){
                if( !field ){
                    // if no field is passed, return the entire card
                    retVal = item;
                } else {
                    // otherwise, just return the value of the property requested
                    retVal = item[ field ];
                }
            }
        })
        return retVal;
    }

    sortBy( keyField, direction ){
        if( !keyField ){
            return new Error( 'No Key Field Provided' );
        }
        direction = direction || "asc";
        direction = direction.toLowerCase();
        var keyedObject = this.getBy( keyField );
        if( !keyedObject || keyedObject instanceof Error ){
            return new Error( 'Key Field Provided "' + keyField + '" is not part of ' + this.className );
        }
        var keyList = Object.keys( keyedObject );
        var sortedKeys = keyList.sort( function( a, b ){
            // if the values are numbers, sort them as numbers
            var tempa = parseInt( a ) == a ? parseInt( a ) : a;
            var tempb = parseInt( b ) == b ? parseInt( b ) : b;
            if( direction === 'asc' ){
                return ( tempa < tempb ) ? -1 : 1;
            }else{
                return ( tempb < tempa ) ? -1 : 1;
            }
        } );
        var sortedObject = {};
        sortedKeys.forEach( key => {
            sortedObject[ key ] = keyedObject[ key ];
        })
        return sortedObject;
    }
}
module.exports = BaseModel;