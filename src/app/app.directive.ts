import { AppController } from "./app.controller";

export function AppDirective() {
    return {
        restrict: "E",
        replace: false,
        templateUrl: "app/app.component.html",
        controller: AppController,
        controllerAs: "vm"
    }
};
