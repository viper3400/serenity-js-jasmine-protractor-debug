import { includes } from '@serenity-js/assertions';
import { Question } from '@serenity-js/core';
import { Target, Text } from '@serenity-js/protractor';
import { by, ElementFinder } from 'protractor';

import { MenuLinks } from '.';

export class DemoTargets {
    meritsSection = Target.the('merits section').located(
        by.css('section#merits')
    );

    menuBar = Target.the('upper menu bar').located(by.css('#web-nav'));

    links = Target.all('links').of(this.menuBar).located(by.css('a'));

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    link = (linkText: string) =>
        this.links.where(Text, includes(linkText)).first();

    handbookLink = this.links.where(Text, includes('Handbook')).first();

    LinkSwitcher(linkType: MenuLinks): Question<ElementFinder> {
        switch (linkType) {
            case MenuLinks.Handbook:
                return this.handbookLink;
            // ....
        }
    }
}
