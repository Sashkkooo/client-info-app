import { ClientKey } from "../models/client.model";

export interface FormFieldConfig {
    key: ClientKey;
    label: string;
    type: string;
    readonly?: boolean;
}

export const CLIENT_FORM_CONFIG: FormFieldConfig[] = [
    { key: 'name', label: 'First Name', type: 'text', readonly: true },
    { key: 'secondName', label: 'Last Name', type: 'text', readonly: true },
    { key: 'email', label: 'Email', type: 'email', readonly: true },
    { key: 'phone', label: 'Phone', type: 'tel', readonly: true },
    { key: 'address', label: 'Address', type: 'text', readonly: true },
    { key: 'city', label: 'City', type: 'text', readonly: true },
    { key: 'country', label: 'Country', type: 'text', readonly: true },
    { key: 'accountNumber', label: 'Account Number', type: 'text', readonly: true },
    { key: 'bankCard', label: 'Bank Card', type: 'text', readonly: true }
];
