import { AppController } from "./app.controller";
export class AppDirective implements ng.IDirective{

    public restrict: string = "E";
    public replace: boolean = false;
    public templateUrl: string= "app/app.component.html";
    public controller: any = AppController;
    public controllerAs: string =  "vm";

    constructor() {
        
    }

    public static factory(): ng.IDirectiveFactory {
        return () => new AppDirective();
    }
};
