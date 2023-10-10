/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AdminApplication } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminApplicationUpdateFormInputValues = {
    name?: string;
    firstname?: string;
    email?: string;
    status?: string;
};
export declare type AdminApplicationUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    firstname?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminApplicationUpdateFormOverridesProps = {
    AdminApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: AdminApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    adminApplication?: AdminApplication;
    onSubmit?: (fields: AdminApplicationUpdateFormInputValues) => AdminApplicationUpdateFormInputValues;
    onSuccess?: (fields: AdminApplicationUpdateFormInputValues) => void;
    onError?: (fields: AdminApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminApplicationUpdateFormInputValues) => AdminApplicationUpdateFormInputValues;
    onValidate?: AdminApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AdminApplicationUpdateForm(props: AdminApplicationUpdateFormProps): React.ReactElement;
