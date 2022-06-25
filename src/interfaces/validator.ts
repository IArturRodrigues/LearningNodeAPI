export interface IValidationContract {
   isRequired<T>(value: T, message: string): void;
   hasMinLen(value: string | any[], min: number, message: string): void;
   hasMaxLen(value: string | any[], max: number, message: string): void;
   isFixedLen(value: string | any[], len: number, message: string): void;
   isEmail(value: string, message: string): void;
   errors(): any;
   clear(): void;
   isValid(): boolean;
}