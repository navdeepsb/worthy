/**
 *   @desc DB schemas
 * @author Navdeep
 **/


class Schema {
    constructor() {
        this.uid = "";
        this.createdOn = Date.now();
        this.lastModifiedOn = Date.now();
    }
}

class User extends Schema {
    constructor() {
        super();
        this.email = "";
        this.username = "";
        this.displayPicUrl = "img/placeholders/user.png";
        this.sources = {};
        this.categories = {};
        this.modules = {};
    }
}

export default class SchemaFactory {
    static get( _schema ) {
        switch( _schema ) {
            case "user":
                return new User();
            default:
                return null;
        }
    }
}