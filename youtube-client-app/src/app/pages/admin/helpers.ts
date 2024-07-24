import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const checkRequired = (
  value: string | null,
  message: string,
): ValidationErrors | null => {
  if (!value) {
    return { required: message };
  }
  return null;
};

const checkMinLength = (
  value: string | null,
  minLength: number,
  message: string,
): ValidationErrors | null => {
  const minLengthCheck = !!value && value.length < minLength;
  if (minLengthCheck) {
    return { minLength: message };
  }
  return null;
};

const checkMaxLength = (
  value: string | null,
  maxLength: number,
  message: string,
): ValidationErrors | null => {
  const minLength = !!value && value.length > maxLength;
  if (minLength) {
    return { minLength: message };
  }
  return null;
};

const checkIsLink = (
  value: string | null,
  message: string,
): ValidationErrors | null => {
  let isLink = false;
  try {
    isLink = !!value && !!new URL(value);
  } catch {
    isLink = false;
  }
  return isLink ? null : { isLink: message };
};

export function titleValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const { value } = control;
    return (
      checkRequired(value, 'Please enter a title') ||
      checkMinLength(value, 3, 'The title is too short') ||
      checkMaxLength(value, 20, 'The title is too long')
    );
  };
}

export function descriptionValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const { value } = control;
    return checkMaxLength(value, 255, 'The description is too long');
  };
}

export function previewImageValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const { value } = control;
    return (
      checkRequired(value, 'Please enter a link to the image') ||
      checkIsLink(value, 'Image link is not valid!')
    );
  };
}

export function videoValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const { value } = control;
    return (
      checkRequired(value, 'Please enter a link to the video') ||
      checkIsLink(value, 'Video link is not valid!')
    );
  };
}
