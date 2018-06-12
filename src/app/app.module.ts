import * as angular from "angular";
import { appDirectiveName } from "./app.component";

export const appModule = angular
    .module("filApp", [appDirectiveName]);