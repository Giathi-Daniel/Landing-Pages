import React from 'react';
import Cropper from 'cropperjs';

interface ReactCropperElement extends HTMLImageElement {
    cropper: Cropper;
}
interface ReactCropperDefaultOptions {
    scaleX?: number;
    scaleY?: number;
    enable?: boolean;
    zoomTo?: number;
    rotateTo?: number;
}
interface ReactCropperProps extends ReactCropperDefaultOptions, Cropper.Options<HTMLImageElement>, Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    on?: (eventName: string, callback: () => void | Promise<void>) => void | Promise<void>;
    onInitialized?: (instance: Cropper) => void | Promise<void>;
}
declare const ReactCropper: React.ForwardRefExoticComponent<ReactCropperProps & React.RefAttributes<HTMLImageElement | ReactCropperElement>>;

export { ReactCropper as Cropper, ReactCropperElement, ReactCropperProps, ReactCropper as default };
