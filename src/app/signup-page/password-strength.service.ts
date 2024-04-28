import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }

  checkStrength(password: string): number {
    let score = 0;

    // Check for minimum length
    if (password.length >= 8) {
      score += 1;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 1;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      score += 1;
    }

    // Check for special characters
    if (/[^a-zA-Z0-9 ]/.test(password)) {
      score += 1;
    }

    // Bonus points for longer passwords
    if (password.length > 12) {
      score += 1;
    }

    return score;
  }
}
