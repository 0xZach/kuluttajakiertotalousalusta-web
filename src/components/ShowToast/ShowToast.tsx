import React from 'react';
import {Id, toast, ToastContent, ToastOptions} from 'react-toastify';
import {LocalizedText} from '../LocalizedText';

export const showToast = (content: ToastContent, options?: ToastOptions): Id => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const text = typeof content === 'string' ? <LocalizedText t={content} /> : null;
    return toast(text || content, options);
};
