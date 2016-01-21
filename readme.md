#AngularJS Multiselect Dropdown

This is a simple Multiselect dropdown plugin for `AngularJS`. It has no other dependency apart from `AngularJS`.

###Installation

**Using `bower`**

    bower install bikasv-angular-multiselect


**Using `npm`**

    npm install bikasv-angular-multiselect

**Manually**

Reference `multiselect.directive.js` and one of the css (`dropdown.css` or `dropdown.min.css`), from `dist` folder of this repository in your HTML.

###Usage

 Add the following as your `angular module` dependency


    'ui.multiselectDropdown'

Use the following syntax to create the dropdown -

    <multiselect-dropdown
        header="vm.headerText"
        option-data="vm.dropdownData"
        selected-values="vm.defaultSelection"
        is-searchable="true"
        single-select="true"
        selected-events="vm.selectionCallback">
    </multiselect-dropdown>

Where parameters are -

* `header` (optional) - Default header text when no option is selected. This will appear only once for single select dropdowns.
    * Default: `null`
* `option-data` (required) - Array of items which will for the dropdown. This array can either be `string` array or `object` array. For `object array`, the value must be in following format (any other parameter will be ignored by the library)
    - {key: 1, value: 'Value'}
* `selected-values` (optional) - List of values that is selected by default. It's format must be same as `option-data`.
    * Default: `[]`
* `is-searchable` (optional) - It adds a input filter to the list of dropdowns.
    * Default: `false`
* `single-select` (optional) - If set to true, it'll act as single select dropdown.
    * Default: `false`
* `selected-events` (required) - Although not mandatory, this is the only way to get the values of dropdown. It's a callback function which will return the `array of selected values` to the calling function.
    * Default: `null`

###Styling

In dist folder of this project you can find `_dropdown.scss` file. You can customize the style as per the need.