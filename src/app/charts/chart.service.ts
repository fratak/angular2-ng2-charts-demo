import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Rx';

@Injectable()
export class ChartService {

  //private urlString = "app/charts/line-chart-data.json";
  private testString: string;

  constructor(private http: Http) {
  }

  public getChart(urlString: string){
    return this.http
      .get(urlString)
      .map(res => res.json())
      .catch(this.handleError);
  }

  public paramTest(str:any):any {
    return str;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
