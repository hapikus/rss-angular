import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

function getErrorText(recommendation: string) {
  return `Your password isn't strong enough ${recommendation}`;
}

const checkRequired = (value: string | null): ValidationErrors | null => {
  if (!value) {
    return { required: 'Please input your Password!' };
  }
  return null;
};

const checkMinLength = (value: string | null): ValidationErrors | null => {
  const minLength = !!value && value.length < 8;
  if (minLength) {
    return { minLength: getErrorText('at least 8 characters') };
  }
  return null;
};

const checkLowerUpper = (value: string | null): ValidationErrors | null => {
  const upperAndLowerCase =
    !!value &&
    value
      .split('')
      .some((elem) => Number.isNaN(+elem) && elem === elem.toLowerCase()) &&
    value
      .split('')
      .some((elem) => Number.isNaN(+elem) && elem === elem.toUpperCase());
  if (!upperAndLowerCase) {
    return {
      upperAndLowerCase: getErrorText(
        'a mixture of both uppercase and lowercase letters',
      ),
    };
  }
  return null;
};

const checkLettersNumbers = (value: string | null): ValidationErrors | null => {
  const letters = !!value && /.*[a-zA-Z].*/.test(value);
  const numbers = !!value && /.*[0-9].*/.test(value);
  if (!numbers || !letters) {
    return {
      letterNumberMixture: getErrorText('a mixture of letters and numbers'),
    };
  }
  return null;
};

const checkSpecial = (value: string | null): ValidationErrors | null => {
  const special =
    !!value && /.*[!@#$%^&*()_+\-=[\]{};':"|,.<>/?].*/.test(value);
  if (!special) {
    return {
      special: getErrorText(
        'inclusion of at least one special character, e.g., ! @ # ? ]',
      ),
    };
  }
  return null;
};

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const { value } = control;
    return (
      checkRequired(value) ||
      checkMinLength(value) ||
      checkLowerUpper(value) ||
      checkLettersNumbers(value) ||
      checkSpecial(value)
    );
  };
}
