import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Import withFetch
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { SearchComponent } from './components/search/search.component';
import { QuestionPostingComponent } from './components/question-posting/question-posting.component';
import { AnswerSubmissionComponent } from './components/answer-submission/answer-submission.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

import { AuthService } from './components/services/auth.service';
import { SearchService } from './components/services/search.service';
import { RatingService } from './components/services/rating.service';
import { UpvoteService } from './components/services/upvote.service';
import { CommentsService } from './components/services/comment.service';
import { QuestionService } from './components/services/question.service';
import { AnswerService } from './components/services/answer.service';

import { RatingPipe } from './components/pipes/rating.pipe';
import { UpvotePipe } from './components/pipes/upvote.pipe';

import { RatingDirective } from './components/directives/rating.directive';
import { UpvoteDirective } from './components/directives/upvote.directive';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'ask', component: QuestionPostingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    AnswerListComponent,
    CommentListComponent,
    SearchComponent,
    QuestionPostingComponent,
    AnswerSubmissionComponent,
    LoginComponent,
    SignupComponent,
    RatingPipe,
    UpvotePipe,
    RatingDirective,
    UpvoteDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    SearchService,
    RatingService,
    UpvoteService,
    CommentsService,
    QuestionService,
    AnswerService,
    provideHttpClient(withFetch()) // Enable fetch for HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
