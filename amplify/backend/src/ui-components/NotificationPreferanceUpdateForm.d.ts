/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { NotificationPreferance } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotificationPreferanceUpdateFormInputValues = {
    studentId?: string;
};
export declare type NotificationPreferanceUpdateFormValidationValues = {
    studentId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationPreferanceUpdateFormOverridesProps = {
    NotificationPreferanceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    studentId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationPreferanceUpdateFormProps = React.PropsWithChildren<{
    overrides?: NotificationPreferanceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    notificationPreferance?: NotificationPreferance;
    onSubmit?: (fields: NotificationPreferanceUpdateFormInputValues) => NotificationPreferanceUpdateFormInputValues;
    onSuccess?: (fields: NotificationPreferanceUpdateFormInputValues) => void;
    onError?: (fields: NotificationPreferanceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationPreferanceUpdateFormInputValues) => NotificationPreferanceUpdateFormInputValues;
    onValidate?: NotificationPreferanceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationPreferanceUpdateForm(props: NotificationPreferanceUpdateFormProps): React.ReactElement;
