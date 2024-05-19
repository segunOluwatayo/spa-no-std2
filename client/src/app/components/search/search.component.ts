import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() searchResults = new EventEmitter<Question[]>();

  constructor(private searchService: SearchService) {}

  search(): void {
    this.searchService.searchQuestions(this.searchTerm).subscribe(
      (results: Question[]) => {
        this.searchResults.emit(results);
      },
      (error: any) => {
        console.error('Error searching questions:', error);
      }
    );
  }
}