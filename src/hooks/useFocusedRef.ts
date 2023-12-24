import {MutableRefObject, useEffect, useRef} from "react";


export const useFocusedRef = <T>(allowedTags: string[]): MutableRefObject<T | null> => {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        // @ts-ignore
        ref.current?.focus({
            cursor: 'end'
        })

        const handleClick = (e: MouseEvent) => {
            // @ts-ignore
            if (allowedTags.find(tag => tag === e.target.tagName.toLowerCase())) return;

            // @ts-ignore
            ref.current?.focus({
                cursor: 'end'
            })
        }

        document.addEventListener("click", handleClick, true)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    return ref;
}