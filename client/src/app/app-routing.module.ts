import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionPostingComponent } from './components/question-posting/question-posting.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { AnswerSubmissionComponent } from './components/answer-submission/answer-submission.component';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },    
  { path: 'ask', component: QuestionPostingComponent },
  { path: 'question/:questionId', component: AnswerListComponent },
  { path: 'answer-submission/:questionId', component: AnswerSubmissionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}