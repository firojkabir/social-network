import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
} from 'rxjs';
import { UserService } from '../user/services/user.service';
import { matchValidator } from '../utils/form-validators';
import { passwordValidator } from '../utils/password-validtors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  objectKeys = Object.keys;

  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      this.emailExists()
    ),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    confirmPassword: new FormControl('', [
      Validators.required,
      matchValidator('password'),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(16)]),
    phone: new FormControl(
      '',
      [Validators.required, Validators.pattern('[- +()0-9 ]{11,14}')],
      this.phoneDuplicate()
    ),
    country: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private userService: UserService) {
    // to debug userForm
    // this.userForm.valueChanges.subscribe({
    //   next: () => {
    //     console.log(this.userForm);
    //   },
    // });
    // this.userForm.statusChanges.subscribe({
    //   next: (status: string) => {
    //     console.log(status);
    //   },
    // });
  }

  ngOnInit() {
    this.passwordControl?.valueChanges.subscribe({
      next: () => {
        this.confirmPasswordControl?.updateValueAndValidity();
      },
    });
  }

  get nameControl() {
    return this.userForm.get('name');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }

  get confirmPasswordControl() {
    return this.userForm.get('confirmPassword');
  }

  get ageControl() {
    return this.userForm.get('age');
  }

  get phoneControl() {
    return this.userForm.get('phone');
  }

  get countryControl() {
    return this.userForm.get('country');
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    const payload = { ...this.userForm.value };
    delete payload.confirmPassword;
    this.userService.createUser(payload).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
    });
  }

  isEmailUnique = (email: string) => {
    return this.userService.emailExists({ email: email }).pipe(
      map((response: Record<string, any>) => {
        return !!response['unique'];
      })
    );
  };

  emailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<any> | Observable<any> => {
      return control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((email) => this.isEmailUnique(email)),
        map((unique: boolean) => {
          return unique ? null : { emailExists: true };
        }),
        first()
      );
    };
  }

  isPhoneUnique = (phone: string) => {
    return this.userService.phoneExists({ phone: phone }).pipe(
      map((response: Record<string, any>) => {
        return !!response['unique'];
      })
    );
  };

  phoneDuplicate(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<any> | Observable<any> => {
      return control.valueChanges.pipe(
        debounceTime(400),
        switchMap((phone) => this.isPhoneUnique(phone)),
        map((unique: boolean) => {
          return unique ? null : { phoneDuplicate: true };
        }),
        first()
      );
    };
  }

  getErrorMessageKey = (error: string): string => {
    const errors: Record<string, string> = {
      required: 'REQUIRED_FIELD',
      minlength: 'MINIMUN_NAME_LENGTH',
      maxlength: 'MAXIMUM_NAME_LENGTH',
      email: 'EMAIL_VALIDITY',
      emailExists: 'EMAIL_EXISTENCE',
      passwordMismatch: 'PASSWORD_MATCHING',
      min: 'MINIMUM_AGE',
      pattern: 'PHONE_NUMBER_PATTERN',
      phoneDuplicate: 'DUPLICATE_PHONE_NUMBER',
      minimumFiveCharacters: 'MINIMUM_PASSWORD_LENGTH',
      maximumTenCharacters: 'MAXIMUM_PASSWORD_LENGTH',
      minimumOneUppercase: 'MINIMUM_UPPERCASE_CHARACTER',
      minimumOneLowercase: 'MINIMUM_LOWERCASE_CHARACTER',
      minimumOneNumber: 'MINIMUM_DIGIT',
    };

    return 'ERROR_MESSAGES.' + errors[error];
  };
}
