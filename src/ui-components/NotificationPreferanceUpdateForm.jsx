/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getNotificationPreferance } from "../graphql/queries";
import { updateNotificationPreferance } from "../graphql/mutations";
export default function NotificationPreferanceUpdateForm(props) {
  const {
    id: idProp,
    notificationPreferance: notificationPreferanceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    studentId: "",
    type: "",
    enpointID: "",
    deviceID: "",
  };
  const [studentId, setStudentId] = React.useState(initialValues.studentId);
  const [type, setType] = React.useState(initialValues.type);
  const [enpointID, setEnpointID] = React.useState(initialValues.enpointID);
  const [deviceID, setDeviceID] = React.useState(initialValues.deviceID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = notificationPreferanceRecord
      ? { ...initialValues, ...notificationPreferanceRecord }
      : initialValues;
    setStudentId(cleanValues.studentId);
    setType(cleanValues.type);
    setEnpointID(cleanValues.enpointID);
    setDeviceID(cleanValues.deviceID);
    setErrors({});
  };
  const [notificationPreferanceRecord, setNotificationPreferanceRecord] =
    React.useState(notificationPreferanceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getNotificationPreferance,
              variables: { id: idProp },
            })
          )?.data?.getNotificationPreferance
        : notificationPreferanceModelProp;
      setNotificationPreferanceRecord(record);
    };
    queryData();
  }, [idProp, notificationPreferanceModelProp]);
  React.useEffect(resetStateValues, [notificationPreferanceRecord]);
  const validations = {
    studentId: [],
    type: [],
    enpointID: [],
    deviceID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          studentId: studentId ?? null,
          type: type ?? null,
          enpointID: enpointID ?? null,
          deviceID: deviceID ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateNotificationPreferance,
            variables: {
              input: {
                id: notificationPreferanceRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NotificationPreferanceUpdateForm")}
      {...rest}
    >
      <TextField
        label="Student id"
        isRequired={false}
        isReadOnly={false}
        value={studentId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId: value,
              type,
              enpointID,
              deviceID,
            };
            const result = onChange(modelFields);
            value = result?.studentId ?? value;
          }
          if (errors.studentId?.hasError) {
            runValidationTasks("studentId", value);
          }
          setStudentId(value);
        }}
        onBlur={() => runValidationTasks("studentId", studentId)}
        errorMessage={errors.studentId?.errorMessage}
        hasError={errors.studentId?.hasError}
        {...getOverrideProps(overrides, "studentId")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              type: value,
              enpointID,
              deviceID,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Sms"
          value="SMS"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Push"
          value="PUSH"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Email"
          value="EMAIL"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Enpoint id"
        isRequired={false}
        isReadOnly={false}
        value={enpointID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              type,
              enpointID: value,
              deviceID,
            };
            const result = onChange(modelFields);
            value = result?.enpointID ?? value;
          }
          if (errors.enpointID?.hasError) {
            runValidationTasks("enpointID", value);
          }
          setEnpointID(value);
        }}
        onBlur={() => runValidationTasks("enpointID", enpointID)}
        errorMessage={errors.enpointID?.errorMessage}
        hasError={errors.enpointID?.hasError}
        {...getOverrideProps(overrides, "enpointID")}
      ></TextField>
      <TextField
        label="Device id"
        isRequired={false}
        isReadOnly={false}
        value={deviceID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentId,
              type,
              enpointID,
              deviceID: value,
            };
            const result = onChange(modelFields);
            value = result?.deviceID ?? value;
          }
          if (errors.deviceID?.hasError) {
            runValidationTasks("deviceID", value);
          }
          setDeviceID(value);
        }}
        onBlur={() => runValidationTasks("deviceID", deviceID)}
        errorMessage={errors.deviceID?.errorMessage}
        hasError={errors.deviceID?.hasError}
        {...getOverrideProps(overrides, "deviceID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || notificationPreferanceModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || notificationPreferanceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
