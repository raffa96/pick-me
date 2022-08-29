import styled from "styled-components";
import {
  space,
  layout,
  typography,
  color,
  border,
  shadow,
  position,
  compose,
  variant,
} from "styled-system";
import { css } from "@styled-system/css";

const StyledButton = styled("button")(
  variant({
    prop: "size",
    variants: {
      sm: {
        fontSize: "12px",
        paddingX: "10px",
        borderRadius: "18px",
        height: "24px",
      },
      md: {
        fontSize: "14px",
        paddingX: "14px",
        borderRadius: "22px",
        height: "36px",
      },
      lg: {
        fontSize: "28px",
        paddingX: "14px",
        borderRadius: "26px",
        height: "48px",
      },
      xl: {
        fontSize: "36px",
        paddingX: "22px",
        borderRadius: "30px",
        height: "64px",
        fontWeight: "500",
      },
    },
  }),
  variant({
    variants: {
      contained: {
        background: "purple.300",
        color: "white",
        border: "none",
        "&:hover": {
          background: "purple.600",
        },
      },
      outlined: {
        background: "transparent",
        color: "purple.300",
        border: "1.2px solid",
        borderColor: "purple.300",
        "&:hover": {
          color: "purple.600",
          borderColor: "purple.600",
          "& svg > *": {
            fill: "purple.600",
          },
        },
      },
      text: {
        background: "transparent",
        color: "purple.300",
        border: "none",
        "&:hover": {
          color: "purple.600",
          "& svg > *": {
            fill: "purple.600",
          },
        },
      },
      disabled: {
        background: "gray.600",
        color: "gray.800",
        border: "none",
        cursor: "not-allowed",
      },
    },
  }),
  ({ isFullWidth, iconColor }) =>
    css({
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      width: isFullWidth ? "100%" : undefined,
      transition: "all 250ms, transform 0.1s ease-in-out",
      fontWeight: "600",
      outline: "none",
      whiteSpace: "nowrap",
      userSelect: "none",
      cursor: "pointer",
      letterSpacing: "0.1rem",
      "& svg > *": {
        fill: iconColor ? iconColor : "white",
        transition: "all 250ms, transform 0.1s ease-in-out",
      },
    }),
  compose(space, layout, typography, color, border, shadow, position)
);

const ButtonIcon = styled.span(
  {
    display: "inline-flex",
    alignSelf: "center",
    fontSize: "16px",
    flexShrink: "0",
    color: "inherit",
  },
  space
);

const StyledContent = styled("div")({
  transition: "all 125ms",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const Button = ({
  variant,
  leftIcon,
  rightIcon,
  isLoading = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      disabled={isLoading}
      variant={isLoading ? "disabled" : variant || "contained"}
      {...rest}
    >
      <StyledContent>
        {leftIcon && <ButtonIcon mr="6px">{leftIcon}</ButtonIcon>}
        {children}
        {rightIcon && <ButtonIcon ml="6px">{rightIcon}</ButtonIcon>}
      </StyledContent>
    </StyledButton>
  );
};

export default Button;
