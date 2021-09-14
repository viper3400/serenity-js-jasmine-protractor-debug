import 'jasmine';

import { Ensure, includes } from '@serenity-js/assertions';
import { actorCalled, engage, Loop } from '@serenity-js/core';
import {
    Click,
    Navigate,
    Target,
    Text,
    UseAngular,
    Website,
} from '@serenity-js/protractor';
import { by } from 'protractor';

import {
    Actors,
    DemoTargets,
    MenuLinks,
    MenuLinksAsStrings,
    MenuLinksClass,
    Merits,
    MyTestDataObject,
    WebsiteTitle,
} from '../src';

const testDataObject = new MyTestDataObject(
    new WebsiteTitle('Serenity/JS'),
    new Merits(['FULL-STACK', 'BUSINESS-FOCUSED', 'SCALABLE', 'COMPREHENSIVE']),
    new MenuLinksClass([MenuLinks.Handbook, MenuLinks.Changelog]),
    new MenuLinksAsStrings(['Handbook', 'Modules'])
);

const targets = new DemoTargets();

describe('serenity-js.org website', () => {
    beforeEach(() => engage(new Actors()));

    it(`clicks on a link using a hard coded string`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            //Ensure.that(Website.title(), includes('Serenity/JS'))
            Ensure.that(
                Website.title(),
                includes(testDataObject.websiteTitle.value)
            ),
            Loop.over(testDataObject.merits.value).to(
                Ensure.that(
                    Text.of(targets.meritsSection),
                    includes(Loop.item<string>())
                )
            ),
            Loop.over(testDataObject.menuLinks.value).to(
                Click.on(targets.link('Handbook'))
            )
        ));

    it(`clicks on a link using a string array`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            //Ensure.that(Website.title(), includes('Serenity/JS'))
            Ensure.that(
                Website.title(),
                includes(testDataObject.websiteTitle.value)
            ),
            Loop.over(testDataObject.merits.value).to(
                Ensure.that(
                    Text.of(targets.meritsSection),
                    includes(Loop.item<string>())
                )
            ),
            Loop.over(testDataObject.menuLinks.value).to(
                Click.on(
                    targets.link(
                        Loop.item<string>().map(() => (value) => `${value}`)
                    )
                )
            )
        ));

    it(`clicks on a link using a enum array`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            //Ensure.that(Website.title(), includes('Serenity/JS'))
            Ensure.that(
                Website.title(),
                includes(testDataObject.websiteTitle.value)
            ),
            Loop.over(testDataObject.merits.value).to(
                Ensure.that(
                    Text.of(targets.meritsSection),
                    includes(Loop.item<string>())
                )
            ),
            Loop.over(testDataObject.menuLinks.value).to(
                Click.on(targets.LinkSwitcher(Loop.item<MenuLinks>()))
            )
        ));
});
