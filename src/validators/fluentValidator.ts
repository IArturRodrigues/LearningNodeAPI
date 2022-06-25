import { IValidationContract } from '@interfaces/validator';

interface ValidatorConstructor {
   new(): IValidationContract;
   ():void;
}

interface Lengthwise {
   length: number;
}

let errors: any[] = [];

const ValidationContract = function(this: IValidationContract) {
   errors = [];
} as ValidatorConstructor;

ValidationContract.prototype.isRequired = <T extends Lengthwise>(value: T, message: string): void => {
   if (!value || value.length <= 0) {
      errors.push({ message: message });
   }
}

ValidationContract.prototype.hasMinLen = <T extends Lengthwise>(value: T, min: number, message: string): void => {
   if (!value || value.length <= min) {
      errors.push({ message: message });
   }
}

ValidationContract.prototype.hasMaxLen = <T extends Lengthwise>(value: T, max: number, message: string): void => {
   if (!value || value.length <= max) {
      errors.push({ message: message });
   }
}

ValidationContract.prototype.isFixedLen = <T extends Lengthwise>(value: T, len: number, message: string): void => {
   if (!value || value.length <= len) {
      errors.push({ message: message });
   }
}

ValidationContract.prototype.isEmail = (value: string, message: string): void => {
   var regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
   if (!regex.test(value)) {
      errors.push({ message: message });
   }
}

ValidationContract.prototype.errors = (): any[] => {
   return errors;
}

ValidationContract.prototype.clear = (): void => {
   errors = [];
}

ValidationContract.prototype.isValid = (): boolean => {
   return errors.length === 0;
}

export default ValidationContract;