import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  private http = inject(HttpClient)
  private apiKey = 'bf37abe5c35b4a85e63456816900a0fc5ce0604d';
  private url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

  completeAddress(query: string) {
    return this.http.post(this.url, {query}, {
      headers: {
        "Authorization": "Token " + this.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  checkApiKey() {
    this.completeAddress('москва').subscribe({
      next: (response) => {
        console.log('✅ Ключ работает!', response);
      },
      error: (error) => {
        console.error('❌ Ошибка ключа:', error);

        if (error.status === 401) {
          console.log('🔑 Получите новый ключ на dadata.ru');
        }
      }
    });
  }
}
