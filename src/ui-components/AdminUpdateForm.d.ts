/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Admin } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminUpdateFormInputValues = {
    firstname?: string;
    lastname?: string;
    userRole?: string;
    email?: string;
};
export declare type AdminUpdateFormValidationValues = {
    firstname?: ValidationFunction<string>;
    lastname?: ValidationFunction<string>;
    userRole?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminUpdateFormOverridesProps = {
    AdminUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    lastname?: PrimitiveOverrideProps<TextFieldProps>;
    userRole?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminUpdateFormProps = React.PropsWithChildren<{
    overrides?: AdminUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    admin?: Admin;
    onSubmit?: (fields: AdminUpdateFormInputValues) => AdminUpdateFormInputValues;
    onSuccess?: (fields: AdminUpdateFormInputValues) => void;
    onError?: (fields: AdminUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminUpdateFormInputValues) => AdminUpdateFormInputValues;
    onValidate?: AdminUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AdminUpdateForm(props: AdminUpdateFormProps): React.ReactElement;
