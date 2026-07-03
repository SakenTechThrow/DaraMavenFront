import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { L } from "@angular/cdk/keycodes";

export type Language = 'ru' | 'kk';

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    currentLanguage = signal<Language>(
        (localStorage.getItem('language') as Language) || 'ru'
    );

    private translations = signal<Record<string, any>>({});

    constructor(private http: HttpClient) {
        this.loadLanguage(this.currentLanguage());
    }

    setLanguage(language: Language): void {
        localStorage.setItem('language', language);
        this.currentLanguage.set(language);
        this.loadLanguage(language);
    }
    
    translate(key: string): string {
        const dictionary = this.translations();

        const value = key.split('.').reduce((current, part) => {
            return current?.[part];
        }, dictionary);

        if (typeof value === 'string'){
            return value;
        }
        return key;
    }
    private loadLanguage(language: Language): void {
        this.http.get<Record<string, any>>(`/i18n/${language}.json`)
        .subscribe({
            next: (data) => {
                this.translations.set(data);
            },
            error: () => {
                console.error('Could not load language file: ${language}');
            }
        })
    }
}