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
export declare type NotificationPreferanceCreateFormInputValues = {
    studentId?: string;
};
export declare type NotificationPreferanceCreateFormValidationValues = {
    studentId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationPreferanceCreateFormOverridesProps = {
    NotificationPreferanceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    studentId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationPreferanceCreateFormProps = React.PropsWithChildren<{
    overrides?: NotificationPreferanceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NotificationPreferanceCreateFormInputValues) => NotificationPreferanceCreateFormInputValues;
    onSuccess?: (fields: NotificationPreferanceCreateFormInputValues) => void;
    onError?: (fields: NotificationPreferanceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationPreferanceCreateFormInputValues) => NotificationPreferanceCreateFormInputValues;
    onValidate?: NotificationPreferanceCreateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationPreferanceCreateForm(props: NotificationPreferanceCreateFormProps): React.ReactElement;
