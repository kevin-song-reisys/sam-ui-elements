import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { pipe } from '@gsa-sam/sam-ui-elements/src/ui-kit/utilities/pipe';

const mappings = {
  '/': 'Home',
  // Documentation
  '/docs/overview/contribute': 'How To Contribute',
  '/docs/overview/getting-started': 'Getting Started',
  '/docs/overview/giving-back': 'Giving Back',
  '/docs/overview/how-to-use-this-site': 'How To Use This Site',
  '/docs/overview/innovation-process': 'Innovation Process',
  '/docs/architecture/form-service': 'Architecture',
  '/docs/architecture/modules-and-lazy-loading': 'Modules And Lazy Loading',
  '/docs/architecture/title-service': 'Title Service',
  '/docs/pages/basic-page': 'Basic Page',
  '/docs/pages/buttons-and-links': 'Buttons and Links',
  '/docs/pages/colors': 'Colors',
  '/docs/pages/complex-data-entry': 'Complex Data Entry',
  '/docs/pages/global-elements': 'Global Elements',
  '/docs/pages/graphics-and-images': 'Graphics and Images',
  '/docs/pages/list-page': 'List Page',
  '/docs/pages/page-templates': 'Page Templates',
  '/docs/pages/simple-data-entry': 'Simple Data Entry',
  '/docs/pages/typography': 'Typography',
  '/docs/pages/workspace-page': 'Workspace Page',
  '/docs/components/accordion': 'Accordion Component Documentation',
  '/docs/components/actions/action-button': 'Actions Button',
  '/docs/components/actions/actions-dropdown': 'Actions Dropdown',
  '/docs/components/alert': 'Alert',
  '/docs/components/alert-footer': 'Alert Footer',
  '/docs/components/badge': 'Badge',
  '/docs/components/breadcrumbs': 'Breadcrumbs',
  '/docs/components/comments': 'Comments',
  '/docs/components/download': 'Download',
  '/docs/components/history': 'History',
  '/docs/components/image': 'Image',
  '/docs/components/modal': 'Modal',
  '/docs/components/multiselect-dropdown': 'Multiselect Dropdown',
  '/docs/components/pagination': 'Pagination',
  '/docs/components/point-of-contact': 'Point of Contact',
  '/docs/components/progress-bar': 'Progress Bar',
  '/docs/components/sidenav': 'Sidenav',
  '/docs/components/spinner': 'Spinner',
  '/docs/components/tabs': 'Tabs',
  '/docs/components/upload': 'Upload',
  '/docs/directives/click-outside': 'Click Outside',
  '/docs/directives/drag-drop': 'Drag Drop',
  '/docs/directives/external-link': 'External Link',
  '/docs/directives/focus': 'Focus',
  '/docs/directives/sticky': 'Sticky',
  '/docs/directives/tab-outside': 'Tab Outside',
  '/docs/elements/button': 'Button',
  '/docs/experimental/box': 'Box',
  '/docs/experimental/container': 'Container',
  '/docs/experimental/data-table': 'Data Table',
  '/docs/experimental/dollar': 'Dollar',
  '/docs/experimental/filter-drawer': 'Filter Drawer',
  '/docs/experimental/heading': 'Heading',
  '/docs/experimental/icon': 'Icon',
  '/docs/experimental/input-mask': 'Input Mask',
  '/docs/experimental/label': 'Label',
  '/docs/experimental/list': 'List',
  '/docs/experimental/master-page': 'Master Page',
  '/docs/experimental/page': 'Page',
  '/docs/experimental/page-title': 'Page Title',
  '/docs/experimental/search': 'Search',
  '/docs/experimental/sidebar': 'Sidebar',
  '/docs/experimental/title': 'Title',
  '/docs/experimental/video-player': 'Video Player',
  '/docs/experimental/youtube': 'YouTube',
  '/docs/form-controls/autocomplete': 'Autocomplete',
  '/docs/form-controls/autocomplete-multiselect': 'Autocomplete Multiselect',
  '/docs/form-controls/checkbox': 'Checkbox',
  '/docs/form-controls/date': 'Date',
  '/docs/form-controls/date-range': 'Date Range',
  '/docs/form-controls/date-time': 'Date Time',
  '/docs/form-controls/number': 'Number',
  '/docs/form-controls/radiobutton': 'Radio Button',
  '/docs/form-controls/select': 'Select',
  '/docs/form-controls/text': 'Text',
  '/docs/form-controls/textarea': 'Textarea',
  '/docs/form-controls/time': 'Time',
  '/docs/form-controls/toggle-switch': 'Toggle Switch',
  '/docs/form-templates/international-phone': 'International Phone',
  '/docs/form-templates/name-entry': 'Name Entry',
  '/docs/form-templates/phone-entry': 'Phone Entry',
  '/docs/wrappers/fieldset-wrapper': 'Fieldset Wrapper',
  '/docs/wrappers/label-wrapper': 'Label Wrapper',

  // Patterns
  '/patterns/latest/home': 'Patterns',
  '/patterns/page/a': 'User Account Pattern',
  '/patterns/page/b': 'Award Domains Pattern',
  '/patterns/page/layout': 'General Template - Reports',
  '/patterns/page/search': 'General Template - Search',

  // Prototypes
  '/prototypes': 'Prototypes',
  '/prototypes/page/home': 'Home Page Prototype',
  '/prototypes/page/search': 'Search Prototype (Desktop)',
  '/prototypes/page/search-mobile': 'Search Prototype (Mobile)',
  '/prototypes/page/report': 'Report Page',
  '/prototypes/component/picker': 'Picker Component',
  '/prototypes/component/main-nav': 'Main Nav',
  '/prototypes/page/table': 'Table',
  '/prototypes/page/date': 'Date Picker'
};


@Injectable()
export class SamTitleService {
  public _titleTemplate: string = 'SAM Design System';

  constructor(private ngTitleService: Title) {}

  public setTitleString(postFix): void {
    const t = `${this._titleTemplate} | ${postFix}`;
    this.ngTitleService.setTitle(t);
  }

  public setTitle(route: string): void {

    const processed = pipe(
      this._removeParameters,
      this._removeFragments,
      this._processNumbers
    )(route);

    return this.ngTitleService.setTitle(
      this.buildTitle(this._titleTemplate, mappings[processed])
    );
  }

  public getTitle(): string {
    return this.ngTitleService.getTitle();
  }

  public buildTitle (defaultStr: string, appendedStr: string): string {
    return appendedStr
      ? `${defaultStr} | ${appendedStr}`
      : defaultStr;
  }

  private _removeParameters (route: string): string {
    const paramIndex = route.indexOf('?');
    return paramIndex !== -1
      ? route.slice(0, paramIndex)
      : route;

  }

  private _removeFragments (route: string): string  {
    const fragmentIndex = route.indexOf('#');
    return fragmentIndex !== -1
      ? route.slice(0, fragmentIndex)
      : route;
  }

  private _processNumbers (route: string): string {
    return route.replace(/(\/[0-9]+)$/, '');
  }
}
