import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'auth-tabs-component',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthTabsComponent implements OnInit {
  @Output() selectedTab = new EventEmitter<boolean>()

  signUpSelected = true;

  ngOnInit(): void {
    this.selectedTab.emit(this.signUpSelected)
  }

  selectSignUpTab(signup = true): void{
    this.signUpSelected = signup
    this.selectedTab.emit(signup)
  }

}
