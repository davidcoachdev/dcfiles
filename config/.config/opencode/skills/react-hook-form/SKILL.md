---
name: react-hook-form
description: >
  React Hook Form v7 patterns for form handling, validation, and integration with UI libraries.
  Trigger: When building React forms, using react-hook-form, form validation, or integrating with Material UI/Chakra.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building React forms (v7)
- Form validation (inline + with Zod)
- Integration with UI libraries (MUI, Chakra)
- Complex forms (arrays, nested, dynamic fields)

## Install

```bash
npm install react-hook-form
```

## useForm (Main Hook)

```typescript
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    await submitToAPI(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { 
        required: "Email required",
        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
      })} />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password", {
        minLength: { value: 8, message: "Min 8 chars" }
      })} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

## useForm Options

```typescript
useForm({
  defaultValues: { email: "", password: "" },
  mode: "onChange",        // onBlur, onSubmit, all
  reValidateMode: "onBlur", // re-validate after submit
  resolver: zodResolver(schema),  // Zod, yup, ajv
  shouldUseNativeValidation: false,
});
```

## useController (Controlled Components)

```typescript
import { useController } from "react-hook-form";

function MyInput({ name, control }) {
  const { field, fieldState } = useController({ name, control });
  
  return (
    <input 
      {...field} 
      value={field.value}
      onChange={field.onChange}
      ref={field.ref}
      error={!!fieldState.error}
    />
  );
}
```

## useFormContext (Nested Components)

```typescript
// Parent: Wrap with FormProvider
import { FormProvider } from "react-hook-form";

function Parent() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Child />
    </FormProvider>
  );
}

// Child: Access without props
function Child() {
  const { register } = useFormContext();
  return <input {...register("name")} />;
}
```

## useWatch (Subscribe to Changes)

```typescript
import { useWatch } from "react-hook-form";

function WatchExample() {
  const email = useWatch({ name: "email" });
  const allValues = useWatch();  // Watch all
  
  return <p>Current email: {email}</p>;
}
```

## useFormState (Isolate Re-renders)

```typescript
import { useFormState } from "react-hook-form";

function SubmitButton({ control }) {
  const { isValid, isDirty, errors } = useFormState({ control });
  
  return <button disabled={!isValid}>Save</button>;
}
```

## useFieldArray (Dynamic Fields)

```typescript
import { useFieldArray, useForm } from "react-hook-form";

function DynamicFields() {
  const { control, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        Add Item
      </button>
    </div>
  );
}
```

## Validation with Zod

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

## Controller (UI Libraries)

```typescript
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

<Controller
  name="email"
  control={control}
  defaultValue=""
  rules={{ required: "Email required" }}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      value={field.value ?? ""}
      onChange={e => field.onChange(e.target.value)}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
```

## Useful Methods

```typescript
const {
  register,          // Connect inputs
  handleSubmit,      // Wrap onSubmit
  formState: { 
    errors,         // Validation errors
    isValid,        // Form is valid
    isDirty,        // Form has changes
    isSubmitting,   // Currently submitting
    isLoading       // Async resolver loading
  },
  reset,             // Reset form
  resetField,        // Reset single field
  setValue,          // Programmatic set
  setError,          // Set manual error
  clearErrors,       // Clear errors
  watch,             // Watch values
  getValues,         // Get all values
  trigger,           // Manual validation
} = useForm();
```

## Zod Integration

```bash
npm install @hookform/resolvers zod
```

