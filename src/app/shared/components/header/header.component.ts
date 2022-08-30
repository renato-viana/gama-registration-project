import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navbarResponsive') target: ElementRef = {} as ElementRef;;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  /* Why not ElementRef? - Beacause, DOM Manipulation works only in Browser. 
   * You will not able to use the App in other platforms like in a web worker, 
   * in Server (Server-side rendering), or in a Desktop, or in the mobile app, 
   * etc where there is no browser.
  */
  collapse(): void {
    if (this.target.nativeElement.style.display === 'block') {
      this.renderer.setStyle(this.target.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.target.nativeElement, 'display', 'block');
    }
  }

  // JavaScript implementation
  // collapse(): void {
  //   const target = document.getElementById('navbarResponsive') as HTMLElement;

  //   if (target.style.display == 'block') {
  //     target.style.display = 'none';
  //   } else {
  //     target.style.display = 'block';
  //   }
  // }

}
