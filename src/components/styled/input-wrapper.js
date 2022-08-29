import styled from "styled-components";
import {
  space,
  layout,
  border,
  typography,
  shadow,
  color,
  background,
  compose,
} from "styled-system";

const InputWrapper = styled("input")(
  {
    background: "var(--gray-900)",
    border: "1px solid",
    borderColor: "var(--gray-600)",
    color: "var(--gray-600)",
    height: "48px",
    cursor: "text",
    borderRadius: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    appearance: "none",
    outline: "none",
    fontSize: "16px",
    lineHeight: "20px",
    "&::placeholder": {
      color: "var(--gray-700)",
      lineHeight: "20px",
    },
  },
  compose(space, layout, border, typography, shadow, color, background)
);

export default InputWrapper;
