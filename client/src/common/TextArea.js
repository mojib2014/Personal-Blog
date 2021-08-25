import React from "react";
import styled from "styled-components";

export default function TextArea({
  name,
  label,
  value,
  data,
  errors,
  onChange,
  ...rest
}) {
  return (
    <InputGroup>
      <InputGroupPrepend>
        <InputGroupText htmlFor={name}>{rest.icon}</InputGroupText>
      </InputGroupPrepend>
      <Textarea
        {...rest}
        name={name}
        id={name}
        type="text"
        label={label}
        value={data[name]}
        onChange={onChange}
        spellCheck="true"
        contenteditable="true"
      />
      <Container>{errors[name]}</Container>
    </InputGroup>
  );
}

const Textarea = styled.textarea`
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
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const InputGroup = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
  margin-bottom: 1rem;
`;

const InputGroupPrepend = styled.div`
  margin-right: -1px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
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

const Container = styled.div`
  width: 100%;
  color: #721d24;
  font-size: inherit;
  padding: 0.3px 0;
`;
