# LoanCalculator

## Dev

The project is deployed on Github Pages at the following address:
https://dubemarcantoine.github.io/mortgage-calculator-app/#/loans/mortgage-calculator
(I had to change routing strategy because Github Pages does not support server-side rewriting)

I structured the app the way I typically structure an Angular app. On landing, you have the home module where you can click on the
sub-modules (only loans), but on a real app, you would see a credit card module, online brokerage, etc. On the sub-module
of the loans, you will be able to see the different types of loans and tools to help you pick the loans
(only a mortgage calculator right now). The modules are lazy-loaded.

I separated the payment and prepayment forms because the computations do not require prepayment. If we would like to give a simpler
UI for the users with less buttons and less form fields (like the mortgage calculator on RBC's website), we could potentially only
show the first form and then have an option to show the second one. The forms subscribe to value changes and output their values and
status to the parent with an event. MortgageCalculatorComponent takes care of calling the computation service and then takes the
result to display the table components.

## Next steps

Given more time, I would have added more tests for edge cases which I have not really done.

I also did not do any end-to-end tests. Although no server is used, some snapshot tests could be useful to make sure that everything
is where it should be.

The computation of the loans could also potentially go in the backend instead as the same code that creates the mortgages 
(where a backend would be needed) could be used (or some pieces) as the one that calculates a mortgage.

I would also have added paging to the payments table.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via Jest with a coverage report.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
