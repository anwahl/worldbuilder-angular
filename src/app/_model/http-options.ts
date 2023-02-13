import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const postOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const putOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const getOptions = {
    headers: new HttpHeaders({})
};

export const deleteOptions = {
    headers: new HttpHeaders({})
};