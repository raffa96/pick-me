import styled from "styled-components";
import {
  space,
  layout,
  background,
  border,
  position,
  compose,
  variant,
} from "styled-system";

const Container = styled("div")(
  variant({
    prop: "size",
    variants: {
      fullWidth: {
        maxWidth: "100%",
        width: "100%",
      },
      xl: {
        maxWidth: "1140px",
        width: "calc(100% - 48px)",
      },
      md: {
        maxWidth: "768px",
        width: "calc(100% - 24px)",
      },
      sm: {
        maxWidth: "568px",
        width: "calc(100% - 12px)",
      },
      xs: {
        maxWidth: "440px",
        width: "calc(100% - 6px)",
      },
    },
  }),
  compose(space, layout, background, border, position)
);

Container.defaultProps = { size: "xl", mx: "auto" };

export default Container;
