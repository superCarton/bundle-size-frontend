import { PackageNameValidatorDirective } from './package-name-validator.directive';
import { FormControl } from '@angular/forms';

describe('PackageNameValidatorDirective', () => {

  const directive = new PackageNameValidatorDirective();

  it('should accept valid scopped npm package to pass', () => {
    const control = new FormControl();
    control.setValue('@angular/common');
    expect(directive.validate(control)).toBeNull();
  });

  it('should accept valid non scopped npm package to pass', () => {
    const control = new FormControl();
    control.setValue('react');
    expect(directive.validate(control)).toBeNull();
  });

  it('should refuse scopped npm package with version', () => {
    const control = new FormControl();
    control.setValue('@angular/common@1.0.0');
    expect(directive.validate(control)).toEqual({invalidPackageName: true});
  });

  it('should refuse non scopped npm package with version', () => {
    const control = new FormControl();
    control.setValue('react@1.0.0');
    expect(directive.validate(control)).toEqual({invalidPackageName: true});
  });

  it('should refuse non valid npm package', () => {
    const control = new FormControl();
    control.setValue('.fakeReact');
    expect(directive.validate(control)).toEqual({invalidPackageName: true});
  });
});
