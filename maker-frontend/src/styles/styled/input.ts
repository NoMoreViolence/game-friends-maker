import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';
import { shadow } from './shadow';

interface InputProps {
  weight?: string;
  color?: string;
  border?: string;
  error?: boolean;
}

const CommonInputStyle = css`
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;

  border: 0px;
  border-radius: 0.25rem;
  padding: 0.5rem;

  transition: 0.25s;

  box-shadow: ${shadow.default};
  &:focus {
    box-shadow: ${shadow.hover};
  }

  &:disabled {
    box-shadow: ${shadow.default};
    background-color: ${color.loadingBackground};
  }

  &::placeholder {
    color: ${color['text-soft']};
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
export const TinyInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.625rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 12px
export const SmallInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 14px
export const SmallMiddleInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 0.875rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const MiddleInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 1rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 24px
export const MiddleBigInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 1.5rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 32px
export const BigInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 2rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 32px
export const GiantInput = styled('input')<InputProps>`
  ${CommonInputStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnOnError(p.error)}

  font-size: 3rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;
