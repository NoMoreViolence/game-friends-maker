import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';
import { shadow } from './shadow';

interface ButtonProps {
  weight?: string;
  color?: string;
  border?: string;
  error?: boolean;
}

const CommonButtonStyle = css`
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;

  border: 0px;
  border-radius: 0.25rem;
  padding: 0.75rem;

  transition: 0.25s;

  box-shadow: ${shadow.default};
  &:hover {
    cursor: pointer;
    box-shadow: ${shadow.hover};
  }

  &:disabled {
    cursor: unset;
    background-color: ${color.loadingBackground};
    box-shadow: ${shadow.default};
  }
`;

const returnOnError = (onError?: boolean) =>
  `${
    onError === true
      ? `
        color: ${color.error};
        &::placeholder {
          color: ${color.error};
        };
      `
      : `
      `
  }`;
const returnColor = (returnColor?: string) => `color: ${returnColor ? returnColor : color['text-default']};`;
const returnWeight = (weight?: string) => `font-weight: ${weight ? weight : 'normal'};`;
// 10px
export const TinyButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.625rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 12px
export const SmallButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 14px
export const SmallMiddleButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.875rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const MiddleButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 1rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 24px
export const MiddleBigButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 1.5rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 32px
export const BigButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 2rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 32px
export const GiantButton = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 3rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;
