import User from "../model/user";
import { IPromise } from "angular";

export class UserService {

    public static $inject: string[] = ["$http", "apiBase"];

    private _users: User[] = [];

    constructor(private _http: ng.IHttpService, private _apiBase: string) {

        this._users = [
            new User(1, "name"),
            new User(2, "name2")
        ];

        this.loadUsers()
            .then(console.log)
            .catch((error) => console.error("Can not load users!"));
    }

    private loadUsers(): IPromise<User[]> {
        return this._http.get(`${this._apiBase}/kek`)
            .then((response: any) => response.data.map(u => User.fromJSON(u)));
    } 

    public getUsers(): User[] {
        return [...this._users];
    }
}
