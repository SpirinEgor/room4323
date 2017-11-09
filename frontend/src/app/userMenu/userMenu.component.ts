import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../common/user';

@Component({
    selector: 'userMenu',
    templateUrl: './userMenu.html'
})
export class UserMenu {
    @Input() user: User;
    @Output() onLogout = new EventEmitter();
    @Output() onSignIn = new EventEmitter();
}
