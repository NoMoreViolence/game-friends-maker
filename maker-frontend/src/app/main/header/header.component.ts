import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {}

  public changeLang = (value: HTMLSpanElement) => this.translate.use(value.innerText);
}
