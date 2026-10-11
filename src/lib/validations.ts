/**
 * Validation utilities and schemas
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateCourseName = (name: string): boolean => {
  return name.length >= 3 && name.length <= 100;
};

export const validatePrice = (price: number): boolean => {
  return price >= 0 && price <= 10000;
};

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationSchema {
  private errors: ValidationError[] = [];

  addError(field: string, message: string): this {
    this.errors.push({ field, message });
    return this;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  getErrorsByField(field: string): string[] {
    return this.errors
      .filter((e) => e.field === field)
      .map((e) => e.message);
  }

  clear(): void {
    this.errors = [];
  }
}
