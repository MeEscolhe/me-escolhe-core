import { ValidationError } from "class-validator";

class ClassValidatorError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(errors: Array<ValidationError>, statusCode = 400) {
    this.message = errors.map((error) => error.constraints).map((constraints: any) =>
      Object.values(constraints).reduce((acc: string, value: any) => acc += value + " ", "")
    ).join(", ").trim();
    this.statusCode = statusCode;
  }
}

export default ClassValidatorError;
