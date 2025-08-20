import { FormControl, ValidationErrors } from "@angular/forms";

const languages = ["english", "arabic", "french", "korean", "spanish", "chinese", "japanese", "hindi"];

export function languageValidator(control: FormControl): ValidationErrors | null{
 if(!control.value) return null;
    return languages.includes(control.value.toLowerCase())? null: {invalidLanguage: true};
}