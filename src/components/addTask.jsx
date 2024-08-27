import { React } from "react";
import styled from "styled-components";

const AddTask = ({
  addText,
  setAddText,
  onAddText,
  labelColor,
  labelColors,
  setLabelColor,
}) => {
  const handleChangeValue = (e) => {
    setLabelColor(e.target.value);
  };
  return (
    <Form>
      <select onChange={handleChangeValue}>
        {labelColors.map((item) => (
          <option key={item.id} value={item.color}>
            {item.color}
          </option>
        ))}
      </select>
      <Label $bgColor={labelColor} />
      <Section>
        <Input
          type="text"
          placeholder="할 일을 입력하세요."
          onChange={(e) => setAddText(e.target.value)}
          value={addText}
          required
        />
        <AddBtn
          disabled={!addText}
          onClick={() => onAddText(addText, labelColor)}
        >
          Add
        </AddBtn>
      </Section>
    </Form>
  );
};

export default AddTask;

const Form = styled.form`
  margin: 10px 20px;
  padding: 20px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Label = styled.span`
  width: 20px;
  height: 20px;
  display: block;
  background-color: ${(props) => props.$bgColor || "pink"};
`;
const Input = styled.input`
  width: 100%;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const AddBtn = styled.button`
  font-weight: bold;
`;
