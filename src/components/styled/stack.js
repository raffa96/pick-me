import styled from "styled-components";
import {
  space,
  layout,
  border,
  flexbox,
  color,
  position,
  compose,
} from "styled-system";
import { css } from "@styled-system/css";

const StackWrapper = styled("div")(
  ({
    childrenMarginTop,
    childrenMarginBottom,
    childrenMarginLeft,
    childrenMarginRight,
    align,
    justify,
    direction,
  }) =>
    css({
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: direction,
      "& > * + *": {
        marginTop: childrenMarginTop,
        marginBottom: childrenMarginBottom,
        marginLeft: childrenMarginLeft,
        marginRight: childrenMarginRight,
      },
    }),
  compose(space, layout, border, flexbox, color, position)
);

const Stack = ({
  align,
  justify,
  direction = "row",
  spacing,
  children,
  ...rest
}) => {
  return (
    <StackWrapper
      align={align}
      justify={justify}
      direction={direction}
      childrenMarginTop={direction === "column" ? spacing : 0}
      childrenMarginBottom={direction === "column-reverse" ? spacing : 0}
      childrenMarginLeft={direction === "row" ? spacing : 0}
      childrenMarginRight={direction === "row-reverse" ? spacing : 0}
      {...rest}
    >
      {children}
    </StackWrapper>
  );
};

export default Stack;
