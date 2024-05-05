import { Component } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PasswordStrengthService } from './password-strength.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss', '../../theme.scss']
})
export class SignupPageComponent {

  signupForm: UntypedFormGroup = new UntypedFormGroup({});
  isSubmitted: boolean = false;
  passwordStrength: number = 0;

  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  passwordFocused: boolean = false;

  imagesContainer: any = [
    {
      imageSrcUrl: '/assets/image/signup_image_1.jpg',
      imageAlt: 'Signup First'
    },
    {
      imageSrcUrl: '/assets/image/signup_image_2.jpg',
      imageAlt: 'Signup Second'
    },
    {
      imageSrcUrl: '/assets/image/signup_image_3.jpg',
      imageAlt: 'Signup Third'
    },
    {
      imageSrcUrl: '/assets/image/signup_image_4.jpg',
      imageAlt: 'Signup Fourth'
    }
  ];

  selectedIndex: number = 0;
  indicator: boolean = true;
  controls: boolean = true;
  autoSlide: boolean = true;
  slideDuration: number = 4000;//Default to 4 seconds

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private passwordStrengthService: PasswordStrengthService
  ) {}

  ngOnInit() {
    if(this.autoSlide) {
      this.autoSlideImages();
    }

    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(8), this.passwordWithNoSpace]],
      confirm_password: ['', [Validators.required]]
    }, {
      validators: this.confirmPasswordValidator
    });

    // Update passwordStrength on password changes
    this.signupForm.get('password')!.valueChanges.subscribe(password => {
      this.passwordStrength = this.passwordStrengthService.checkStrength(password);
    });
  }

  passwordWithNoSpace(control: AbstractControl): any {
    if(control.value) {
      if((control.value as string).indexOf(' ') >= 0) {
        return {noSpace: true}
      }
      return null;
    }
  }

  //Custom Validator for password and confirm password to check they are same or not
  confirmPasswordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirm_password')!.value;
    const confirmPasswordGroup = control.get('confirm_password');

    if (password !== confirmPassword && password && confirmPassword) {
      confirmPasswordGroup?.setErrors({notSame: true});
      return { notSame: true };
    } else {
      // confirmPasswordGroup?.setErrors(null);
      return null;
    }
  }

  getStrengthColor(score: number): string {
    if (score <= 2) {
      return 'warn'; // Red for weak password
    } else if (score <= 4) {
      return 'accent'; // Orange for medium password
    } else {
      return 'primary'; // Green for strong password
    }
  }
  
  getStrengthMessage(score: number): string {
    if (score <= 2) {
      return 'Weak password';
    } else if (score <= 4) {
      return 'Medium password';
    } else {
      return 'Strong password';
    }
  }

  //changes slide in every 3 seconds
  autoSlideImages() {
    setInterval(() => {
      this.onNextClick();
    }, this.slideDuration);
  }

  //set index of images on dot/indicator click
  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onNextClick() {
    if(this.selectedIndex === this.imagesContainer.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  navigateTo() {
    this.router.navigate(['/login'])
  }
  
  onSubmit() {

  }
}
