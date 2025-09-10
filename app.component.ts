import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-module';

  constructor(private userService: UserService) {
    this.getUserDetails();
  }

  // Create new user
  register(registerForm: NgForm) {
    this.userService.registerUser(registerForm.value).subscribe(
      (resp: any) => {
        console.log("User registered:", resp);
        registerForm.reset();
        this.getUserDetails();
      },
      (err: any) => {
        console.error("Error registering user:", err);
      }
    );
  }

  // Fetch all users
  getUserDetails() {
    this.userService.getUsers().subscribe(
      (resp) => {
        console.log("All users:", resp);
        this.userDetails = resp;
      },
      (err) => {
        console.error("Error fetching users:", err);
      }
    );
  }

  userDetails: any[] = [];

  // Delete user
  deleteUser(user: any) {
    this.userService.deleteUser(user.id).subscribe(
      (resp) => {
        console.log("User deleted:", resp);
        this.getUserDetails();
      },
      (err) => {
        console.error("Error deleting user:", err);
      }
    );
  }

  // Object for editing a user
  userToUpdate = {
    id: null as any,
    sname: "",
    email: "",
    regno: null as any,
    dep: "",
    cgpa: null as any,
    
  };

  // Load selected user into edit form
  edit(user: any) {
    this.userToUpdate = { ...user };
  }

  // Update user
  updateUser() {
    this.userService.updateUser(this.userToUpdate).subscribe(
      (resp) => {
        console.log("User updated:", resp);
        this.getUserDetails();
      },
      (err) => {
        console.error("Error updating user:", err);
      }
    );
  }
}
