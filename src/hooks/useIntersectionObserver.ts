"use client";
import { useEffect, useState, useRef } from 'react';

type IntersectionObserverProps = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export const useIntersectionObserver = ({ root = null, rootMargin = '0px', threshold = 0 }: IntersectionObserverProps = {}) => {
    const [elements, setElements] = useState<Element[]>([]);
    const [visibleEntries, setVisibleEntries] = useState<Set<Element>>(new Set());
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!window.IntersectionObserver) return;

        // Cleanup previous observer
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            setVisibleEntries((prevVisibleSet) => {
                const newVisibleSet = new Set(prevVisibleSet);
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        newVisibleSet.add(entry.target);
                    } else {
                        // Optional: remove this else block if you want elements to animate only once
                        // newVisibleSet.delete(entry.target); 
                    }
                });
                return newVisibleSet;
            });
        }, { root, rootMargin, threshold });

        const currentObserver = observer.current;

        elements.forEach((element) => {
            if (element) currentObserver.observe(element);
        });

        return () => {
            currentObserver.disconnect();
        };
    }, [elements, root, rootMargin, threshold]);

    return { setElements, visibleEntries };
};
