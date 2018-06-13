export default class User {
    private _id: number = null;
    private _name: string = null;

    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    public equals(other: User): boolean {
        return other
            && this.id === other.id
            && this.name === other.name;
    }

    public static toJSON(user: User): any {
        return {
            id: user.id,
            name: user.name
        }
    }

    public static fromJSON(json: any): User {
        return new User(json.id, json.name);
    }
}
