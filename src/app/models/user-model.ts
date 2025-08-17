export class UserModel {
    constructor(public email:string, 
        public id:string, 
        private _token: string,
         private __expiresIn: Date,
         public favBooks: string[] = []
    ){}

    get token(): string | null{
        if(!this.__expiresIn || this.__expiresIn < new Date()){
            return null;
        }
        return this._token;
    }
}