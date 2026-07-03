import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { I18nService, Language } from "../../core/services/i18n";

@Component({
    selector: 'app-language-switcher',
    imports: [MatButtonModule],
    templateUrl: './language-switcher.html',
    styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
    constructor(public i18n: I18nService) {}

    setLanguage(language: Language): void {
        this.i18n.setLanguage(language);
    }
}