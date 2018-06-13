import * as angular from "angular";
import { AppDirective } from "./app.directive";
import { UserService } from "./services/user.service";

angular
    .module("AppModule", [])
    .service("UserService", UserService)
    .directive("app", AppDirective.factory())
    .config(function () { });
