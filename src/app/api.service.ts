import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';

const CHAVE = []
const headers = new HttpHeaders()

//const api_token = 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
emitirSecao = new EventEmitter<any>();
api_URL = "https://jsonplaceholder.typicode.com/posts";
api_Token = "https://jsonplaceholder.typicode.com/posts";
chave: any
chaveWebConfig: any


postData: any
  constructor(private http: HttpClient) { }

  getSecao(){
    this.emitirSecao.emit()
  }

  postJson(dados: any) {
    headers.set('Authorization', this.chave )
    
    this.http.post(`${this.api_URL}`, dados, {headers})
      .subscribe(
        data => this.postData = JSON.stringify(data),
          error => alert(error.toString()),
          //() => console.log("acesso a webapi post ok..." , this.postData)
         
       );      
  }

  PostToken(token){
    this.http.post(`${this.api_Token}`, token)
     .subscribe(
      data =>  this.chave = JSON.stringify(data),
          
          error => alert(error.toString()),
          //() =>   console.log(" POST TOKEN acesso a webapi post ok..." , this.chave),
          
         
       );   
 }
   getChave(){
    this.http.get('assets/webconfig.txt').subscribe(data => {
      this.PostToken(data)
      //console.log(data);
  })
  
   }
}
