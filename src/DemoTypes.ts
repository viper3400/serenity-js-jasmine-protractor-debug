import { TinyType, TinyTypeOf } from 'tiny-types';

export class WebsiteTitle extends TinyTypeOf<string>() {}

export class Merits extends TinyTypeOf<string[]>() {}
export class MyTestDataObject extends TinyType {
    constructor(
        public readonly websiteTitle: WebsiteTitle,
        public readonly merits: Merits,
        public readonly menuLinks: string[]
    ) {
        super();
    }
}
