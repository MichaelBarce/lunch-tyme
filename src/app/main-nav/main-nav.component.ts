import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
  events: string[] = [];
  opened: boolean;
  color = 'accent';
  checked = false;
  disableSideNav: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private dataService: DataService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("MainNavComponent :: ngOnInit()");
    this.disableSideNav = false;
    this.dataService.disableSideNavChanges$.subscribe(
      data => {
        this.disableSideNav = data;
        console.log("MainNavComponent :: ngOnInit :: subscribe :: disableSideNavChanges$ ");
        console.log("this.disableSideNav");
        console.log(this.disableSideNav);
      }
    ); 
  }

  viewList(){
    console.log("MainNavComponent :: viewList()");
    this.dataService.changeDisableSideNav(false);
    //this.router.navigate(['/listdetails']);
  }

  viewMap(){
    console.log("MainNavComponent :: viewMap()");
    if(this.disableSideNav == true) {
      this.dataService.changeDisableSideNav(false);
    }
    else {
      this.dataService.changeDisableSideNav(true);
    }




  }


  }
