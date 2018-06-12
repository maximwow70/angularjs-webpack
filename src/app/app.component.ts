import * as angular from "angular";

export class AppController {

    private _title: string = "Hello";
    public get title(): string {
        return this._title;
    }

    constructor() {
    }
}

export function AppDirective() {
    return {
        restrict: "E",
        replace: false,
        template: "<div>{{title}}</div>"
    }
};

export const appDirectiveName: string = angular
    .module("filApp", [])
    .directive("filApp", AppDirective)
    .name;
