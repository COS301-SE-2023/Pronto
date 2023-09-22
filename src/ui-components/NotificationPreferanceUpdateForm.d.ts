/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotificationPreferanceUpdateFormInputValues = {
    studentId?: string;
    type?: string;
    enpointID?: string;
    deviceID?: string;
};
export declare type NotificationPreferanceUpdateFormValidationValues = {
    studentId?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    enpointID?: ValidationFunction<string>;
    deviceID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationPreferanceUpdateFormOverridesProps = {
    NotificationPreferanceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    studentId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    enpointID?: PrimitiveOverrideProps<TextFieldProps>;
    deviceID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationPreferanceUpdateFormProps = React.PropsWithChildren<{
    overrides?: NotificationPreferanceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    notificationPreferance?: any;
    onSubmit?: (fields: NotificationPreferanceUpdateFormInputValues) => NotificationPreferanceUpdateFormInputValues;
    onSuccess?: (fields: NotificationPreferanceUpdateFormInputValues) => void;
    onError?: (fields: NotificationPreferanceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationPreferanceUpdateFormInputValues) => NotificationPreferanceUpdateFormInputValues;
    onValidate?: NotificationPreferanceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationPreferanceUpdateForm(props: NotificationPreferanceUpdateFormProps): React.ReactElement;
