import { Dispatch, SetStateAction, useState } from 'react';

export interface FormNormalized<Keys = Record<string, FormFieldNormalized>> {
  fields: Record<keyof Keys, FormFieldNormalized>;

  reset: () => void;
  setServerErrors: (errors: Record<keyof Keys, Array<string>>) => void;
  toFormData: () => FormData;
  toParams: <T = Record<keyof Keys, FormFieldValue>>() => T;
  updateField: (name: keyof Keys, value: FormFieldValue) => void;
  validateField: (field: FormFieldNormalized) => boolean;
  validateForm: (onSuccess?: () => void, onFailure?: () => void) => boolean;

  error: string | null;
  success: string | null;
  isLoading: boolean;
  isTouched: boolean;
  isValid: boolean;

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<string>>;

  __base: {
    keys: Record<keyof Keys, RawFormField>;
  };
}

export interface FormFieldNormalized<Value = string[]> {
  errors: Array<string>;
  isValid: boolean;
  name: string;
  rules: (RuleName | Rule)[];
  serverErrors: Array<string>;
  value: FormFieldValue;
  test?: Value;
}

export type FormFieldValue =
  | Date
  | File
  | string
  | number
  | boolean
  | null
  | unknown[];

export interface Rule {
  test: (
    field: FormFieldNormalized,
    args: Array<string>,
    fields: Record<string, FormFieldNormalized>
  ) => boolean;
  message: (
    field: FormFieldNormalized,
    args: Array<string>,
    fields: Record<string, FormFieldNormalized>
  ) => string;
}

export type RuleName =
  | 'alphabets'
  | 'alphabetsLowercase'
  | 'alphabetsLowercaseOnly'
  | 'alphabetsOnly'
  | 'alphabetsUppercase'
  | 'alphabetsUppercaseOnly'
  | `arrayContains:${string}`
  | `arrayDoesntContain:${string}`
  | `arrayLength:${number}`
  | `arrayMax:${number}`
  | `arrayMin:${number}`
  | 'date'
  | `dateAfter:${string}`
  | `dateBefore:${string}`
  | `dateBetween:${string}`
  | `dateExact:${string}`
  | `dateFormat:${string}`
  | 'email'
  | `exact:${string}`
  | 'file'
  | 'money'
  | 'name'
  | 'noSequence'
  | 'nullable'
  | 'numbers'
  | 'numbersOnly'
  | `numberBetween:${number}:${number}`
  | `numberExact:${number}`
  | `numberMin:${number}`
  | `numberMax:${number}`
  | 'phone'
  | 'required'
  | 'specialCharacters'
  | 'specialCharactersOnly'
  | `stringLength:${number}`
  | `stringMax:${number}`
  | `stringMin:${number}`
  | 'url';

export interface RawFormField {
  rules?: Array<RuleName | Rule>;
  value?: FormFieldValue;
}

const SEQUENCES = ['abc', '123'];

export const RULEHUB: Record<string, Rule> = {
  alphabets: {
    test: ({ value }) => !!value?.toString().match(/[a-z A-Z]/),
    message: () => 'this field must contain letters.',
  },
  alphabetsLowercase: {
    test: ({ value }) => !!value?.toString().match(/[a-z]/),
    message: () => 'this field must contain lowercase letters.',
  },
  alphabetsLowercaseOnly: {
    test: ({ value }) => !!value?.toString().match(/^[a-z]+$/),
    message: () => 'this field must contain only lowercase letters.',
  },
  alphabetsOnly: {
    test: ({ value }) => !!value?.toString().match(/^[a-z A-Z]+$/),
    message: () => 'this field must contain only letters.',
  },
  alphabetsUppercase: {
    test: ({ value }) => !!value?.toString().match(/[A-Z]/),
    message: () => 'this field must contain uppercase letters.',
  },
  alphabetsUppercaseOnly: {
    test: ({ value }) => !!value?.toString().match(/^[A-Z]+$/),
    message: () => 'this field must contain only uppercase letters.',
  },
  arrayContains: {
    test: ({ value }, array) => array.indexOf(value as string) > -1,
    message: (name, array) =>
      `this field has to contain any of these ${array.join(', ')}.`,
  },
  arrayDoesntContain: {
    test: ({ value }, array) => array.indexOf(value as string) < 0,
    message: (name, array) =>
      `this field cannot contain any of these ${array.join(', ')}.`,
  },
  arrayLength: {
    test: ({ value }, [length]) =>
      (value as Array<string>)?.length === Number(length),
    message: (field, [length]) => `exactly ${length} items are required.`,
  },
  arrayMax: {
    test: ({ value }, [max]) =>
      ((value as Array<string>)?.length || 0) <= Number(max),
    message: (field, [max]) => `at most ${max} items are required.`,
  },
  arrayMin: {
    test: ({ value }, [min]) =>
      ((value as Array<string>)?.length || 0) >= Number(min),
    message: (field, [min]) => `at least ${min} items are required.`,
  },
  date: {
    test: ({ value }) => value?.constructor === Date,
    message: () => 'this field.',
  },
  email: {
    test: ({ value }) =>
      !!value
        ?.toString()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
    message: () => 'this field has to be a valid email address.',
  },
  exact: {
    test: ({ value }, [fieldName], fields) => {
      const field = fields[fieldName];
      if (!field) {
        throw new Error(`Field ${fieldName} not found in form fields.`);
      }

      return !!value && value === field.value;
    },
    message: (field, [fieldName]) =>
      `this field should be the same as the ${fieldName} field.`,
  },
  file: {
    test: ({ value }) => value?.constructor === File,
    message: () => 'a file has to be chosen for this field.',
  },
  money: {
    test: ({ value }) => !!value?.toString().match(/^\d+(\.\d{1,2})?$/),
    message: () => 'this field can only money format and in 2 decimal places.',
  },
  name: {
    test: ({ value }) => !!value?.toString().match(/\w{2}(\s\w{2})+/),
    message: () => 'this field has to be a valid full address name.',
  },
  noSequence: {
    test: ({ value }) =>
      !value?.toString()?.match(new RegExp(SEQUENCES.join('|'))),
    message: () => 'this field must not contain simple sequences like abc, 123',
  },
  nullable: {
    test: () => true,
    message: () => '',
  },
  numberBetween: {
    test: ({ value }, [start, end]) =>
      Number(value) > Number(start) && Number(value) < Number(end),
    message: (field, [start, end]) =>
      `this field must be between ${start} and ${end}.`,
  },
  numberExact: {
    test: ({ value }, [expected]) => Number(value) === Number(expected),
    message: (field, [expected]) => `this field has to be exactly ${expected}.`,
  },
  numberMax: {
    test: ({ value }, [max]) => Number(value) <= Number(max),
    message: (field, [max]) => `this field has to contain less than ${max}.`,
  },
  numberMin: {
    test: ({ value }, [min]) => Number(value) >= Number(min),
    message: (field, [min]) => `this field has to contain at least ${min}.`,
  },
  numbers: {
    test: ({ value }) => !!value?.toString().match(/\d/),
    message: () => 'this field must contain numbers.',
  },
  numbersOnly: {
    test: ({ value }) => !!value?.toString().match(/^\d+$/),
    message: () => 'this field must contain only numbers.',
  },
  phone: {
    test: ({ value }) =>
      !!value?.toString().match(/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/),
    message: () => 'the field has to be a valid nigerian address number.',
  },
  required: {
    test: ({ value }) => !!value?.toString().length,
    message: () => 'this field is required.',
  },
  specialCharacters: {
    test: ({ value }) =>
      !!value?.toString().match(/[!@#$%^&*()_+~`{}[\]\\;:'"<>,.?/]+/),
    message: () => 'this field must contain punctuations.',
  },
  specialCharactersOnly: {
    test: ({ value }) =>
      !!value?.toString().match(/^[!@#$%^&*()_+~`{}[\]\\;:'"<>,.?/]+$/),
    message: () => 'this field must contain only punctuations.',
  },
  stringLength: {
    test: ({ value }, [length]) => value?.toString().length === Number(length),
    message: (field, [length]) =>
      `this field has to be exactly ${length} characters.`,
  },
  stringMax: {
    test: ({ value }, [max]) => (value?.toString().length || 0) <= Number(max),
    message: (field, [max]) =>
      `this field has to contain less than ${max} characters.`,
  },
  stringMin: {
    test: ({ value }, [min]) => (value?.toString().length || 0) >= Number(min),
    message: (field, [min]) =>
      `this field has to contain at least ${min} characters.`,
  },
  url: {
    test: ({ value }) =>
      !!value
        ?.toString()
        .match(
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        ),
    message: () => 'this field has to be a valid url address',
  },
};

const generateFields = <Keys>(keys: Record<keyof Keys, RawFormField>) => {
  const fields: Record<string, FormFieldNormalized> = {};
  Object.keys(keys).forEach((name) => {
    const { rules = ['required'], value = '' } = keys[name];
    fields[name] = {
      name,
      rules,
      value,
      isValid: true,
      errors: [],
      serverErrors: [],
    };
  });
  return fields as Record<keyof Keys, FormFieldNormalized>;
};

export const useForm = <Keys>(keys: Keys): FormNormalized<Keys> => {
  const [fields, setFields] = useState(generateFields<Keys>(keys));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(undefined);
  const [isTouched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = () => setFields(generateFields(keys));

  const updateField = (name: keyof Keys, value: FormFieldValue) => {
    setFields((fields) => {
      const updatedField = { ...fields[name], value };
      return {
        ...fields,
        [name]: validateSingleField(updatedField),
      };
    });
  };

  const validateSingleField = (
    field: FormFieldNormalized
  ): FormFieldNormalized => {
    const newField = { ...field };
    newField.errors = [];
    newField.serverErrors = [];
    newField.isValid = newField.rules.every((key) => {
      const { rule, args = [] } = ((): {
        rule?: Rule;
        args?: Array<string>;
      } => {
        switch (typeof key) {
          case 'string': {
            const [ruleName, ...args] = key.match(/\w+/g);

            const rule = RULEHUB[ruleName];
            return { rule, args };
          }
          case 'object': {
            return { rule: key as Rule, args: [] };
          }
          default:
            return {};
        }
      })();
      if (!rule) {
        throw new Error(`Invalid validation rule for ${newField.name}`);
      }
      const { test, message } = rule;
      if (!test(newField, args, fields)) {
        newField.errors.push(message(newField, args, fields));
        return false;
      }
      return true;
    });

    return newField;
  };

  const validateField = (field: FormFieldNormalized): boolean => {
    const validatedField = validateSingleField(field);
    setFields({
      ...fields,
      [field.name]: validateSingleField(field),
    });
    return validatedField.isValid;
  };

  const validateForm = (onSuccess?: () => void, onFailure?: () => void) => {
    let isFormValid = true;
    const validatedFields: Record<string, FormFieldNormalized> = {};
    Object.keys(fields).map((name) => {
      validatedFields[name] = validateSingleField(fields[name]);
      if (!validatedFields[name].isValid) {
        isFormValid = false;
      }
    });
    setFields(validatedFields as Record<keyof Keys, FormFieldNormalized>);
    setIsValid(isFormValid);
    isFormValid ? onSuccess?.() : onFailure?.();
    return isFormValid;
  };

  const toFormData = (): FormData => {
    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      if (fields[key].value?.constructor === Array) {
        (fields[key].value as Array<unknown>).forEach((value) => {
          formData.append(`${key}[]`, value as never);
        });
      } else {
        formData.append(key, fields[key].value as never);
      }
    });

    return formData;
  };

  function toParams<T = Record<keyof Keys, FormFieldValue>>(): T {
    const params: Record<string, FormFieldValue> = {};
    Object.keys(fields).forEach((key) => (params[key] = fields[key].value));
    return params as unknown as T;
  }

  const setServerErrors = (errors: Record<keyof Keys, Array<string>>) => {
    const f = { ...fields };
    Object.keys(f).forEach(
      (name) => (f[name].serverErrors = errors[name] || [])
    );
    setFields(f);
  };

  return {
    fields,

    reset,
    setServerErrors,
    toFormData,
    toParams,
    updateField,
    validateField,
    validateForm,

    error,
    success,
    isLoading,
    isValid,
    isTouched,

    setIsLoading,
    setError,
    setSuccess,

    __base: {
      keys,
    },
  };
};
