import React from "react";
import { useField, useFormikContext } from "formik";
import Multiselect from "multiselect-react-dropdown";

const FormikMultiselect = ({ options, className, style, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setFieldValue(field.name, selectedValues);
  };

  const handleBlur = () => {
    field.onBlur({ target: { name: field.name } });
  };

  return (
    <>
      <Multiselect
        options={options}
        selectedValues={options.filter(option => field.value.includes(option.value))}
        onSelect={handleChange}
        onRemove={handleChange}
        onBlur={handleBlur}
        displayValue="label"
        className={className}
        style={style}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormikMultiselect;


// import React from "react";
// import { useField, useFormikContext } from "formik";
// import Multiselect from "multiselect-react-dropdown";

// const FormikMultiselect = ({ options, className, style, ...props }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(props);

//   const handleChange = (selectedOptions) => {
//     setFieldValue(field.name, selectedOptions);
//   };

//   const handleBlur = () => {
//     field.onBlur({ target: { name: field.name } });
//   };

//   return (
//     <Multiselect
//       options={options}
//       selectedValues={field.value || []}
//       onSelect={handleChange}
//       onRemove={handleChange}
//       onBlur={handleBlur}
//       displayValue="label"
//       className={className}
//       style={style}
//       placeholder={props.placeholder}
//     />
//   );
// };

// export default FormikMultiselect;




// import React from "react";
// import { useField } from "formik";
// import Multiselect from "multiselect-react-dropdown";

// const FormikMultiselect = ({ options, className, style, ...props }) => {
//   const [field, meta, helpers] = useField(props);

//   const handleChange = (selectedOptions) => {
//     helpers.setValue(selectedOptions);
//   };

//   const handleBlur = () => {
//     helpers.setTouched(true);
//   };

//   return (
//     <Multiselect
//       {...field}
//       selectedValues={field.value}
//       options={options}
//       className={className}
//       style={style}
//       onSelect={handleChange}
//       onBlur={handleBlur}
//       {...props}
//     />
//   );
// };

// export default FormikMultiselect;
