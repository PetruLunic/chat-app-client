import {MutableRefObject, useEffect, useRef} from "react";

interface CustomFocusOptions extends FocusOptions{
    cursor?: 'start' | 'end' | 'all'
}

export const useFocusedRef = <T extends HTMLElement>(allowedTags: string[], options: CustomFocusOptions): MutableRefObject<T | null> => {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        ref.current?.focus(options)

        const handleFocus = (e: FocusEvent) => {
            const target = e.relatedTarget as HTMLElement | null;

            const tagName = target
                ? target.tagName.toLowerCase()
                : null

            if (tagName && allowedTags.includes(tagName)) return;

            ref.current?.focus(options)
        }

        document.addEventListener("focusout", handleFocus);

        return () => {
            document.removeEventListener("focusout", handleFocus)
        }
    }, [])

    return ref;
}