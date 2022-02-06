import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Inject, Injectable } from '@angular/core';
import { Responce } from './core/http/responce';

@Injectable()
export class VersionCheckService  {

  //post-build.js uzerınden replace olacak
  private currentHash = "{{POST_BUILD_ENTERS_HASH_HERE}}";

  constructor(private http:HttpClient){}

  public initVersionCheck(url,frequency=100000*60*30){
    setInterval(()=>{
      this.checkVersion(url);
    },frequency);
  }

  private checkVersion(url){
    debugger;
    this.http.get(url+'?t='+new Date().getTime())
            .subscribe((responce:any)=>{
              debugger;
              const hash=responce.hash;
              const hashChanged = this.hasHashChanged(this.currentHash,hash);
              if(hashChanged){
                // yeni surum bulundu sayfa yenıle
              }
              this.currentHash = hash;
    },(err)=>{
      console.error(err,'surum alınamadı');
    });
  }

  private hasHashChanged(currentHash,newHash){
    if(!currentHash || currentHash==='{{POST_BUILD_ENTERS_HASH_HERE}}'){
      return false;
    }
    return currentHash!==newHash;
  }

}
