import React, { useEffect, useRef } from "react";
import { lucid } from "../lib";
import { record } from "../record";
import { Config, Internal } from "../types";

declare global {
    interface Window {
        llc: NonNullable<Config>;
        lli: Internal;
        lucid: typeof lucid;
    }
}

/**
 * Initializes the web analytics tracker with the specified configuration options.
 * @param {Partial<Config>} [config] - The configuration options for the tracker. See {@link Config} for overview
 * @see [Documentation](https://lucid.io/docs) for details.
 */
function Lucid({ config }: { config: Config }) {
    useEffect(() => {
        record(config);
    }, []);
    return null;
}

type TrackViewProps = {
    /**
     *  The name of the event to track.
     */
    name: string;
    /**
     * The payload to send with the event.
     */
    payload?: Record<string, string>;
    children: React.ReactNode;
};

/**
 *  Tracks the view of the component when it is visible in the viewport.
 */
export function TrackView({ name, payload, children }: TrackViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observable = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    lucid.track(name, payload);
                }
            });
        });
        observable.observe(ref.current);
    }, []);
    const Element = React.cloneElement(children as React.ReactElement, {
        ref,
    });
    return Element;
}

/**
 * a wrapper component that tracks the click event of the child component.
 */
export function TrackClick({ name, payload, children }: TrackViewProps) {
    const Element = React.cloneElement(children as React.ReactElement, {
        onClick: () => {
            lucid.track(name, payload);
        },
    });
    return Element;
}

export default Lucid;
