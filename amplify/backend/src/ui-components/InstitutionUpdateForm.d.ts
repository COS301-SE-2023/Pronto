/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Institution } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InstitutionUpdateFormInputValues = {
    name?: string;
    location?: string;
    pageUrl?: string;
    campusMapUrl?: string;
    openingTime?: string;
    closingTime?: string;
    minimumDuration?: number;
    lectureremails?: string[];
    coursecodes?: string[];
    logo?: string;
    domains?: string[];
    owner?: string;
};
export declare type InstitutionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    pageUrl?: ValidationFunction<string>;
    campusMapUrl?: ValidationFunction<string>;
    openingTime?: ValidationFunction<string>;
    closingTime?: ValidationFunction<string>;
    minimumDuration?: ValidationFunction<number>;
    lectureremails?: ValidationFunction<string>;
    coursecodes?: ValidationFunction<string>;
    logo?: ValidationFunction<string>;
    domains?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstitutionUpdateFormOverridesProps = {
    InstitutionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    pageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    campusMapUrl?: PrimitiveOverrideProps<TextFieldProps>;
    openingTime?: PrimitiveOverrideProps<TextFieldProps>;
    closingTime?: PrimitiveOverrideProps<TextFieldProps>;
    minimumDuration?: PrimitiveOverrideProps<TextFieldProps>;
    lectureremails?: PrimitiveOverrideProps<TextFieldProps>;
    coursecodes?: PrimitiveOverrideProps<TextFieldProps>;
    logo?: PrimitiveOverrideProps<TextFieldProps>;
    domains?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InstitutionUpdateFormProps = React.PropsWithChildren<{
    overrides?: InstitutionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    institution?: Institution;
    onSubmit?: (fields: InstitutionUpdateFormInputValues) => InstitutionUpdateFormInputValues;
    onSuccess?: (fields: InstitutionUpdateFormInputValues) => void;
    onError?: (fields: InstitutionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstitutionUpdateFormInputValues) => InstitutionUpdateFormInputValues;
    onValidate?: InstitutionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InstitutionUpdateForm(props: InstitutionUpdateFormProps): React.ReactElement;
