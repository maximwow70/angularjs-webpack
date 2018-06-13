import * as angular from "angular";
import { AppDirective } from "./app.directive";
import { UserService } from "./services/user.service";

declare const _environmentConstants: any;

angular
    .module("AppModule", [])
    .service("UserService", UserService)
    .directive("app", AppDirective.factory())
    // #region constants
    .constant("apiBase", _environmentConstants.app.apiBase)
    // #endregion constants
    .config(function () { });
