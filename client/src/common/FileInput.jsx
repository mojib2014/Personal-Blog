import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FileInput = ({name, label, type = "file", onChange, error, ...rest}) => {
  return (
    <InputGroup className={rest.className}>
      <InputGroupPrepend>
        <InputGroupText htmlFor={rest.id}>{rest.icon}</InputGroupText>
      </InputGroupPrepend>
      <FormControl
        {...rest}
        name={name}
        type={type}
        label={label}
        onChange={onChange}
        accept="image/*"
        required
      />
      <Container>{error}</Container>
    </InputGroup>
  );
};

export default FileInput;

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  rest: PropTypes.object,
};

const InputGroup = styled.div`
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
`;

const InputGroupPrepend = styled.div`
  cursor: pointer;
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  margin-right: -1px;
`;

const InputGroupText = styled.label`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const FormControl = styled.input`
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; */
`;

const Container = styled.div`
  width: 100%;
  color: #721d24;
  font-size: inherit;
  padding: 0.3px 0;
`;
