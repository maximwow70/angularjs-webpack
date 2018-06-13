import { UserService } from "./services/user.service";
import User from "./model/user";

import * as _ from "lodash";

export class AppController {

    public static $inject: string[] = ["UserService"];

    private _users: User[] = [];
    public get users(): User[] {
        return this._users;
    }

    private _title: string = "Hello";
    public get title(): string {
        return this._title;
    }

    constructor(
        private _userService: UserService
    ) {

        this._users = this._userService.getUsers();
        _.map(this._users, user => console.log(user));
    }
};

