import User from "../model/user";
import { IPromise } from "angular";

export class UserService {

    public static $inject: string[] = ["$http"];

    private _apiBase: string = "api-base";

    private _users: User[] = [];

    constructor(private _http: ng.IHttpService) {

        this._users = [
            new User(1, "neame"),
            new User(2, "name2")
        ];

        this.loadUsers().then(console.log);
    }

    private loadUsers(): IPromise<User[]> {
        return this._http.get(`${this._apiBase}/kek`)
            .then((response: any) => response.data.map(u => User.fromJSON(u)));
    } 

    public getUsers(): User[] {
        return [...this._users];
    }
}
