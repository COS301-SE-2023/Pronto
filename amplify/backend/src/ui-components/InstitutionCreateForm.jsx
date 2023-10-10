/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Institution } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function InstitutionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    location: "",
    pageUrl: "",
    campusMapUrl: "",
    openingTime: "",
    closingTime: "",
    minimumDuration: "",
    lectureremails: [],
    coursecodes: [],
    logo: "",
    domains: [],
    owner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [location, setLocation] = React.useState(initialValues.location);
  const [pageUrl, setPageUrl] = React.useState(initialValues.pageUrl);
  const [campusMapUrl, setCampusMapUrl] = React.useState(
    initialValues.campusMapUrl
  );
  const [openingTime, setOpeningTime] = React.useState(
    initialValues.openingTime
  );
  const [closingTime, setClosingTime] = React.useState(
    initialValues.closingTime
  );
  const [minimumDuration, setMinimumDuration] = React.useState(
    initialValues.minimumDuration
  );
  const [lectureremails, setLectureremails] = React.useState(
    initialValues.lectureremails
  );
  const [coursecodes, setCoursecodes] = React.useState(
    initialValues.coursecodes
  );
  const [logo, setLogo] = React.useState(initialValues.logo);
  const [domains, setDomains] = React.useState(initialValues.domains);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setLocation(initialValues.location);
    setPageUrl(initialValues.pageUrl);
    setCampusMapUrl(initialValues.campusMapUrl);
    setOpeningTime(initialValues.openingTime);
    setClosingTime(initialValues.closingTime);
    setMinimumDuration(initialValues.minimumDuration);
    setLectureremails(initialValues.lectureremails);
    setCurrentLectureremailsValue("");
    setCoursecodes(initialValues.coursecodes);
    setCurrentCoursecodesValue("");
    setLogo(initialValues.logo);
    setDomains(initialValues.domains);
    setCurrentDomainsValue("");
    setOwner(initialValues.owner);
    setErrors({});
  };
  const [currentLectureremailsValue, setCurrentLectureremailsValue] =
    React.useState("");
  const lectureremailsRef = React.createRef();
  const [currentCoursecodesValue, setCurrentCoursecodesValue] =
    React.useState("");
  const coursecodesRef = React.createRef();
  const [currentDomainsValue, setCurrentDomainsValue] = React.useState("");
  const domainsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    location: [],
    pageUrl: [],
    campusMapUrl: [],
    openingTime: [],
    closingTime: [],
    minimumDuration: [],
    lectureremails: [],
    coursecodes: [],
    logo: [],
    domains: [],
    owner: [],
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
          name,
          location,
          pageUrl,
          campusMapUrl,
          openingTime,
          closingTime,
          minimumDuration,
          lectureremails,
          coursecodes,
          logo,
          domains,
          owner,
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
          await DataStore.save(new Institution(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "InstitutionCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location: value,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Page url"
        isRequired={false}
        isReadOnly={false}
        value={pageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl: value,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.pageUrl ?? value;
          }
          if (errors.pageUrl?.hasError) {
            runValidationTasks("pageUrl", value);
          }
          setPageUrl(value);
        }}
        onBlur={() => runValidationTasks("pageUrl", pageUrl)}
        errorMessage={errors.pageUrl?.errorMessage}
        hasError={errors.pageUrl?.hasError}
        {...getOverrideProps(overrides, "pageUrl")}
      ></TextField>
      <TextField
        label="Campus map url"
        isRequired={false}
        isReadOnly={false}
        value={campusMapUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl: value,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.campusMapUrl ?? value;
          }
          if (errors.campusMapUrl?.hasError) {
            runValidationTasks("campusMapUrl", value);
          }
          setCampusMapUrl(value);
        }}
        onBlur={() => runValidationTasks("campusMapUrl", campusMapUrl)}
        errorMessage={errors.campusMapUrl?.errorMessage}
        hasError={errors.campusMapUrl?.hasError}
        {...getOverrideProps(overrides, "campusMapUrl")}
      ></TextField>
      <TextField
        label="Opening time"
        isRequired={false}
        isReadOnly={false}
        value={openingTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime: value,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.openingTime ?? value;
          }
          if (errors.openingTime?.hasError) {
            runValidationTasks("openingTime", value);
          }
          setOpeningTime(value);
        }}
        onBlur={() => runValidationTasks("openingTime", openingTime)}
        errorMessage={errors.openingTime?.errorMessage}
        hasError={errors.openingTime?.hasError}
        {...getOverrideProps(overrides, "openingTime")}
      ></TextField>
      <TextField
        label="Closing time"
        isRequired={false}
        isReadOnly={false}
        value={closingTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime: value,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.closingTime ?? value;
          }
          if (errors.closingTime?.hasError) {
            runValidationTasks("closingTime", value);
          }
          setClosingTime(value);
        }}
        onBlur={() => runValidationTasks("closingTime", closingTime)}
        errorMessage={errors.closingTime?.errorMessage}
        hasError={errors.closingTime?.hasError}
        {...getOverrideProps(overrides, "closingTime")}
      ></TextField>
      <TextField
        label="Minimum duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={minimumDuration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration: value,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.minimumDuration ?? value;
          }
          if (errors.minimumDuration?.hasError) {
            runValidationTasks("minimumDuration", value);
          }
          setMinimumDuration(value);
        }}
        onBlur={() => runValidationTasks("minimumDuration", minimumDuration)}
        errorMessage={errors.minimumDuration?.errorMessage}
        hasError={errors.minimumDuration?.hasError}
        {...getOverrideProps(overrides, "minimumDuration")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails: values,
              coursecodes,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.lectureremails ?? values;
          }
          setLectureremails(values);
          setCurrentLectureremailsValue("");
        }}
        currentFieldValue={currentLectureremailsValue}
        label={"Lectureremails"}
        items={lectureremails}
        hasError={errors?.lectureremails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lectureremails", currentLectureremailsValue)
        }
        errorMessage={errors?.lectureremails?.errorMessage}
        setFieldValue={setCurrentLectureremailsValue}
        inputFieldRef={lectureremailsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lectureremails"
          isRequired={false}
          isReadOnly={false}
          value={currentLectureremailsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lectureremails?.hasError) {
              runValidationTasks("lectureremails", value);
            }
            setCurrentLectureremailsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("lectureremails", currentLectureremailsValue)
          }
          errorMessage={errors.lectureremails?.errorMessage}
          hasError={errors.lectureremails?.hasError}
          ref={lectureremailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lectureremails")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes: values,
              logo,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.coursecodes ?? values;
          }
          setCoursecodes(values);
          setCurrentCoursecodesValue("");
        }}
        currentFieldValue={currentCoursecodesValue}
        label={"Coursecodes"}
        items={coursecodes}
        hasError={errors?.coursecodes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("coursecodes", currentCoursecodesValue)
        }
        errorMessage={errors?.coursecodes?.errorMessage}
        setFieldValue={setCurrentCoursecodesValue}
        inputFieldRef={coursecodesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Coursecodes"
          isRequired={false}
          isReadOnly={false}
          value={currentCoursecodesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.coursecodes?.hasError) {
              runValidationTasks("coursecodes", value);
            }
            setCurrentCoursecodesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("coursecodes", currentCoursecodesValue)
          }
          errorMessage={errors.coursecodes?.errorMessage}
          hasError={errors.coursecodes?.hasError}
          ref={coursecodesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "coursecodes")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Logo"
        isRequired={false}
        isReadOnly={false}
        value={logo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo: value,
              domains,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.logo ?? value;
          }
          if (errors.logo?.hasError) {
            runValidationTasks("logo", value);
          }
          setLogo(value);
        }}
        onBlur={() => runValidationTasks("logo", logo)}
        errorMessage={errors.logo?.errorMessage}
        hasError={errors.logo?.hasError}
        {...getOverrideProps(overrides, "logo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains: values,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.domains ?? values;
          }
          setDomains(values);
          setCurrentDomainsValue("");
        }}
        currentFieldValue={currentDomainsValue}
        label={"Domains"}
        items={domains}
        hasError={errors?.domains?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("domains", currentDomainsValue)
        }
        errorMessage={errors?.domains?.errorMessage}
        setFieldValue={setCurrentDomainsValue}
        inputFieldRef={domainsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Domains"
          isRequired={false}
          isReadOnly={false}
          value={currentDomainsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.domains?.hasError) {
              runValidationTasks("domains", value);
            }
            setCurrentDomainsValue(value);
          }}
          onBlur={() => runValidationTasks("domains", currentDomainsValue)}
          errorMessage={errors.domains?.errorMessage}
          hasError={errors.domains?.hasError}
          ref={domainsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "domains")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              pageUrl,
              campusMapUrl,
              openingTime,
              closingTime,
              minimumDuration,
              lectureremails,
              coursecodes,
              logo,
              domains,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
