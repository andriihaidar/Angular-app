export const PersonalInfoErrors = {
  firstName: { type: 'required', message: 'validation_errors.first_name_required'},
  lastName: { type: 'required', message: 'validation_errors.last_name_required'},
}

export const UniversityEmail = [
  { type: 'required', message: 'validation_errors.university_email_required'},
  { type: 'pattern', message: 'validation_errors.email_pattern'}
]

export const PasswordErrors = [
  { type: 'required', message: 'validation_errors.password_required'},
  { type: 'minlength', message: 'validation_errors.password_length'},
]

export const UniversityErrors = {
  email: [
    { type: 'required', message: 'validation_errors.email_required'},
    { type: 'pattern', message: 'validation_errors.email_pattern'}
  ],
  name: { type: 'required', message: 'validation_errors.name_required'},
  location: { type: 'required', message: 'validation_errors.location_required'},
}

export const LoginErrors = {
  email: [
    { type: 'pattern', message: 'validation_errors.email_pattern'}
  ],
}

export const ForgotPasswordErrors = [
  { type: 'required', message: 'validation_errors.email_required'},
  { type: 'pattern', message: 'validation_errors.email_pattern'}
]
