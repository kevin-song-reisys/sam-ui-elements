/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DocumentationService } from './services/documentation.service';

import { routerTransition } from './router.animations';
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app',
  animations: [ routerTransition ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <main [@routerTransition]="getState(o)">
      <router-outlet #o="outlet"></router-outlet>
      <router-outlet name="codesection"></router-outlet>
    </main>
    <sam-alert-footer></sam-alert-footer>
  `,
  providers: [DocumentationService]
})
export class AppComponent implements OnInit {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  sidenavConfig = {
      label: "test",
      children: [],
  };
  uikitList = {};
  staticpagelist = {};

  showBanner = false;
  showHeader = true;
  showUIKitHeader = false;
  showUIKitSearchHeader = false;
  constructor(private route: ActivatedRoute, private router: Router,
              private service: DocumentationService) {}
  resolveRoute(path){
    if(path == "/"){
      
    } else {
      this.router.navigate([path]);
    }
  }
  public ngOnInit() {

    //sidenav config setup
    //DOCS is a global defined in webpack
    for(var idx in DOCS){
      if(!this.uikitList[DOCS[idx]['section']]){
        this.uikitList[DOCS[idx]['section']] = [{
          label: DOCS[idx]['item'],
          route: DOCS[idx]['link']
        }];
      } else {
        this.uikitList[DOCS[idx]['section']].push({
          label: DOCS[idx]['item'],
          route: DOCS[idx]['link']
        });
      }
      
    }
    var x = this.uikitList;
    var test = Object.keys(this.uikitList).map(function(key){
      var list = x[key];
      return {
        label: key,
        route: "/",
        children: list
      };
    });
    this.sidenavConfig['children'] = test;
    //STATICPAGES is a global defined in webpack
    for(var idx in STATICPAGES){
      if(!this.staticpagelist[STATICPAGES[idx]['section']]){
        this.staticpagelist[STATICPAGES[idx]['section']] = [{
          label: STATICPAGES[idx]['item'],
          route: STATICPAGES[idx]['link']
        }];
      } else {
        this.staticpagelist[STATICPAGES[idx]['section']].push({
          label: STATICPAGES[idx]['item'],
          route: STATICPAGES[idx]['link']
        });
      }
    }
    var x = this.staticpagelist;
    var test2 = Object.keys(this.staticpagelist).map(function(key){
      var list = x[key];
      return {
        label: key,
        route: "/",
        children: list
      };
    }).sort(function(a,b){
      if(a.label=="Overview"){
        return -1;
      } else if (b.label=="Overview"){
        return 1;
      }
      if(a.label.charAt(0).toLowerCase()<b.label.charAt(0).toLowerCase()){
        return -1;
      } else if (a.label.charAt(0).toLowerCase()>b.label.charAt(0).toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.sidenavConfig['children'] =  test2.concat(this.sidenavConfig['children']);
    
    //handlers for specific routes
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.match(/^\/components\/banner/)){
          this.showBanner = true;
        } else {
          this.showBanner = false;
        }
        if(event.url.match(/^\/components\/header/) || event.url.match(/^\/components\/search-header/)){
          this.showHeader = false;
          if(event.url.match(/^\/components\/header/)){
            this.showUIKitHeader = true;
          } else if(event.url.match(/^\/components\/search-header/)){
            this.showUIKitSearchHeader = true;
          }
        } else {
          this.showUIKitHeader = false;
          this.showHeader = true;
          this.showUIKitSearchHeader = false;
        }
      }
    });
  }
}
