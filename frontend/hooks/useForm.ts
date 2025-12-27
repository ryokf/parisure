import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormOptions<T> {
    initialValues: T;
    onSubmit: (values: T) => void | Promise<void>;
}

/**
 * Generic form handling hook
 */
export function useForm<T extends Record<string, string | number>>({
    initialValues,
    onSubmit,
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number' && value !== '') {
            parsedValue = Number(value);
        }

        setValues((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    const setFieldValue = (name: keyof T, value: T[keyof T]) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue,
        isSubmitting,
    };
}
