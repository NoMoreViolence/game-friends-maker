import { MessageDescriptor, MessageFormatPrimitiveValue } from 'react-intl';

export interface IntlProps {
  formatMessage(descriptor: MessageDescriptor, values?: Record<string, MessageFormatPrimitiveValue>): string;
}
