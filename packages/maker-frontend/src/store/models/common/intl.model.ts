import { MessageDescriptor } from 'react-intl';
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';

export interface IntlProps {
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType | React.ReactElement | FormatXMLElementFn>,
  ): string;
}
