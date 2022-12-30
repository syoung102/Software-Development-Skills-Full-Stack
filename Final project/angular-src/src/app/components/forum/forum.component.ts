import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})


export class ForumComponent implements OnInit {
  user:Object;
  forum:Object;
  username: String;
  content: String;

  
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }
  

  ngOnInit() { 
    this.authService.getForum().subscribe((profile) => {
      this.forum = profile.forum;
    },
    err => {
       console.log(err);
       return false;
    }); 
  }

  onPost() {
    this.authService.getProfile().subscribe((posting) => {
      this.username = posting.user.username;
      console.log(this.username);

      const forum = {
        username: this.username,
        content: this.content
      }
      console.log(this.username);


      this.authService.postComment(forum).subscribe(data => {
        if(data.success){
          location.reload();
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/forum']);
        }
      });
    });

  }
}

