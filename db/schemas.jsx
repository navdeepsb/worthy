/**
 *   @desc DB schemas
 * @author Navdeep
 **/


class Schema {
    constructor() {
        this.createdOn = Date.now();
        this.lastModifiedOn = Date.now();
    }
}

class User extends Schema {
    constructor() {
        super();
        this.uid = "";
        this.email = "";
        this.name = "";
        this.username = "";
        this.displayPicUrl = "img/placeholders/user.png";
        this.sources = {};
        this.categories = {};
        this.modules = {};
    }
}

class WorthSource extends Schema {
    constructor() {
        super();
        this.title = "";
        this.amount = 0.00;
        this.transactions = {};
    }
}

export default class SchemaFactory {
    static get( _schema ) {
        switch( _schema ) {
            case "user":
                return new User();
            case "source":
                return new WorthSource();
            default:
                return null;
        }
    }
}