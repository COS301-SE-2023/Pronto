/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminApplicationCreateFormInputValues = {
    name?: string;
    firstname?: string;
    email?: string;
    status?: string;
};
export declare type AdminApplicationCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    firstname?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminApplicationCreateFormOverridesProps = {
    AdminApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: AdminApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdminApplicationCreateFormInputValues) => AdminApplicationCreateFormInputValues;
    onSuccess?: (fields: AdminApplicationCreateFormInputValues) => void;
    onError?: (fields: AdminApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminApplicationCreateFormInputValues) => AdminApplicationCreateFormInputValues;
    onValidate?: AdminApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdminApplicationCreateForm(props: AdminApplicationCreateFormProps): React.ReactElement;
